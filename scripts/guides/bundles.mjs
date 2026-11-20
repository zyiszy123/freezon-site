import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { locales } from './locales.mjs';

export const products = {
  vault: { route: '/', anchor: 'app-ui', key: 'freezon', app: 6810494416, icon: 'freezon-icon.png' },
  banner: { route: '/freezon-banner/', anchor: 'features', key: 'freezon-banner', app: 6810290208, icon: 'freezon-banner-icon.png' },
};

export const productLanguage = (lang, product) => product === 'banner' && ['es-419', 'pt-BR'].includes(lang) ? 'en' : lang;
export const campaignToken = slug => `web_${slug.slice(0, 17)}_${createHash('sha256').update(slug).digest('hex').slice(0, 8)}`;
export const appStoreURL = (slug, product, lang) => {
  const path = lang === 'en' ? '/app/apple-store/' : `/${locales[lang][1]}/app/`;
  return `https://apps.apple.com${path}id${products[product].app}?pt=129433115&ct=${campaignToken(slug)}&mt=8`;
};

export function guideBundles(dir, reservedSlug) {
  const reserved = new Set([reservedSlug, ...Object.keys(locales).map(lang => lang.toLowerCase())]);
  return readdirSync(dir).filter(name => name.endsWith('.json')).sort().map(name => {
    const { slug, product, screens, content } = JSON.parse(readFileSync(join(dir, name), 'utf8'));
    const check = (ok, message) => { if (!ok) throw new Error(`${name}: ${message}`); };
    const plain = (value, max = 2500) => typeof value === 'string' && value.trim() === value && value.length > 0 && value.length <= max && !/[\n\r<>]/.test(value);
    check(typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 90 && name === `${slug}.json` && !reserved.has(slug), 'invalid or reserved slug');
    check(Object.hasOwn(products, product), 'unknown product');
    check(Array.isArray(screens) && screens.length <= 3 && new Set(screens).size === screens.length && screens.every(screen => typeof screen === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(screen)), 'invalid screenshot keys');
    check(content && Object.keys(content).length === Object.keys(locales).length, 'all site languages are required');
    for (const lang of Object.keys(locales)) {
      const entry = content[lang];
      check(entry && plain(entry.title, 150) && plain(entry.deck, 240) && plain(entry.download, 80) && Array.isArray(entry.sections) && entry.sections.length > 1 && entry.sections.length <= 12, `invalid article header or sections for ${lang}`);
      check(Array.isArray(entry.captions) && entry.captions.length === screens.length && entry.captions.every(caption => plain(caption, 240)), `missing screenshot captions for ${lang}`);
      for (const section of entry.sections) {
        check(section && (section.heading === '' || plain(section.heading, 150)) && Array.isArray(section.paragraphs) && section.paragraphs.length > 0 && section.paragraphs.length <= 8 && section.paragraphs.every(paragraph => plain(paragraph)), `invalid section for ${lang}`);
        check(Array.isArray(section.bullets) && section.bullets.length <= 8 && section.bullets.every(bullet => plain(bullet)), `invalid list for ${lang}`);
      }
      check(entry.sections.length >= screens.length + 1, `not enough sections for screenshots in ${lang}`);
    }
    return { slug, product, screens, content };
  });
}
