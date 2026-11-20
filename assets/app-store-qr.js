(() => {
  const download = document.querySelector('[data-vault-download], [data-app-store-link]');
  if (!download) return;

  const banner = download.hasAttribute('data-app-store-link');
  const base = new URL('.', document.currentScript.src);
  const copy = {
    'zh-Hans': ['扫码下载', '定格相册', '定格手持弹幕'],
    'zh-Hant': ['掃碼下載', '定格相簿', '定格手持彈幕'],
    en: ['Scan to download', 'Freezon', 'Freezon Banner'],
    ja: ['QRコードでダウンロード', 'Freezon', 'Freezon Banner'],
    ko: ['QR 코드로 다운로드', 'Freezon', 'Freezon Banner'],
    'es-419': ['Escanea para descargar', 'Freezon', 'Freezon Banner'],
    'pt-BR': ['Escaneie para baixar', 'Freezon', 'Freezon Banner']
  };

  const actions = download.parentElement;
  const group = document.createElement('div');
  group.className = 'store-download-group';
  actions.before(group);
  group.append(actions);
  // Keep the direct download and scan options together in the hero.
  actions.prepend(download);

  const section = document.createElement('figure');
  section.className = 'store-qr-download';
  section.innerHTML = '<a class="store-qr-code"></a><figcaption></figcaption>';

  const link = section.querySelector('a');
  // Country-neutral Apple URLs let the scanning device use its own storefront.
  link.href = `https://apps.apple.com/app/id${banner ? '6810290208' : '6810494416'}`;
  const image = document.createElement('img');
  image.width = 112;
  image.height = 112;
  image.decoding = 'async';
  image.src = new URL(`appstore/${banner ? 'freezon-banner' : 'freezon'}-qr.svg`, base).href;
  link.append(image);
  group.append(section);

  const localize = () => {
    const text = copy[document.documentElement.lang] || copy.en;
    const name = text[banner ? 2 : 1];
    section.querySelector('figcaption').textContent = text[0];
    image.alt = `${name} — ${text[0]}`;
    link.setAttribute('aria-label', `${name} — App Store`);
  };

  document.addEventListener('freezon:languagechange', localize);
  localize();
})();
