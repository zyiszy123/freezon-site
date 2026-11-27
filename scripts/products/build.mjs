import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const origin = 'https://freezonapp.com';
const root = new URL('../../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const products = [
  {
    source: 'index.html', route: '/', name: 'Freezon',
    title: 'Freezon: Private Photo Vault for iPhone and iPad',
    description: 'Keep photos and videos in a private vault on iPhone, iPhone Duo, or iPad. Freezon offers separate album passwords, on-device encryption, and encrypted backups.',
    summary: 'Two separate albums, on-device photo encryption, and encrypted backup. No account or ads.',
    art: '/assets/vault-campaign/en/duo/01_dual_vault-1100.webp?v=20261027',
    alt: 'Freezon’s two encrypted photo albums on iPhone Duo',
  },
  {
    source: 'freezon-banner/index.html', route: '/freezon-banner/', name: 'Freezon Banner',
    title: 'Freezon Banner: LED Banner App for iPhone and iPad',
    description: 'Turn your iPhone or iPad into an LED banner. Show big text, make scrolling messages, or draw a glowing sign and display it full screen.',
    summary: 'Make scrolling text and glowing hand-drawn signs for concerts, meetups, and more.',
    art: '/assets/banner/en/ipad/01-banner.webp',
    alt: 'Freezon Banner artwork with people holding iPhone and iPad banners',
  },
];

const labels = {
  'Freezon / 定格': 'Freezon',
  '移动导航': 'Mobile navigation',
  '打开导航': 'Open navigation',
  '设备 / Device': 'Display device',
  '功能主题': 'Feature topics',
  '上一张': 'Previous poster',
  '下一张': 'Next poster',
  '放大宣传图': 'Enlarge poster',
  '关闭': 'Close preview',
  '宣传图预览': 'Poster preview',
  '语言选择': 'Language selector',
  '下一部分': 'Next section',
  '暂停滚动': 'Pause scrolling',
  '荧光黄绿': 'Acid green',
  '荧光粉': 'Fluorescent pink',
  '电光青': 'Electric cyan',
  '白色': 'White',
  '在 App Store 下载': 'Download on the App Store',
};

function englishLinks(page, sourceRoute) {
  return page.replace(/\b(href|src|srcset)="(\.\.?\/[^"]*)"/g, (_, attr, url) => {
    const target = new URL(url, origin + sourceRoute);
    if (attr === 'href') {
      if (target.pathname === '/' || target.pathname === '/freezon-banner/') target.pathname = '/en' + target.pathname;
      else if (/^\/(?:support|privacy)\//.test(target.pathname)) target.searchParams.set('lang', 'en');
    }
    return attr + '="' + target.pathname + target.search + target.hash + '"';
  });
}

function vaultMarkup(page, product) {
  const shortAlt = 'Freezon’s two encrypted photo albums';
  const asset = (device, size) => '/assets/vault-campaign/en/' + device + '/01_dual_vault-' + size + '.webp?v=20261027';
  const srcset = (device, sizes) => sizes.map(size => asset(device, size) + ' ' + size + 'w').join(', ');
  return page
    .replace('<source media="(max-width: 600px)" sizes="220px">', '<source media="(max-width: 600px)" sizes="220px" srcset="' + srcset('iphone', [660, 1320]) + '">')
    .replace(/(<img sizes="[^"]+"[^>]+) alt="[^"]+"/, '$1 src="' + product.art + '" srcset="' + srcset('duo', [1100, 2853]) + '" alt="' + product.alt + '"')
    .replace(/(<\/picture>)<noscript><picture>.*?<\/picture><\/noscript>/, '$1')
    .replace(/alt="定格：[^"]+"/g, 'alt="' + shortAlt + '"')
    .replace('https://apps.apple.com/app/id6810494416', 'https://apps.apple.com/us/app/id6810494416')
    .replace(/<nav id="mobile-menu"[^]*?<\/nav>/, nav => nav.replace(/>(双层相册|核心功能|手持弹幕|隐私|支持)</g, (_, label) =>
      '>' + ({ 双层相册: 'Two albums', 核心功能: 'Core features', 手持弹幕: 'Banner', 隐私: 'Privacy', 支持: 'Support' })[label] + '<'))
    .replace(/(<option value="en")>/g, '$1 selected>')
    .replace(/(data-vault-caption[^>]*>)[^<]*/, '$1Two separate albums')
    .replace(/(data-vault-description[^>]*>)[^<]*/, '$1The Everyday and Private Albums each use separate passwords, keys, and Recovery Codes. Photos and videos are encrypted on your device.');
}

const bannerPictures = {
  '01-banner': products[1].alt,
  '02-drawing-cheer': 'A hand-drawn glowing cheering sign on an iPhone or iPad',
  '03-drawing-kitten': 'A glowing hand-drawn kitten on an iPhone or iPad',
  '05-drawing-birthday': 'A hand-drawn glowing birthday card on an iPhone or iPad',
  '02-create': 'Freezon Banner editor and live preview',
  '03-effects': 'Four Freezon Banner text effects',
  '04-colors': 'Freezon Banner colors and LED matrix background',
  '05-fonts': 'Freezon Banner offline font selection',
  '06-favorites': 'Freezon Banner recent items and favorites',
};

function bannerMarkup(page) {
  return page
    .replace(/  <script>\n    \(\(\) => \{[\s\S]*?  <\/script>\n/, '  <link rel="preload" href="/assets/banner/fonts/SmileySans-Oblique.woff2" as="font" type="font/woff2" crossorigin>\n')
    .replace(/(<picture[^>]+data-page="([^"]+)"[^>]*>)([\s\S]*?<\/picture>)/g, (_, opening, image, body) => {
      if (!Object.hasOwn(bannerPictures, image)) throw new Error('Missing English image label: ' + image);
      const asset = device => '/assets/banner/en/' + device + '/' + image + '.webp?v=20261106-3';
      return opening + body
        .replace(/(<source[^>]*?)>/, '$1 srcset="' + asset('iphone') + '">')
        .replace(/(<img[^>]*?) alt="[^"]+"/, '$1 src="' + asset('ipad') + '" alt="' + bannerPictures[image] + '"');
    })
    .replaceAll('/guides/zh-Hans/#banner-guides', '/guides/#banner-guides')
    .replaceAll('为爱发电 POWERED BY LOVE', 'POWERED BY LOVE')
    .replace('https://apps.apple.com/cn/app/id6810290208', 'https://apps.apple.com/us/app/id6810290208')
    .replace('/black/zh-cn?size=250x83" width="109"', '/black/en-us?size=250x83" width="120"')
    .replace(/(data-language-choice="en")/g, '$1 aria-current="true"');
}

for (const product of products) {
  const route = '/en' + product.route;
  const url = origin + route;
  const meta = {
    description: product.description,
    'og:url': url,
    'og:title': product.title,
    'og:description': product.summary,
    'og:locale': 'en_US',
    'og:image': origin + product.art,
    'og:image:alt': product.alt,
    'twitter:title': product.title,
    'twitter:description': product.summary,
    'twitter:image': origin + product.art,
  };

  // The product templates use flat spans for translated text.
  let page = read(product.source)
    .replace('<!doctype html>', '<!doctype html>\n<!-- Generated by scripts/products/build.mjs. Edit the source product page. -->')
    .replace('<html lang="zh-Hans">', '<html lang="en" data-fixed-language="en">')
    .replace(/<title>[^<]*<\/title>/, '<title>' + escape(product.title) + '</title>')
    .replace(/<link rel="canonical" href="[^"]+">/, '<link rel="canonical" href="' + url + '">')
    .replace(/(<meta (?:name|property)="([^"]+)" content=")[^"]*(")/g, (tag, start, key, end) =>
      Object.hasOwn(meta, key) ? start + escape(meta[key]) + end : tag)
    .replace('<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="zh_CN">')
    .replace(/<script type="application\/ld\+json">([^<]+)<\/script>/, (_, data) =>
      '<script type="application/ld+json">' + JSON.stringify({
        ...JSON.parse(data), name: product.name, description: product.description, url,
      }) + '</script>')
    .replace(/<span data-lang-content="([^"]+)">([\s\S]*?)<\/span>/g, (span, lang) => lang === 'en' ? span : '')
    .replace(/\b(aria-label|alt)="([^"]+)"/g, (attr, key, value) =>
      Object.hasOwn(labels, value) ? key + '="' + labels[value] + '"' : attr)
    .replaceAll('/assets/vault-campaign/zh-Hans/', '/assets/vault-campaign/en/')
    .replaceAll('href="./guides/"', 'href="/guides/" data-guide-link');
  // Keep regular local links and resources usable at either URL depth.
  page = englishLinks(page, product.route);
  page = (product.route === '/' ? vaultMarkup : bannerMarkup)(page, product);
  // The site's legal registration links keep their official Chinese labels.
  const file = fileURLToPath(new URL(route.slice(1) + 'index.html', root));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page.replace(/^[ \t]+\n/gm, ''));
}
