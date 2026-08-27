(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja"];
  const aliases = { "zh-cn": "zh-Hans", "zh-sg": "zh-Hans", "zh-hans": "zh-Hans", "zh-tw": "zh-Hant", "zh-hk": "zh-Hant", "zh-hant": "zh-Hant", en: "en", ja: "ja" };

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

  const setLanguage = (lang) => {
    if (!supported.includes(lang)) return;
    document.documentElement.lang = lang;
    try { window.localStorage.setItem("freezon-language", lang); } catch (error) {}
    document.querySelectorAll("[data-language-choice]").forEach((choice) => {
      const selected = choice.dataset.languageChoice === lang;
      choice.setAttribute("aria-current", selected ? "true" : "false");
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
    document.querySelectorAll("#mobile-menu a").forEach((link, index) => { if (menuLabels[lang]?.[index]) link.textContent = menuLabels[lang][index]; });
    const footerLabels = { "zh-Hans": ["支持", "隐私政策"], "zh-Hant": ["支援", "隱私權政策"], en: ["Support", "Privacy policy"], ja: ["サポート", "プライバシー"] };
    document.querySelectorAll(".footer-links a").forEach((link, index) => { if (footerLabels[lang]?.[index]) link.textContent = footerLabels[lang][index]; });
    window.updateCarouselLabels?.();
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

  const setMenuState = (open) => {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!menu || !toggle) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  window.toggleMobileMenu = () => {
    const menu = document.getElementById("mobile-menu");
    setMenuState(Boolean(menu && menu.hidden));
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
        const figure = document.createElement("figure");
        figure.className = "ui-figure";
        figure.innerHTML = `<div class="ui-image-wrap"><img src="./assets/realscreens/${file}" alt="Freezon app screen: ${labels[2]}" loading="lazy"></div><figcaption><span data-lang-content="zh-Hans">${labels[0]}</span><span data-lang-content="zh-Hant">${labels[1]}</span><span data-lang-content="en">${labels[2]}</span><span data-lang-content="ja">${labels[3]}</span></figcaption>`;
        gallery.appendChild(figure);
      });

      const viewport = document.createElement("div");
      viewport.className = "carousel-viewport";
      viewport.setAttribute("role", "region");
      viewport.setAttribute("aria-roledescription", "carousel");
      gallery.before(viewport);
      viewport.appendChild(gallery);

      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "carousel-button carousel-previous";
      previous.innerHTML = '<span aria-hidden="true">←</span>';
      const next = document.createElement("button");
      next.type = "button";
      next.className = "carousel-button carousel-next";
      next.innerHTML = '<span aria-hidden="true">→</span>';
      const counter = document.createElement("span");
      counter.className = "carousel-counter";
      counter.setAttribute("aria-live", "polite");
      viewport.append(previous, next, counter);

      const slides = [...gallery.children];
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let activeIndex = 0;
      let timer = null;
      let isVisible = true;

      const updateLabels = () => {
        const lang = document.documentElement.lang;
        const labels = {
          "zh-Hans": ["上一张", "下一张", "产品界面轮播"],
          "zh-Hant": ["上一張", "下一張", "產品介面輪播"],
          en: ["Previous screen", "Next screen", "Product screen carousel"],
          ja: ["前の画面", "次の画面", "製品画面カルーセル"]
        }[lang] || ["上一张", "下一张", "产品界面轮播"];
        previous.setAttribute("aria-label", labels[0]);
        next.setAttribute("aria-label", labels[1]);
        viewport.setAttribute("aria-label", labels[2]);
        const altPrefixes = { "zh-Hans": "定格真机界面：", "zh-Hant": "定格實機畫面：", en: "Freezon app screen: ", ja: "Freezonの実機画面：" };
        slides.forEach((slide) => {
          const caption = slide.querySelector(`[data-lang-content="${lang}"]`)?.textContent || "";
          const image = slide.querySelector("img");
          if (image) image.alt = `${altPrefixes[lang] || altPrefixes.en}${caption}`;
        });
      };

      const render = () => {
        const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
        gallery.style.transform = `translate3d(-${activeIndex * (viewport.clientWidth + gap)}px, 0, 0)`;
        counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        slides.forEach((slide, index) => slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true"));
      };

      const stopAutoplay = () => {
        window.clearInterval(timer);
        timer = null;
      };
      const startAutoplay = () => {
        stopAutoplay();
        if (reducedMotion.matches || !isVisible || document.hidden) return;
        timer = window.setInterval(() => {
          activeIndex = (activeIndex + 1) % slides.length;
          render();
        }, 3500);
      };
      const move = (step) => {
        activeIndex = (activeIndex + step + slides.length) % slides.length;
        render();
        startAutoplay();
      };

      previous.addEventListener("click", () => move(-1));
      next.addEventListener("click", () => move(1));
      viewport.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      });
      viewport.addEventListener("mouseenter", stopAutoplay);
      viewport.addEventListener("mouseleave", startAutoplay);
      viewport.addEventListener("focusin", stopAutoplay);
      viewport.addEventListener("focusout", startAutoplay);
      window.addEventListener("resize", render);
      document.addEventListener("visibilitychange", startAutoplay);
      reducedMotion.addEventListener?.("change", startAutoplay);
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startAutoplay(); else stopAutoplay();
      }, { threshold: .35 }).observe(viewport);

      window.updateCarouselLabels = updateLabels;
      updateLabels();
      render();
      startAutoplay();
    }
    document.querySelectorAll("[data-language-choice]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.languageChoice)));
    document.querySelector("[data-menu-toggle]")?.addEventListener("click", window.toggleMobileMenu);
    document.querySelectorAll("#mobile-menu a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
    if (window.lucide) window.lucide.createIcons();
  });
})();
