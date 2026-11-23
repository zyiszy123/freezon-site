import { accessSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { englishScreenshotNotes, guideActionLabels, locales } from './locales.mjs';
import { article } from './photo-vault.mjs';
import { appStoreURL, guideBundles, productLanguage, products } from './bundles.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const origin = 'https://freezonapp.com';
const slug = 'iphone-hidden-album-vs-photo-vault';
const languages = Object.keys(locales);
const guidePath = (lang, topic = '') => `/guides/${lang === 'en' ? '' : `${lang}/`}${topic ? `${topic}/` : ''}`;
const html = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[c]);
const alternates = (topic) => [...languages, 'x-default'].map(lang =>
  `<link rel="alternate" hreflang="${lang}" href="${origin}${guidePath(lang === 'x-default' ? 'en' : lang, topic)}">`).join('\n  ');
const languageNav = (current, topic) => `<nav class="guide-languages" aria-label="${html(locales[current][9])}">
  ${languages.map(lang => `<a href="${guidePath(lang, topic)}" lang="${lang}" hreflang="${lang}"${current === lang ? ' aria-current="page"' : ''}>${html(locales[lang][0])}</a>`).join('\n  ')}
</nav>`;
const p = (value) => `<p>${html(value)}</p>`;
const split = (data) => data.trim().split('\n').map(line => line.trim());
const campaignURL = (country) => `https://apps.apple.com/${country}/app/id6810494416?pt=129433115&ct=website_hidden_album_guide&mt=8`;
const featuresLink = (lang, className, product = 'vault') => `<a class="${className}" href="${products[product].route}?lang=${productLanguage(lang, product)}#${products[product].anchor}">${html(guideActionLabels[lang].features)}</a>`;
function guideCover(topic) {
  const url = `/guides/media/${topic}/cover.webp`;
  return topic && existsSync(resolve(root, url.slice(1))) ? url : '';
}
const coverMeta = cover => cover ? `<meta property="og:image" content="${origin}${cover}">` : '';
const coverImage = (cover, thumbnail = false) => cover
  ? `<img${thumbnail ? ' loading="lazy"' : ' class="guide-cover"'} src="${cover}" width="1200" height="630" decoding="async" alt="">`
  : '';
const appleSupport = { 'zh-Hans': 'zh-cn', 'zh-Hant': 'zh-tw', ja: 'ja-jp', ko: 'ko-kr', 'es-419': 'es-lamr', 'pt-BR': 'pt-br' };

function write(path, contents) {
  const file = resolve(root, path.replace(/^\//, ''));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

function replaceRegion(path, key, content) {
  const source = readFileSync(resolve(root, path), 'utf8');
  const start = `<!-- ${key}:start -->`;
  const end = `<!-- ${key}:end -->`;
  const first = source.indexOf(start);
  const last = source.indexOf(end);
  if (first < 0 || last <= first || source.indexOf(start, first + 1) !== -1) throw new Error(`Missing or duplicate ${key} marker in ${path}`);
  write(path, `${source.slice(0, first + start.length)}\n${content}\n${source.slice(last)}`);
}

function layout(lang, topic, title, description, body, product = 'vault') {
  const [ , , guides, , , , support, privacy, skip ] = locales[lang];
  const canonical = origin + guidePath(lang, topic);
  const { icon, key, route } = products[product];
  const productLang = productLanguage(lang, product);
  const cover = guideCover(topic);
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${html(title)}${topic ? ' | Freezon' : ''}</title>
  <meta name="description" content="${html(description)}">
  <link rel="canonical" href="${canonical}">
  ${alternates(topic)}
  <meta property="og:type" content="${topic ? 'article' : 'website'}">
  <meta property="og:site_name" content="Freezon">
  <meta property="og:title" content="${html(title)}">
  <meta property="og:description" content="${html(description)}">
  <meta property="og:url" content="${canonical}">
  ${coverMeta(cover)}
  <link rel="icon" href="/assets/${icon}">
  <link rel="stylesheet" href="/assets/site.css?v=20261027-1">
  ${topic ? '<link rel="stylesheet" href="/assets/app-store-qr.css?v=20261120-3">' : ''}
  <link rel="stylesheet" href="/assets/guides.css">
</head>
<body class="guide-page">
  <a class="skip-link" href="#main-content">${html(skip)}</a>
  <header class="site-nav"><div class="nav-inner">
    <a class="brand-lockup" href="${route}?lang=${productLang}"><img src="/assets/${icon}" width="32" height="32" alt="">Freezon</a>
    <nav class="guide-nav" aria-label="Freezon">
      ${topic ? `<a class="site-nav-link" href="${guidePath(lang)}">${html(guides)}</a>` : ''}
      ${featuresLink(lang, 'site-nav-link', product)}
      <a class="site-nav-link" href="${topic ? `/support/${key}/?lang=${productLang}` : guidePath(lang)}"${topic ? '' : ' aria-current="page"'}>${html(topic ? support : guides)}</a>
    </nav>
  </div></header>
  <main id="main-content" class="guide-shell">
    ${body}
  </main>
  <footer class="site-footer"><div class="footer-inner guide-footer">
    <p>Freezon</p>
    <nav class="footer-links" aria-label="Freezon">
      ${topic ? `<a href="${guidePath(lang)}">${html(guides)}</a>` : ''}
      <a href="/support/${key}/?lang=${productLang}">${html(support)}</a>
      <a href="/privacy/${key}/?lang=${productLang}">${html(privacy)}</a>
    </nav>
  </div></footer>
</body>
</html>
`.replace(/^[ \t]+$/gm, '');
}

function heading(title, description, lang, topic) {
  return `<header class="guide-header"><h1>${html(title)}</h1><p class="guide-deck">${html(description)}</p>
    ${languageNav(lang, topic)}</header>`;
}

function figure(lang, screen, caption, product = 'vault', topic, screenLocale) {
  const imageLang = screenLocale ?? lang;
  const articleImage = topic && [imageLang, productLanguage(imageLang, product)]
    .map(mediaLang => `/guides/media/${topic}/${mediaLang}/${screen}.webp`)
    .find(url => existsSync(resolve(root, url.slice(1))));
  const image = articleImage || (product === 'banner' ? `/assets/banner-guide-screens/${productLanguage(imageLang, product)}/${screen}.webp` : null);
  if (image) {
    accessSync(resolve(root, image.slice(1)));
    return `<figure class="guide-figure"><a href="${image}"><img src="${image}" loading="lazy" decoding="async" alt="${html(caption)}"></a><figcaption>${html(caption)}</figcaption></figure>`;
  }
  const images = [480, 800].map(width => `/assets/app-screens/${imageLang}/${screen}-${width}.webp`);
  for (const image of images) accessSync(resolve(root, image.slice(1)));
  const [small, large] = images;
  return `<figure class="guide-figure">
        <a href="${large}" aria-label="${html(caption)}">
          <img src="${small}" srcset="${small} 480w, ${large} 800w" sizes="(max-width: 360px) 80vw, 260px" width="480" height="1044" loading="lazy" decoding="async" alt="${html(caption)}">
        </a>
        <figcaption>${html(caption)}</figcaption>
      </figure>`;
}

function downloadActions(lang, install, storeURL, product = 'vault') {
  return `          <div class="store-download-group">
            <div class="guide-download-actions">
              <a class="button button-primary" href="${html(storeURL)}">${html(install)}</a>
              ${featuresLink(lang, 'text-link', product)}
            </div>
            <figure class="store-qr-download">
              <div class="store-qr-code"><img src="/assets/appstore/${products[product].key}-qr.svg" width="112" height="112" loading="lazy" decoding="async" alt=""></div>
              <figcaption>${html(guideActionLabels[lang].scan)}</figcaption>
            </figure>
          </div>`;
}

function localizedArticle(lang, data) {
  const [title, deck, intro, summary, comparison, header, unlock, storage, backup,
    situation1, sharing1, sharing2, situation2, vault, daily, privateAlbum, unlockCaption, originals,
    originalLead, originalCopy, backups, backupCopy, backupCaption, decision, chooseApple, chooseFreezon, close, install, appleSource] = split(data);
  const [ , country ] = locales[lang];
  const rows = [unlock, storage, backup].map(row => row.split('|'));
  return { title, deck, body: `<article class="guide-article">
    ${heading(title, deck, lang, slug)}
    ${coverImage(guideCover(slug))}
    ${p(intro)}${p(summary)}
    <section aria-labelledby="comparison">
      <h2 id="comparison">${html(comparison)}</h2>
      <table class="guide-comparison" aria-labelledby="comparison">
        <thead><tr>${header.split('|').map(cell => `<th scope="col">${html(cell)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(([label, apple, freezon]) => `<tr><th scope="row">${html(label)}</th><td>${html(apple)}</td><td>${html(freezon)}</td></tr>`).join('\n')}</tbody>
      </table>
    </section>
    <section><h2>${html(situation1)}</h2>${p(sharing1)}${p(sharing2)}
      <p><a href="https://support.apple.com/${appleSupport[lang]}/104987">${html(appleSource)}</a></p>
    </section>
    <section><h2>${html(situation2)}</h2>${p(vault)}<ul><li>${html(daily)}</li><li>${html(privateAlbum)}</li></ul>
      ${figure(lang, 'unlock', unlockCaption)}
    </section>
    <section><h2>${html(originals)}</h2><p><strong>${html(originalLead)}</strong></p>${p(originalCopy)}</section>
    <section><h2>${html(backups)}</h2>${p(backupCopy)}
      ${figure(lang, 'backup', backupCaption)}
      <p><strong>${html(decision)}</strong></p><ul><li>${html(chooseApple)}</li><li>${html(chooseFreezon)}</li></ul>
      <div class="guide-download">
        ${p(close)}
${downloadActions(lang, install, campaignURL(country))}
      </div>
    </section>
  </article>` };
}

const bundleDir = resolve(root, 'scripts/guides/articles');
const bundles = existsSync(bundleDir) ? guideBundles(bundleDir, slug) : [];
const bundlePages = bundles.flatMap(({ slug: topic, product, screens, screenLocale, screenSections, content }) => languages.map(lang => {
  const { title, deck, sections, download, captions } = content[lang];
  const images = new Map(screenSections.map((section, i) => [section, figure(lang, screens[i], captions[i], product, topic, screenLocale)]));
  const firstScreenshot = screenLocale === 'en' ? Math.min(...screenSections) : -1;
  const body = `<article class="guide-article">
    ${heading(title, deck, lang, topic)}
    ${coverImage(guideCover(topic))}
    ${sections.map(({ heading: title, paragraphs, bullets }, i) => `<section>
      ${title ? `<h2>${html(title)}</h2>` : ''}
      ${paragraphs.map(p).join('\n      ')}
      ${bullets.length ? `<ul>${bullets.map(item => `<li>${html(item)}</li>`).join('')}</ul>` : ''}
      ${i === firstScreenshot ? `<p class="guide-screenshot-note">${html(englishScreenshotNotes[lang])}</p>\n      ` : ''}${images.get(i) ?? ''}
    </section>`).join('\n    ')}
    <div class="guide-download">${downloadActions(lang, download, appStoreURL(topic, product, lang), product)}</div>
  </article>`;
  return [`${guidePath(lang, topic)}index.html`, layout(lang, topic, title, deck, body, product)];
}));

function guideCard(lang, topic, { title, deck }) {
  const cover = guideCover(topic);
  return `<li>
        <a class="guide-list-link${cover ? '' : ' guide-list-link-text'}" href="${guidePath(lang, topic)}"><div><h3>${html(title)}</h3>${p(deck)}</div>${coverImage(cover, true)}</a>
      </li>`;
}

function bundleCards(lang, product) {
  return bundles.filter(bundle => bundle.product === product)
    .map(({ slug: topic, content }) => guideCard(lang, topic, content[lang])).join('\n');
}

function bannerGuides(lang) {
  const cards = bundleCards(lang, 'banner');
  if (!cards) return '';
  const label = { 'zh-Hans': '手持弹幕', 'zh-Hant': '手持彈幕', ja: '手持ち灯牌' }[lang] || 'Freezon Banner';
  return `<section aria-labelledby="banner-guides"><h2 id="banner-guides">${html(label)}</h2><ul class="guide-list" role="list">${cards}</ul></section>`;
}

for (const [path, page] of bundlePages) write(path, page);
for (const lang of languages.filter(lang => lang !== 'en')) {
  const data = article[lang];
  if (!data || split(data).length !== 29 || split(data).slice(5, 9).some(row => row.split('|').length !== 3)) {
    throw new Error(`Incomplete article translation: ${lang}`);
  }
  const [, , , title, deck, vault] = locales[lang];
  const translated = localizedArticle(lang, data);
  const list = `<div class="guide-article">
    ${heading(title, deck, lang, '')}
    <section aria-labelledby="photo-vault-guides"><h2 id="photo-vault-guides">${html(vault)}</h2>
      <ul class="guide-list" role="list">${guideCard(lang, slug, translated)}${bundleCards(lang, 'vault')}</ul>
    </section>${bannerGuides(lang)}</div>`;
  write(`${guidePath(lang)}index.html`, layout(lang, '', title, deck, list));
  write(`${guidePath(lang, slug)}index.html`, layout(lang, slug, translated.title, translated.deck, translated.body));
}
replaceRegion('guides/index.html', 'photo-vault-guides', [guideCard('en', slug, {
  title: 'iPhone Hidden Album vs. Photo Vault: Which One Do You Actually Need?',
  deck: 'Compare how Apple Photos and Freezon unlock, store, and back up your photos.',
}), bundleCards('en', 'vault')].filter(Boolean).join('\n'));
replaceRegion('guides/index.html', 'banner-guides', bannerGuides('en'));

for (const [file, topic] of [['guides/index.html', ''], [`guides/${slug}/index.html`, slug]]) {
  replaceRegion(file, 'guide-alternates', alternates(topic));
  replaceRegion(file, 'guide-languages', languageNav('en', topic));
}
replaceRegion(`guides/${slug}/index.html`, 'guide-cover-meta', coverMeta(guideCover(slug)));
replaceRegion(`guides/${slug}/index.html`, 'guide-cover', coverImage(guideCover(slug)));
replaceRegion(`guides/${slug}/index.html`, 'guide-download-actions', downloadActions('en', 'View Freezon on the App Store',
  'https://apps.apple.com/app/apple-store/id6810494416?pt=129433115&ct=website_hidden_album_guide&mt=8'));
replaceRegion('sitemap.xml', 'localized-guides', languages.filter(lang => lang !== 'en').flatMap(lang =>
  ['', slug].map(topic => `  <url><loc>${origin}${guidePath(lang, topic)}</loc></url>`)).join('\n'));
replaceRegion('sitemap.xml', 'article-bundles', bundles.flatMap(({ slug: topic }) => languages.map(lang =>
  `  <url><loc>${origin}${guidePath(lang, topic)}</loc></url>`)).join('\n'));
