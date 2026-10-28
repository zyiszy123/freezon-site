(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja", "ko"];
  const assetVersion = "20261028-3";
  const appStore = {
    "zh-Hans": { url: "https://apps.apple.com/cn/app/id6810290208", badgeLocale: "zh-cn", badgeWidth: 109, alt: "在 App Store 下载" },
    "zh-Hant": { url: "https://apps.apple.com/tw/app/id6810290208", badgeLocale: "zh-tw", badgeWidth: 109, alt: "從 App Store 下載" },
    en: { url: "https://apps.apple.com/us/app/id6810290208", badgeLocale: "en-us", badgeWidth: 120, alt: "Download on the App Store" },
    ja: { url: "https://apps.apple.com/jp/app/id6810290208", badgeLocale: "ja-jp", badgeWidth: 109, alt: "App Store からダウンロード" },
    ko: { url: "https://apps.apple.com/kr/app/id6810290208", badgeLocale: "ko-kr", badgeWidth: 109, alt: "App Store에서 다운로드" }
  };
  const pages = ["01-banner", "02-create", "03-effects", "04-colors", "05-fonts", "06-favorites"];
  const pageAlts = {
    "zh-Hans": ["定格手持弹幕宣传图：人物手持 iPhone 和 iPad 灯牌", "定格手持弹幕创作与实时预览界面", "定格手持弹幕四种文字效果界面", "定格手持弹幕颜色和 LED 点阵界面", "定格手持弹幕离线字体界面", "定格手持弹幕最近使用和收藏界面"],
    "zh-Hant": ["定格手持彈幕宣傳圖：人物手持 iPhone 和 iPad 燈牌", "定格手持彈幕創作與即時預覽畫面", "定格手持彈幕四種文字效果畫面", "定格手持彈幕顏色和 LED 點陣畫面", "定格手持彈幕離線字型畫面", "定格手持彈幕最近使用和收藏畫面"],
    en: ["Freezon Banner campaign artwork with characters holding iPhone and iPad banners", "Freezon Banner editor and live preview", "Four Freezon Banner text effects", "Freezon Banner colors and LED matrix background", "Freezon Banner offline font selection", "Freezon Banner recent items and favorites"],
    ja: ["Freezon Bannerのキャンペーンアート：人物がiPhoneとiPadの灯牌を持つ様子", "Freezon Bannerの編集とリアルタイムプレビュー画面", "Freezon Bannerの4種類の文字エフェクト", "Freezon BannerのカラーとLEDドット画面", "Freezon Bannerのオフラインフォント画面", "Freezon Bannerの最近使った項目とお気に入り画面"],
    ko: ["Freezon Banner 홍보 이미지: 사람들이 iPhone과 iPad 전광판을 들고 있는 모습", "Freezon Banner 편집 및 실시간 미리보기 화면", "Freezon Banner의 네 가지 글자 효과", "Freezon Banner 글자 색상 및 LED 도트 배경 화면", "Freezon Banner 한글 픽셀 글꼴 화면", "Freezon Banner 최근 기록 및 즐겨찾기 화면"]
  };
  const demoCopy = {
    "zh-Hans": { text: "为爱发电 POWERED BY LOVE", placeholder: "输入你的灯牌文字", play: "继续滚动", pause: "暂停滚动", colors: ["荧光黄绿", "荧光粉", "电光青", "白色"] },
    "zh-Hant": { text: "為愛發電 POWERED BY LOVE", placeholder: "輸入你的燈牌文字", play: "繼續捲動", pause: "暫停捲動", colors: ["螢光黃綠", "螢光粉", "電光青", "白色"] },
    en: { text: "POWERED BY LOVE", placeholder: "Type your banner text", play: "Resume scrolling", pause: "Pause scrolling", colors: ["Acid green", "Fluorescent pink", "Electric cyan", "White"] },
    ja: { text: "愛の力で POWERED BY LOVE", placeholder: "表示する文字を入力", play: "スクロールを再開", pause: "スクロールを一時停止", colors: ["蛍光イエローグリーン", "蛍光ピンク", "エレクトリックシアン", "ホワイト"] },
    ko: { text: "응원해요 POWERED BY LOVE", placeholder: "전광판 문구 입력", play: "스크롤 계속", pause: "스크롤 일시 정지", colors: ["형광 라임색", "형광 핑크", "선명한 청록색", "흰색"] }
  };

  let currentLanguage = supported.includes(document.documentElement.lang) ? document.documentElement.lang : "zh-Hans";
  let inputDirty = false;
  let paused = false;

  const updatePictures = (lang) => {
    document.querySelectorAll("[data-banner-picture]").forEach((picture) => {
      const page = picture.dataset.page;
      const index = pages.indexOf(page);
      if (index < 0) return;
      const source = picture.querySelector("source");
      const image = picture.querySelector("img");
      if (source) source.srcset = `../assets/banner/${lang}/iphone/${page}.webp?v=${assetVersion}`;
      if (image) {
        image.src = `../assets/banner/${lang}/ipad/${page}.webp?v=${assetVersion}`;
        image.alt = pageAlts[lang][index];
      }
    });
  };

  const demoElements = () => ({
    input: document.querySelector("[data-banner-input]"),
    screen: document.querySelector("[data-demo-screen]"),
    text: document.querySelector("[data-demo-text]"),
    clone: document.querySelector("[data-demo-clone]"),
    playback: document.querySelector("[data-demo-playback]")
  });

  const setDemoText = (value) => {
    const { text, clone } = demoElements();
    const rendered = value.trim() || " ";
    if (text) text.textContent = rendered;
    if (clone) clone.textContent = rendered;
  };

  const updateDemoLanguage = (lang) => {
    const copy = demoCopy[lang];
    const { input, playback } = demoElements();
    if (input) {
      input.placeholder = copy.placeholder;
      if (!inputDirty) {
        input.value = copy.text;
        setDemoText(copy.text);
      }
    }
    if (playback) playback.setAttribute("aria-label", paused ? copy.play : copy.pause);
    document.querySelectorAll("[data-demo-color]").forEach((swatch, index) => {
      swatch.setAttribute("aria-label", copy.colors[index]);
    });
  };

  const updateAppStoreLink = (lang) => {
    const link = document.querySelector("[data-app-store-link]");
    const badge = link?.querySelector("[data-app-store-badge]");
    const store = appStore[lang];
    if (!link || !badge || !store) return;
    link.href = store.url;
    badge.src = `https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/${store.badgeLocale}?size=250x83`;
    badge.width = store.badgeWidth;
    badge.alt = store.alt;
  };

  const setMode = (mode) => {
    const { screen, playback } = demoElements();
    document.querySelectorAll("[data-demo-mode]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.demoMode === mode ? "true" : "false");
    });
    screen?.classList.toggle("is-static", mode === "static");
    if (playback) {
      playback.disabled = mode === "static";
      playback.setAttribute("aria-hidden", mode === "static" ? "true" : "false");
    }
  };

  const initDemo = () => {
    const { input, screen, playback } = demoElements();
    if (!input || !screen || !playback) return;
    input.addEventListener("input", () => {
      inputDirty = true;
      setDemoText(input.value);
    });
    document.querySelectorAll("[data-demo-mode]").forEach((button) => {
      button.addEventListener("click", () => setMode(button.dataset.demoMode));
    });
    document.querySelectorAll("[data-demo-color]").forEach((swatch) => {
      swatch.addEventListener("click", () => {
        screen.style.setProperty("--demo-color", swatch.dataset.demoColor);
        document.querySelectorAll("[data-demo-color]").forEach((button) => {
          const active = button === swatch;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
      });
    });
    playback.addEventListener("click", () => {
      paused = !paused;
      screen.classList.toggle("is-paused", paused);
      playback.setAttribute("aria-pressed", paused ? "true" : "false");
      updateDemoLanguage(currentLanguage);
    });
    setMode("scroll");
    updateDemoLanguage(currentLanguage);
  };

  document.addEventListener("freezon:languagechange", (event) => {
    const lang = event.detail?.lang;
    if (!supported.includes(lang)) return;
    currentLanguage = lang;
    updatePictures(lang);
    updateDemoLanguage(lang);
    updateAppStoreLink(lang);
  });

  document.addEventListener("DOMContentLoaded", () => {
    currentLanguage = supported.includes(document.documentElement.lang) ? document.documentElement.lang : "zh-Hans";
    updatePictures(currentLanguage);
    initDemo();
    updateAppStoreLink(currentLanguage);
  });
})();
