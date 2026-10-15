const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium, webkit } = require('playwright');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const output = process.env.FREEZON_VERIFY_OUTPUT || '/tmp/freezon-site-verification';
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ja'];
const viewports = [
  { name: 'small-phone', width: 320, height: 760 },
  { name: 'phone', width: 390, height: 844 },
  { name: 'ipad-mini', width: 768, height: 1024 },
  { name: 'ipad-portrait', width: 834, height: 1194 },
  { name: 'ipad-landscape', width: 1194, height: 834 },
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'wide-desktop', width: 1920, height: 1080 }
];
const readyImage = async locator => locator.evaluate(image => image.decode());
const geometry = async page => page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth > innerWidth,
  broken: [...document.images].filter(image => image.getAttribute('src') && (!image.complete || !image.naturalWidth)).map(image => image.src),
  textOverflow: [...document.querySelectorAll('h1, h2, h3, p, button, a')].filter(element => element.getClientRects().length && element.scrollWidth > element.clientWidth + 2 && getComputedStyle(element).display !== 'inline').map(element => element.textContent.trim().slice(0, 100))
}));

(async () => {
  await fs.mkdir(output, { recursive: true });
  const report = { viewports: [], interactions: [], browsers: [], artwork: {} };
  const manifest = JSON.parse(await fs.readFile(path.join(root, 'assets/vault-campaign/manifest.json'), 'utf8'));
  assert.equal(manifest.images.length, 96);
  for (const image of manifest.images) {
    const metadata = await sharp(path.join(root, 'assets/vault-campaign', image.locale, image.device, image.file)).metadata();
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
    assert.ok(Math.abs(metadata.width / metadata.height - image.sourceWidth / image.sourceHeight) < 0.001);
  }
  report.artwork = { approvedPosters: 48, derivatives: 96, proportions: 'passed' };
  for (const [engine, name] of [[chromium, 'chromium'], [webkit, 'webkit']]) {
    const browser = await engine.launch({ headless: true, ...(name === 'chromium' ? { channel: 'chrome' } : {}) });
    try {
      const page = await browser.newPage({ reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const viewport of name === 'chromium' ? viewports : viewports.filter(v => ['phone', 'ipad-portrait', 'ipad-landscape'].includes(v.name))) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        for (const locale of locales) {
          await page.goto(`${pathToFileURL(path.join(root, 'index.html'))}?lang=${locale}`);
          await readyImage(page.locator('[data-vault-hero] img'));
          await readyImage(page.locator('[data-vault-poster]'));
          assert.equal(await page.locator('html').getAttribute('lang'), locale);
          assert.ok((await page.title()).includes(locale.startsWith('zh') ? '定格' : 'Freezon'));
          const measured = await geometry(page);
          assert.deepEqual(measured, { overflow: false, broken: [], textOverflow: [] }, `${name}/${viewport.name}/${locale}: ${JSON.stringify(measured)}`);
          const hero = await page.locator('.vault-hero').boundingBox();
          const nextHeading = await page.locator('#product-title').boundingBox();
          assert.ok(nextHeading.y < viewport.height, `${viewport.name}/${locale}: next section is not visible`);
          report.viewports.push({ browser: name, viewport: viewport.name, locale, ...measured, heroBottom: Math.round(hero.y + hero.height) });
          if (name === 'chromium' && locale === 'zh-Hans' && ['phone', 'ipad-portrait', 'ipad-landscape', 'desktop'].includes(viewport.name)) {
            await page.screenshot({ path: path.join(output, `${viewport.name}-home.png`) });
            await page.locator('#app-ui').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(output, `${viewport.name}-gallery.png`) });
          }
        }
      }
      await page.setViewportSize({ width: 1194, height: 834 });
      await page.goto(`${pathToFileURL(path.join(root, 'index.html'))}?lang=zh-Hans`);
      for (const locale of locales) {
        await page.locator(`.nav-actions [data-language-choice="${locale}"]`).click();
        for (const device of ['iphone', 'ipad']) {
          await page.locator(`[data-vault-device="${device}"]`).click();
          for (let index = 0; index < 6; index++) {
            await page.locator('[data-vault-topics] button').nth(index).click();
            await readyImage(page.locator('[data-vault-poster]'));
            const image = await page.locator('[data-vault-poster]').evaluate(el => ({ src: el.currentSrc, width: el.width, height: el.height, naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight }));
            assert.ok(image.src.includes(`/${locale}/${device}/0${index + 1}_`), image.src);
            assert.ok(Math.abs(image.width / image.height - image.naturalWidth / image.naturalHeight) < 0.01);
            assert.equal(await page.locator('[data-vault-count]').textContent(), `${index + 1} / 6`);
            report.interactions.push({ browser: name, locale, device, poster: index + 1 });
          }
        }
      }
      await page.locator('[data-vault-open]').click();
      await readyImage(page.locator('[data-vault-full]'));
      assert.equal(await page.locator('[data-vault-dialog]').evaluate(dialog => dialog.open), true);
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-vault-dialog-count]').textContent(), '1 / 6');
      await readyImage(page.locator('[data-vault-full]'));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('[data-vault-dialog]').open && document.activeElement === document.querySelector('[data-vault-open]'));
      assert.equal(await page.locator('[data-vault-dialog]').evaluate(dialog => dialog.open), false);
      assert.equal(await page.locator('[data-vault-open]').evaluate(el => el === document.activeElement), true);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('[data-menu-toggle]').click();
      assert.equal(await page.locator('#mobile-menu').isVisible(), true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-menu').isVisible(), false);
      for (const route of ['support/freezon', 'privacy/freezon', 'freezon-banner']) {
        for (const locale of locales) {
          await page.goto(`${pathToFileURL(path.join(root, route, 'index.html'))}?lang=${locale}`);
          assert.equal(await page.locator('html').getAttribute('lang'), locale);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route}/${locale} overflows`);
          if (route !== 'freezon-banner') {
            const text = await page.locator(`[data-language-panel="${locale}"]`).textContent();
            assert.ok(text.includes('iPad'));
            assert.ok(text.includes('Touch ID'));
            assert.ok(text.includes('iCloud'));
          }
        }
      }
      assert.deepEqual(errors, [], `${name} browser errors`);
      report.browsers.push({ name, pageErrors: errors, dialog: 'passed', mobileNavigation: 'passed', documentsAndBanner: 'passed' });
    } finally { await browser.close(); }
  }
  await fs.writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ output, responsiveChecks: report.viewports.length, campaignChecks: report.interactions.length, browsers: report.browsers, artwork: report.artwork }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
