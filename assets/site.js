(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja"];
  const aliases = { "zh-cn": "zh-Hans", "zh-sg": "zh-Hans", "zh-hans": "zh-Hans", "zh-tw": "zh-Hant", "zh-hk": "zh-Hant", "zh-hant": "zh-Hant", en: "en", ja: "ja" };
  const locales = { "zh-Hans": "zh_CN", "zh-Hant": "zh_TW", en: "en_US", ja: "ja_JP" };
  const pageContent = {
    home: {
      "zh-Hans": ["Freezon / 定格 - 双层私密相册", "定格是一款面向 iPhone 的双层私密相册。日常相册与私密相册分别加密，内容保存在本机。", "日常相册与私密相册分别加密。照片、视频和相册资料不会自动上传到开发者服务器。"],
      "zh-Hant": ["Freezon / 定格 - 雙層私密相簿", "定格是一款面向 iPhone 的雙層私密相簿。日常相簿與私密相簿分別加密，內容保存在本機。", "日常相簿與私密相簿分別加密。照片、影片與相簿資料不會自動上傳到開發者伺服器。"],
      en: ["Freezon - Two private albums", "Freezon is a private photo vault for iPhone. Everyday Album and Private Album are encrypted separately, with content stored on device.", "Everyday Album and Private Album are encrypted separately. Photos, videos, and album data are not uploaded to developer servers automatically."],
      ja: ["Freezon - 2つのプライベートアルバム", "FreezonはiPhone向けのプライベートアルバムです。2つのアルバムを別々に暗号化し、内容を端末内に保存します。", "2つのアルバムは別々に暗号化されます。写真、ビデオ、アルバムデータが開発者サーバーへ自動送信されることはありません。"]
    },
    support: {
      "zh-Hans": ["支持 - Freezon / 定格", "Freezon / 定格的密码、安全恢复码、备份、导入和诊断支持信息。", "获取 Freezon / 定格的密码、备份、恢复、导入和诊断帮助。"],
      "zh-Hant": ["支援 - Freezon / 定格", "Freezon / 定格的密碼、安全復原碼、備份、匯入與診斷支援資訊。", "取得 Freezon / 定格的密碼、備份、復原、匯入與診斷協助。"],
      en: ["Support - Freezon", "Support information for Freezon passwords, Recovery Codes, backups, importing, and diagnostics.", "Get help with Freezon passwords, backups, restore, importing, and diagnostics."],
      ja: ["サポート - Freezon", "Freezonのパスワード、リカバリーコード、バックアップ、読み込み、診断情報に関するサポート。", "Freezonのパスワード、バックアップ、復元、読み込み、診断情報についてご案内します。"]
    },
    privacy: {
      "zh-Hans": ["隐私政策 - Freezon / 定格", "Freezon / 定格隐私政策：了解哪些数据保存在设备上，以及哪些信息只会在你确认后发送。", "Freezon / 定格说明设备本地数据、可选诊断与支持信息的处理方式。"],
      "zh-Hant": ["隱私權政策 - Freezon / 定格", "Freezon / 定格隱私權政策：瞭解哪些資料保存在裝置上，以及哪些資訊只會在你確認後傳送。", "Freezon / 定格說明裝置本機資料、選用診斷與支援資訊的處理方式。"],
      en: ["Privacy Policy - Freezon", "Freezon Privacy Policy: learn what stays on your device and what is sent only after you confirm.", "Freezon explains how on-device data, optional diagnostics, and support information are handled."],
      ja: ["プライバシーポリシー - Freezon", "Freezonのプライバシーポリシーです。端末内に保存されるデータと、確認後にのみ送信される情報について説明します。", "Freezonにおける端末内データ、任意の診断情報、サポート情報の取り扱いについて説明します。"]
    }
  };
  const interfaceLabels = {
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
    if (window.location.pathname.includes("privacy")) return "privacy";
    return "support";
  };

  const updateMetadata = (lang) => {
    const content = pageContent[pageName()]?.[lang];
    if (!content) return;
    document.title = content[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", content[1]);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", content[0]);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", content[2]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", locales[lang]);
  };

  const updateInterfaceLabels = (lang) => {
    const labels = interfaceLabels[lang];
    document.querySelector(".desktop-nav, .primary-nav")?.setAttribute("aria-label", labels.primary);
    document.querySelector(".mobile-menu")?.setAttribute("aria-label", labels.mobile);
    document.querySelectorAll(".language-switcher, .mobile-language-switcher").forEach((element) => element.setAttribute("aria-label", labels.language));
    const toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) toggle.setAttribute("aria-label", toggle.getAttribute("aria-expanded") === "true" ? labels.close : labels.open);
    document.querySelectorAll(".primary-nav a").forEach((link, index) => { if (labels.docs[index]) link.textContent = labels.docs[index]; });
  };

  const setLanguage = (lang) => {
    if (!supported.includes(lang)) return;
    document.documentElement.lang = lang;
    try { window.localStorage.setItem("freezon-language", lang); } catch (error) {}
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
      "zh-Hans": ["双层相册", "功能", "界面", "隐私", "支持"],
      "zh-Hant": ["雙層相簿", "功能", "畫面", "隱私", "支援"],
      en: ["Two albums", "Features", "Screens", "Privacy", "Support"],
      ja: ["2つのアルバム", "機能", "画面", "プライバシー", "サポート"]
    };
    document.querySelectorAll("#mobile-menu > a").forEach((link, index) => { if (menuLabels[lang]?.[index]) link.textContent = menuLabels[lang][index]; });
    const footerLabels = { "zh-Hans": ["支持", "隐私政策"], "zh-Hant": ["支援", "隱私權政策"], en: ["Support", "Privacy policy"], ja: ["サポート", "プライバシー"] };
    document.querySelectorAll(".footer-links a").forEach((link, index) => { if (footerLabels[lang]?.[index]) link.textContent = footerLabels[lang][index]; });
    updateMetadata(lang);
    updateInterfaceLabels(lang);
    window.updateCarouselLabels?.();
    const heroImage = document.querySelector(".hero-screen img");
    const heroAlt = { "zh-Hans": "定格真机界面：照片网格", "zh-Hant": "定格實機畫面：照片網格", en: "Freezon app screen: Photo grid", ja: "Freezonの実機画面：写真グリッド" };
    if (heroImage) heroImage.alt = heroAlt[lang];
    if (window.lucide) window.lucide.createIcons();
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

  window.copyEmail = (email = "zyiszyapps@163.com") => {
    const fallback = () => { window.location.href = `mailto:${email}`; };
    if (!navigator.clipboard?.writeText) return fallback();
    navigator.clipboard.writeText(email).then(() => {
      const messages = { "zh-Hans": "支持邮箱已复制到剪贴板", "zh-Hant": "支援信箱已複製至剪貼簿", en: "Support email copied", ja: "サポートメールをコピーしました" };
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

  document.addEventListener("DOMContentLoaded", () => {
    setLanguage(initialLanguage());
    const gallery = document.querySelector(".ui-gallery");
    if (gallery && !gallery.dataset.expanded) {
      gallery.dataset.expanded = "true";
      const screens = [
        ["b50cedc2138720d66050d78b5d5ef2b9.jpg", ["照片网格", "照片網格", "Photo grid", "写真グリッド"]],
        ["9eb4e735a3f4096b514517e5cc0f4f66.png", ["选择照片", "選擇照片", "Photo selection", "写真を選択"]],
        ["8d81422aab85dc587680e8bd098c281f.png", ["确认导入", "確認匯入", "Import confirmation", "読み込みの確認"]],
        ["0dbd4a530c01efea743e587a3ccdf208.png", ["准备原图", "準備原始檔", "Preparing originals", "オリジナルを準備"]],
        ["0b505a9341066f3e4b32a28e577a3c17.png", ["选择要移动的照片", "選擇要移動的照片", "Select photos to move", "移動する写真を選択"]],
        ["7a03eca1425a535efed6f99d3792b201.png", ["移动进度", "移動進度", "Move progress", "移動の進捗"]],
        ["6047cf48b866462b583dd83d2c859699.png", ["清理原图", "清理原始檔", "Original cleanup", "オリジナルを整理"]],
        ["38b915ea324fbac586057e2774e21864.png", ["待清理原图", "待清理原始檔", "Pending Deletion", "削除待ち写真"]],
        ["2ad9b19fb7a339bd440e24b6c27bdb35.jpg", ["照片信息", "照片資訊", "Photo information", "写真情報"]],
        ["8cba85af475761f6fa7d13fb5074d2d5.jpg", ["照片地图", "照片地圖", "Photo map", "写真の地図"]],
        ["71e249835e0560dc8c81b2cdbc72369a.png", ["加密备份", "加密備份", "Encrypted backup", "暗号化バックアップ"]]
      ];
      gallery.replaceChildren();
      screens.forEach(([file, labels]) => {
        const base = file.replace(/\.[^.]+$/, "");
        const figure = document.createElement("figure");
        figure.className = "ui-figure";
        figure.innerHTML = `<div class="ui-image-wrap"><picture><source type="image/webp" srcset="./assets/realscreens/optimized/${base}-480.webp 480w, ./assets/realscreens/optimized/${base}-800.webp 800w" sizes="(max-width: 520px) calc(100vw - 36px), 380px"><img src="./assets/realscreens/${file}" alt="Freezon app screen: ${labels[2]}" width="1206" height="2622" loading="lazy" decoding="async"></picture></div><figcaption><span data-lang-content="zh-Hans">${labels[0]}</span><span data-lang-content="zh-Hant">${labels[1]}</span><span data-lang-content="en">${labels[2]}</span><span data-lang-content="ja">${labels[3]}</span></figcaption>`;
        gallery.appendChild(figure);
      });

      const viewport = document.createElement("div");
      viewport.className = "carousel-viewport";
      viewport.setAttribute("role", "region");
      viewport.setAttribute("aria-roledescription", "carousel");
      viewport.tabIndex = 0;
      gallery.before(viewport);
      viewport.appendChild(gallery);

      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "carousel-button carousel-previous";
      previous.innerHTML = '<span class="carousel-arrow carousel-arrow-left" aria-hidden="true"></span>';
      const next = document.createElement("button");
      next.type = "button";
      next.className = "carousel-button carousel-next";
      next.innerHTML = '<span class="carousel-arrow carousel-arrow-right" aria-hidden="true"></span>';
      const playback = document.createElement("button");
      playback.type = "button";
      playback.className = "carousel-button carousel-playback";
      playback.setAttribute("aria-pressed", "false");
      playback.innerHTML = '<span class="carousel-playback-icon" aria-hidden="true"></span>';
      const counter = document.createElement("span");
      counter.className = "carousel-counter";
      counter.setAttribute("aria-live", "polite");
      viewport.append(previous, next, playback, counter);

      const slides = [...gallery.children];
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let activeIndex = 0;
      let timer = null;
      let isVisible = true;
      let userPaused = reducedMotion.matches;
      playback.setAttribute("aria-pressed", userPaused ? "true" : "false");

      const updateLabels = () => {
        const lang = document.documentElement.lang;
        const labels = interfaceLabels[lang];
        previous.setAttribute("aria-label", labels.previous);
        next.setAttribute("aria-label", labels.next);
        viewport.setAttribute("aria-label", labels.carousel);
        playback.setAttribute("aria-label", userPaused ? labels.play : labels.pause);
        const altPrefixes = { "zh-Hans": "定格真机界面：", "zh-Hant": "定格實機畫面：", en: "Freezon app screen: ", ja: "Freezonの実機画面：" };
        slides.forEach((slide) => {
          const caption = slide.querySelector(`[data-lang-content="${lang}"]`)?.textContent || "";
          const image = slide.querySelector("img");
          if (image) image.alt = `${altPrefixes[lang]}${caption}`;
        });
      };

      const render = () => {
        const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
        gallery.style.transform = `translate3d(-${activeIndex * (viewport.clientWidth + gap)}px, 0, 0)`;
        counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        slides.forEach((slide, index) => {
          const hidden = index !== activeIndex;
          slide.setAttribute("aria-hidden", hidden ? "true" : "false");
          slide.inert = hidden;
        });
      };

      const stopAutoplay = () => {
        window.clearInterval(timer);
        timer = null;
      };
      const startAutoplay = () => {
        stopAutoplay();
        if (userPaused || !isVisible || document.activeElement === viewport || document.hidden) return;
        timer = window.setInterval(() => {
          activeIndex = (activeIndex + 1) % slides.length;
          render();
        }, 4500);
      };
      const move = (step) => {
        activeIndex = (activeIndex + step + slides.length) % slides.length;
        render();
        startAutoplay();
      };
      const setPaused = (paused) => {
        userPaused = paused;
        playback.setAttribute("aria-pressed", paused ? "true" : "false");
        updateLabels();
        startAutoplay();
      };

      previous.addEventListener("click", () => move(-1));
      next.addEventListener("click", () => move(1));
      playback.addEventListener("click", () => setPaused(!userPaused));
      viewport.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      });
      viewport.addEventListener("focus", stopAutoplay);
      viewport.addEventListener("blur", startAutoplay);
      window.addEventListener("resize", render);
      document.addEventListener("visibilitychange", startAutoplay);
      reducedMotion.addEventListener?.("change", () => {
        if (reducedMotion.matches) setPaused(true); else startAutoplay();
      });
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        startAutoplay();
      }, { threshold: .35 }).observe(viewport);

      window.updateCarouselLabels = updateLabels;
      updateLabels();
      render();
      startAutoplay();
    }

    document.querySelectorAll("[data-language-choice]").forEach((choice) => {
      choice.addEventListener("click", () => setLanguage(choice.dataset.languageChoice));
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
