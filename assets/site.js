(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja", "ko", "es-419", "pt-BR"];
  const aliases = { "zh-cn": "zh-Hans", "zh-sg": "zh-Hans", "zh-hans": "zh-Hans", "zh-tw": "zh-Hant", "zh-hk": "zh-Hant", "zh-hant": "zh-Hant", en: "en", ja: "ja", ko: "ko", es: "es-419", "es-419": "es-419", pt: "pt-BR", "pt-br": "pt-BR" };
  const locales = { "zh-Hans": "zh_CN", "zh-Hant": "zh_TW", en: "en_US", ja: "ja_JP", ko: "ko_KR", "es-419": "es_MX", "pt-BR": "pt_BR" };
  const pagePaths = {
    home: "/",
    "home-banner": "/freezon-banner/",
    support: "/support/freezon/",
    privacy: "/privacy/freezon/",
    "support-banner": "/support/freezon-banner/",
    "privacy-banner": "/privacy/freezon-banner/"
  };
  const imageAlts = { "zh-Hans": "Freezon / 定格 App 图标", "zh-Hant": "Freezon / 定格 App 圖示", en: "Freezon app icon", ja: "FreezonのAppアイコン", ko: "Freezon 앱 아이콘", "es-419": "Ícono de Freezon", "pt-BR": "Ícone do Freezon" };
  const bannerImageAlts = { "zh-Hans": "定格手持弹幕 App 图标", "zh-Hant": "定格手持彈幕 App 圖示", en: "Handheld Banner app icon", ja: "定格手持弹幕 App アイコン", ko: "Freezon Banner 앱 아이콘" };
  const pageContent = {
    home: {
      "ko": ["Freezon - iPhone, iPhone Duo, iPad용 암호화 사진 앨범","Freezon은 iPhone과 iPad에서 사진과 비디오를 암호화하며 iPhone Duo의 접힌 화면과 펼친 화면도 지원합니다. 앨범별 비밀번호와 암호화 백업 및 복원을 제공하며 계정 가입은 필요 없습니다.","iPhone, iPhone Duo, iPad에서 두 앨범을 별도의 비밀번호로 보호하세요. 기기 내 암호화와 백업 및 복원, 광고와 계정 가입 없이."],
      "es-419": ["Freezon - Álbumes cifrados para iPhone, iPhone Duo y iPad","Freezon cifra fotos y videos en iPhone y iPad, con soporte para iPhone Duo abierto o cerrado. Contraseñas separadas por álbum, respaldo cifrado y restauración. Sin crear una cuenta.","Para iPhone, iPhone Duo y iPad. Contraseñas separadas, cifrado en el dispositivo, respaldo y restauración. Sin cuenta ni anuncios."],
      "pt-BR": ["Freezon - Álbuns criptografados para iPhone, iPhone Duo e iPad","O Freezon criptografa fotos e vídeos no iPhone e iPad, com suporte ao iPhone Duo aberto ou fechado. Senhas separadas por álbum, backup criptografado e restauração. Sem criar conta.","Para iPhone, iPhone Duo e iPad. Senhas separadas, criptografia no dispositivo, backup e restauração. Sem conta nem anúncios."],
      "zh-Hans": ["定格 - iPhone、iPhone Duo 与 iPad 本机加密相册", "定格适用于 iPhone 和 iPad，现已适配 iPhone Duo 折叠屏。日常相册与私密相册分别使用独立密码，照片和视频在本机加密保存，支持加密备份与恢复，无需注册账号。", "支持 iPhone、iPhone Duo 和 iPad。两个独立相册，本机加密，支持加密备份与恢复。无需注册账号，没有广告。"],
      "zh-Hant": ["定格 - iPhone、iPhone Duo 與 iPad 本機加密相簿", "定格適用於 iPhone 和 iPad，現已適配 iPhone Duo 摺疊螢幕。日常相簿與私密相簿分別使用獨立密碼，照片與影片在本機加密儲存，支援加密備份與復原，無須註冊帳號。", "支援 iPhone、iPhone Duo 和 iPad。兩個獨立相簿，本機加密，支援加密備份與復原。無須註冊帳號，沒有廣告。"],
      en: ["Freezon - Encrypted photo albums for iPhone, iPhone Duo and iPad", "Freezon encrypts photos and videos on iPhone and iPad, now with iPhone Duo foldable support. Separate album passwords, encrypted backup and restore. No account required.", "For iPhone, iPhone Duo and iPad. Separate album passwords, on-device encryption, and encrypted backup and restore. No account or ads."],
      ja: ["Freezon - iPhone、iPhone Duo、iPadの端末内暗号化アルバム", "FreezonはiPhoneとiPadに加え、折りたたみ式のiPhone Duoにも対応。日常用とプライベートの専用パスワードで写真やビデオを端末内に暗号化保存。暗号化バックアップと復元に対応し、アカウント登録は不要です。", "iPhone、iPhone Duo、iPadに対応。独立したパスワード、端末内暗号化、暗号化バックアップと復元。アカウント登録も広告もありません。"]
    },
    "home-banner": {
      ko: ["Freezon Banner - 휴대폰을 현장 전광판으로", "iPhone과 iPad에서 큰 고정 문구와 스크롤 문구를 만드세요. 방향, 속도, 글꼴, 효과와 색상을 조절할 수 있으며 편집과 전체 화면 표시는 오프라인에서도 사용할 수 있습니다.", "큰 글자, 스크롤 문구, 네온 효과와 LED 도트로 iPhone이나 iPad를 현장 전광판으로 바꿔 보세요.", "Freezon Banner 홍보 이미지: 사람들이 iPhone과 iPad 전광판을 들고 있는 모습"],
      "zh-Hans": ["定格手持弹幕 - 把手机变成现场灯牌", "在 iPhone 与 iPad 上制作静态大字和滚动字幕。自由调整方向、速度、字体、效果与颜色，编辑和全屏展示无需联网。", "静态大字、滚动字幕、霓虹文字和复古点阵，把 iPhone 或 iPad 变成现场灯牌。", "定格手持弹幕宣传图：人物手持 iPhone 和 iPad 灯牌"],
      "zh-Hant": ["定格手持彈幕 - 把手機變成現場燈牌", "在 iPhone 與 iPad 上製作靜態大字和捲動字幕。自由調整方向、速度、字型、效果與顏色，編輯和全螢幕展示無需連線。", "靜態大字、捲動字幕、霓虹文字和復古點陣，把 iPhone 或 iPad 變成現場燈牌。", "定格手持彈幕宣傳圖：人物手持 iPhone 和 iPad 燈牌"],
      en: ["Freezon Banner - Turn your screen into a live banner", "Create big static text and scrolling messages on iPhone and iPad. Adjust direction, speed, fonts, effects, and colors, with offline editing and full-screen display.", "Big text, scrolling messages, neon effects, and an LED matrix turn your iPhone or iPad into a banner for live events.", "Freezon Banner campaign artwork with characters holding iPhone and iPad banners"],
      ja: ["Freezon Banner - スマホを会場のバナーに", "iPhoneとiPadで大きな文字やスクロール表示を作成。方向、速度、フォント、効果、色を調整し、編集と全画面表示はオフラインで使えます。", "大きな文字、スクロール、ネオン効果、LEDドットで、iPhoneやiPadを会場のバナーに。", "Freezon Bannerのキャンペーンアート：人物がiPhoneとiPadのバナーを持つ様子"]
    },
    support: {
      "ko": ["지원 - Freezon","Freezon의 지원 기기, 비밀번호, 복구 코드, 가져오기, 백업과 복원에 관한 도움말입니다.","Freezon의 비밀번호, 백업, 복원, 가져오기 및 진단 정보에 관한 도움말입니다."],
      "es-419": ["Soporte - Freezon","Ayuda de Freezon sobre dispositivos, contraseñas, códigos de recuperación, importación, respaldos y diagnóstico.","Consulta cómo importar, respaldar y recuperar tus fotos, o cómo enviar un diagnóstico a soporte."],
      "pt-BR": ["Suporte - Freezon","Ajuda do Freezon sobre dispositivos, senhas, códigos de recuperação, importação, backup e diagnóstico.","Saiba como importar, fazer backup e recuperar suas fotos, ou enviar um diagnóstico ao suporte."],
      "zh-Hans": ["支持 - Freezon / 定格", "Freezon / 定格的密码、安全恢复码、备份、导入和诊断支持信息。", "获取 Freezon / 定格的密码、备份、恢复、导入和诊断帮助。"],
      "zh-Hant": ["支援 - Freezon / 定格", "Freezon / 定格的密碼、安全復原碼、備份、匯入與診斷支援資訊。", "取得 Freezon / 定格的密碼、備份、復原、匯入與診斷協助。"],
      en: ["Support - Freezon", "Support information for Freezon passwords, Recovery Codes, backups, importing, and diagnostics.", "Get help with Freezon passwords, backups, restore, importing, and diagnostics."],
      ja: ["サポート - Freezon", "Freezonのパスワード、リカバリーコード、バックアップ、読み込み、診断情報に関するサポート。", "Freezonのパスワード、バックアップ、復元、読み込み、診断情報についてご案内します。"]
    },
    privacy: {
      "ko": ["개인정보 처리방침 - Freezon","Freezon 개인정보 처리방침. 기기에 보관되는 데이터와 사용자가 확인 후 전송하는 정보를 설명합니다.","Freezon의 기기 내 데이터, 선택적 진단 정보 및 지원 정보 처리 방법입니다."],
      "es-419": ["Política de privacidad - Freezon","Política de privacidad de Freezon: qué datos se guardan en tu dispositivo y qué información se envía solo cuando tú lo confirmas.","Cómo Freezon trata los datos locales, los diagnósticos opcionales y la información que envías a soporte."],
      "pt-BR": ["Política de privacidade - Freezon","Política de privacidade do Freezon: quais dados ficam no dispositivo e quais informações só são enviadas após sua confirmação.","Como o Freezon trata os dados locais, os diagnósticos opcionais e as informações que você envia ao suporte."],
      "zh-Hans": ["隐私政策 - Freezon / 定格", "Freezon / 定格隐私政策：了解哪些数据保存在设备上，以及哪些信息只会在你确认后发送。", "Freezon / 定格说明设备本地数据、可选诊断与支持信息的处理方式。"],
      "zh-Hant": ["隱私權政策 - Freezon / 定格", "Freezon / 定格隱私權政策：瞭解哪些資料保存在裝置上，以及哪些資訊只會在你確認後傳送。", "Freezon / 定格說明裝置本機資料、選用診斷與支援資訊的處理方式。"],
      en: ["Privacy Policy - Freezon", "Freezon Privacy Policy: learn what stays on your device and what is sent only after you confirm.", "Freezon explains how on-device data, optional diagnostics, and support information are handled."],
      ja: ["プライバシーポリシー - Freezon", "Freezonのプライバシーポリシーです。端末内に保存されるデータと、確認後にのみ送信される情報について説明します。", "Freezonにおける端末内データ、任意の診断情報、サポート情報の取り扱いについて説明します。"]
    },
    "support-banner": {
      ko: ["지원 - Freezon Banner", "Freezon Banner 지원: 시작하기, 전체 화면 표시, 최근 기록과 즐겨찾기, 지원 문의 안내입니다.", "Freezon Banner 편집, 전체 화면 표시와 사용 방법에 관한 도움말입니다."],
      "zh-Hans": ["支持 - 定格手持弹幕", "定格手持弹幕支持：开始使用、全屏展示、最近使用与收藏及联系支持信息。", "获取定格手持弹幕的使用指南、全屏展示与支持帮助。"],
      "zh-Hant": ["支援 - 定格手持彈幕", "定格手持彈幕支援：開始使用、全螢幕展示、最近使用與收藏及聯絡支援資訊。", "取得定格手持彈幕的使用指南、全螢幕展示與支援協助。"],
      en: ["Support - Handheld Banner", "Handheld Banner support: get started, full-screen display, recent items, favorites, and contact support.", "Get help with Handheld Banner editing, full-screen display, and support."],
      ja: ["サポート - 定格手持弹幕", "定格手持弹幕サポート：使い始める、全画面表示、最近使った項目とお気に入り、お問い合わせ。", "定格手持弹幕の利用ガイド、全画面表示、サポート情報についてご案内します。"]
    },
    "privacy-banner": {
      ko: ["개인정보 처리방침 - Freezon Banner", "Freezon Banner 개인정보 처리방침: 기기에 저장되는 데이터와 자동으로 수집하지 않는 정보에 대해 설명합니다.", "Freezon Banner의 기기 내 데이터, 삭제 및 지원 정보 처리 방법입니다."],
      "zh-Hans": ["隐私政策 - 定格手持弹幕", "定格手持弹幕隐私政策：了解哪些数据保存在设备上，以及我们不自动收集数据的原则。", "定格手持弹幕说明设备本机数据、删除与支持信息的处理方式。"],
      "zh-Hant": ["隱私權政策 - 定格手持彈幕", "定格手持彈幕隱私權政策：瞭解哪些資料儲存在裝置上，以及我們不自動收集資料的原則。", "定格手持彈幕說明裝置本機資料、刪除與支援資訊的處理方式。"],
      en: ["Privacy Policy - Handheld Banner", "Handheld Banner Privacy Policy: learn what stays on your device and our no-automatic-collection commitment.", "Handheld Banner explains on-device data handling, deletion, and support contact."],
      ja: ["プライバシーポリシー - 定格手持弹幕", "定格手持弹幕プライバシーポリシー：端末内に保存されるデータと、自動収集を行わない方針について説明します。", "定格手持弹幕における端末内データ、削除、サポートに関する取り扱いについて説明します。"]
    }
  };
  const interfaceLabels = {
    "ko": {"primary":"주 메뉴","mobile":"모바일 메뉴","language":"언어","open":"메뉴 열기","close":"메뉴 닫기","previous":"이전 화면","next":"다음 화면","carousel":"앱 화면","pause":"자동 재생 일시 정지","play":"자동 재생 계속","docs":["지원","개인정보 처리방침"]},
    "es-419": {"primary":"Navegación principal","mobile":"Menú móvil","language":"Idioma","open":"Abrir menú","close":"Cerrar menú","previous":"Pantalla anterior","next":"Pantalla siguiente","carousel":"Pantallas de la app","pause":"Pausar reproducción automática","play":"Reanudar reproducción automática","docs":["Soporte","Privacidad"]},
    "pt-BR": {"primary":"Navegação principal","mobile":"Menu móvel","language":"Idioma","open":"Abrir menu","close":"Fechar menu","previous":"Tela anterior","next":"Próxima tela","carousel":"Telas do app","pause":"Pausar reprodução automática","play":"Retomar reprodução automática","docs":["Suporte","Privacidade"]},
    "zh-Hans": { primary: "主导航", mobile: "移动导航", language: "语言选择", open: "打开导航", close: "关闭导航", previous: "上一张", next: "下一张", carousel: "产品界面轮播", pause: "暂停自动播放", play: "继续自动播放", docs: ["支持", "隐私政策"] },
    "zh-Hant": { primary: "主要導覽", mobile: "行動版導覽", language: "語言選擇", open: "開啟導覽", close: "關閉導覽", previous: "上一張", next: "下一張", carousel: "產品介面輪播", pause: "暫停自動播放", play: "繼續自動播放", docs: ["支援", "隱私權政策"] },
    en: { primary: "Primary navigation", mobile: "Mobile navigation", language: "Language selector", open: "Open navigation", close: "Close navigation", previous: "Previous screen", next: "Next screen", carousel: "Product screen carousel", pause: "Pause autoplay", play: "Resume autoplay", docs: ["Support", "Privacy"] },
    ja: { primary: "メインナビゲーション", mobile: "モバイルナビゲーション", language: "言語選択", open: "ナビゲーションを開く", close: "ナビゲーションを閉じる", previous: "前の画面", next: "次の画面", carousel: "製品画面カルーセル", pause: "自動再生を一時停止", play: "自動再生を再開", docs: ["サポート", "プライバシー"] }
  };

  const normalizeLanguage = (value) => {
    if (!value) return null;
    if (supported.includes(value)) return value;
    const lower = value.toLowerCase();
    return aliases[lower] || aliases[lower.split("-")[0]] || null;
  };

  const initialLanguage = () => {
    const query = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    let saved = null;
    try { saved = normalizeLanguage(window.localStorage.getItem("freezon-language")); } catch (error) {}
    return query || saved || normalizeLanguage(navigator.languages?.[0] || navigator.language) || "zh-Hans";
  };

  const pageName = () => {
    if (document.body.classList.contains("home-page")) return "home";
    if (document.body.classList.contains("banner-home-page")) return "home-banner";
    const isBanner = window.location.pathname.includes("freezon-banner") || document.body.dataset.product === "freezon-banner";
    if (window.location.pathname.includes("privacy")) return isBanner ? "privacy-banner" : "privacy";
    return isBanner ? "support-banner" : "support";
  };

  const updateMetadata = (lang) => {
    const key = pageName();
    const content = pageContent[key]?.[lang];
    if (!content) return;
    document.title = content[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", content[1]);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", content[0]);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", content[2]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", locales[lang]);
    const alts = key.endsWith("-banner") ? bannerImageAlts : imageAlts;
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute("content", content[3] || alts[lang] || "Freezon");
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", content[0]);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", content[2]);
    const canonicalURL = `https://freezonapp.com${pagePaths[key]}?lang=${lang}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalURL);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalURL);
    if (key === "home") {
      const schemaElement = document.querySelector('script[type="application/ld+json"]');
      if (schemaElement) {
        const schema = JSON.parse(schemaElement.textContent);
        schema.name = lang.startsWith("zh") ? "定格" : "Freezon";
        schema.description = content[1];
        schemaElement.textContent = JSON.stringify(schema);
      }
    }
    if (key === "home-banner") {
      const shareImage = `https://freezonapp.com/assets/banner/${lang}/ipad/01-banner.webp`;
      document.querySelector('meta[property="og:image"]')?.setAttribute("content", shareImage);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", shareImage);
    }
  };

  const updateInterfaceLabels = (lang) => {
    const labels = interfaceLabels[lang];
    document.querySelectorAll("[data-language-select]").forEach(select => { select.value = lang; select.setAttribute("aria-label", labels.language); });
    document.querySelector(".desktop-nav, .primary-nav")?.setAttribute("aria-label", labels.primary);
    document.querySelector(".mobile-menu")?.setAttribute("aria-label", labels.mobile);
    document.querySelectorAll(".language-switcher, .mobile-language-switcher").forEach((element) => element.setAttribute("aria-label", labels.language));
    const toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) toggle.setAttribute("aria-label", toggle.getAttribute("aria-expanded") === "true" ? labels.close : labels.open);
    document.querySelectorAll(".primary-nav a").forEach((link, index) => { if (labels.docs[index]) link.textContent = labels.docs[index]; });
  };

  const setLanguage = (lang, persist = true) => {
    if (!supported.includes(lang)) return;
    if (!pageContent[pageName()]?.[lang]) lang = "en";
    document.documentElement.lang = lang;
    if (persist) { try { window.localStorage.setItem("freezon-language", lang); } catch (error) {} }
    const location = new URL(window.location.href);
    location.searchParams.set("lang", lang);
    window.history.replaceState(null, "", `${location.pathname}${location.search}${location.hash}`);
    document.querySelectorAll("[data-language-choice]").forEach((choice) => {
      choice.setAttribute("aria-current", choice.dataset.languageChoice === lang ? "true" : "false");
    });
    document.querySelectorAll("[data-language-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.languagePanel === lang);
    });
    document.querySelectorAll("[data-localized-link]").forEach((link) => {
      const raw = link.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      try {
        const destination = new URL(raw, window.location.href);
        destination.searchParams.set("lang", lang);
        link.setAttribute("href", `${destination.pathname}${destination.search}${destination.hash}`);
      } catch (error) {}
    });
    const menuLabels = {
      "ko": ["두 앨범","주요 기능","배너","개인정보","지원"],
      "es-419": ["Dos álbumes","Funciones","Banner","Privacidad","Soporte"],
      "pt-BR": ["Dois álbuns","Recursos","Banner","Privacidade","Suporte"],
      "zh-Hans": ["双层相册", "核心功能", "手持弹幕", "隐私", "支持"],
      "zh-Hant": ["雙層相簿", "核心功能", "手持彈幕", "隱私", "支援"],
      en: ["Two albums", "Core features", "Banner", "Privacy", "Support"],
      ja: ["2つのアルバム", "主な機能", "手持ち灯牌", "プライバシー", "サポート"]
    };
    if (pageName() === "home") {
      document.querySelectorAll("#mobile-menu > a").forEach((link, index) => { if (menuLabels[lang]?.[index]) link.textContent = menuLabels[lang][index]; });
    }
    const footerLabels = { "ko": ["지원","개인정보 처리방침"], "es-419": ["Soporte","Política de privacidad"], "pt-BR": ["Suporte","Política de privacidade"], "zh-Hans": ["支持", "隐私政策"], "zh-Hant": ["支援", "隱私權政策"], en: ["Support", "Privacy policy"], ja: ["サポート", "プライバシー"] };
    document.querySelectorAll(".footer-links a").forEach((link, index) => { if (footerLabels[lang]?.[index]) link.textContent = footerLabels[lang][index]; });
    updateMetadata(lang);
    updateInterfaceLabels(lang);
    if (window.lucide) window.lucide.createIcons();
    document.dispatchEvent(new CustomEvent("freezon:languagechange", { detail: { lang } }));
  };

  window.showToast = (message, duration = 3000) => {
    const toast = document.getElementById("toast-notification");
    const text = document.getElementById("toast-message");
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.add("show");
    clearTimeout(window._freezonToast);
    window._freezonToast = setTimeout(() => toast.classList.remove("show"), duration);
  };

  window.copyEmail = (email = "freezonapp@163.com") => {
    const fallback = () => { window.location.href = `mailto:${email}`; };
    if (!navigator.clipboard?.writeText) return fallback();
    navigator.clipboard.writeText(email).then(() => {
      const messages = { "zh-Hans": "支持邮箱已复制到剪贴板", "zh-Hant": "支援信箱已複製至剪貼簿", en: "Support email copied", ja: "サポートメールをコピーしました", ko: "지원 이메일 주소를 복사했습니다", "es-419": "Correo de soporte copiado", "pt-BR": "E-mail de suporte copiado" };
      window.showToast(messages[document.documentElement.lang] || messages["zh-Hans"]);
    }).catch(fallback);
  };

  window.toggleAccordion = (button) => {
    const item = button?.closest(".accordion-item");
    if (!item) return;
    item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
  };

  const setMenuState = (open, focusTarget = false) => {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!menu || !toggle) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    updateInterfaceLabels(document.documentElement.lang);
    if (open && focusTarget) menu.querySelector("a")?.focus();
    if (!open && focusTarget) toggle.focus();
  };

  // Resolve the locale before vault.js assigns image URLs.
  if (pageName() === "home") setLanguage(initialLanguage(), false);

  document.addEventListener("DOMContentLoaded", () => {
    setLanguage(initialLanguage(), false);
    document.querySelectorAll("[data-language-select]").forEach(select => select.addEventListener("change", () => {
      setLanguage(select.value);
      if (select.closest("#mobile-menu")) setMenuState(false);
    }));
    document.querySelectorAll("[data-language-choice]").forEach((choice) => {
      choice.addEventListener("click", () => {
        setLanguage(choice.dataset.languageChoice);
        if (choice.closest(".mobile-language-switcher")) setMenuState(false);
      });
    });
    document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      setMenuState(Boolean(menu?.hidden), true);
    });
    document.querySelectorAll("#mobile-menu > a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
    document.addEventListener("keydown", (event) => {
      const menu = document.getElementById("mobile-menu");
      if (event.key === "Escape" && menu && !menu.hidden) setMenuState(false, true);
    });
    if (window.lucide) window.lucide.createIcons();
  });
})();
