(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja"];
  const aliases = { "zh-cn": "zh-Hans", "zh-sg": "zh-Hans", "zh-hans": "zh-Hans", "zh-tw": "zh-Hant", "zh-hk": "zh-Hant", "zh-hant": "zh-Hant", en: "en", ja: "ja" };
  const locales = { "zh-Hans": "zh_CN", "zh-Hant": "zh_TW", en: "en_US", ja: "ja_JP" };
  const pagePaths = { home: "/", support: "/support/freezon/", privacy: "/privacy/freezon/" };
  const imageAlts = { "zh-Hans": "Freezon / 定格 App 图标", "zh-Hant": "Freezon / 定格 App 圖示", en: "Freezon app icon", ja: "FreezonのAppアイコン" };
  const pageContent = {
    home: {
      "zh-Hans": ["Freezon / 定格 - 双层私密相册", "定格是一款面向 iPhone 的双层私密相册。日常相册与私密相册分别加密，内容保存在本机，免费使用且没有广告打扰。", "日常相册与私密相册分别加密，照片和视频保存在 iPhone 本机。免费使用，没有开屏广告或摇一摇等打扰。"],
      "zh-Hant": ["Freezon / 定格 - 雙層私密相簿", "定格是一款面向 iPhone 的雙層私密相簿。日常相簿與私密相簿分別加密，內容保存在本機，免費使用且沒有廣告打擾。", "日常相簿與私密相簿分別加密，照片與影片保存在 iPhone 本機。免費使用，沒有開屏廣告或搖一搖等打擾。"],
      en: ["Freezon - Two private albums", "Freezon is a private photo vault for iPhone. Everyday Album and Private Album are encrypted separately, with content stored on device. It is free to use with no advertising interruptions.", "Everyday Album and Private Album are encrypted separately, with photos and videos stored on your iPhone. Free to use, with no splash-screen ads or shake-triggered interruptions."],
      ja: ["Freezon - 2つのプライベートアルバム", "FreezonはiPhone向けのプライベートアルバムです。2つのアルバムを別々に暗号化し、内容を端末内に保存します。無料で利用でき、広告による中断もありません。", "2つのアルバムは別々に暗号化され、写真とビデオは iPhone 本体に保存されます。無料で利用でき、起動画面の広告や振る操作による広告表示はありません。"]
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
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute("content", imageAlts[lang]);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", content[0]);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", content[2]);
    const canonicalURL = `https://freezonapp.com${pagePaths[pageName()]}?lang=${lang}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalURL);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalURL);
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
      "zh-Hans": ["双层相册", "核心功能", "界面", "隐私", "支持"],
      "zh-Hant": ["雙層相簿", "核心功能", "畫面", "隱私", "支援"],
      en: ["Two albums", "Core features", "Screens", "Privacy", "Support"],
      ja: ["2つのアルバム", "主な機能", "画面", "プライバシー", "サポート"]
    };
    document.querySelectorAll("#mobile-menu > a").forEach((link, index) => { if (menuLabels[lang]?.[index]) link.textContent = menuLabels[lang][index]; });
    const footerLabels = { "zh-Hans": ["支持", "隐私政策"], "zh-Hant": ["支援", "隱私權政策"], en: ["Support", "Privacy policy"], ja: ["サポート", "プライバシー"] };
    document.querySelectorAll(".footer-links a").forEach((link, index) => { if (footerLabels[lang]?.[index]) link.textContent = footerLabels[lang][index]; });
    updateMetadata(lang);
    updateInterfaceLabels(lang);
    window.updateCarouselLabels?.();
    const heroImage = document.querySelector(".hero-screen img");
    const heroAlt = { "zh-Hans": "定格锁定界面", "zh-Hant": "定格鎖定畫面", en: "Freezon lock screen", ja: "Freezonのロック画面" };
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

  window.copyEmail = (email = "freezonapp@163.com") => {
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
        ["b50cedc2138720d66050d78b5d5ef2b9.jpg", ["浏览照片", "瀏覽照片", "Browse photos", "写真を見る"]],
        ["d92a0ef4571882a7be5ae710bd2c3f22.jpg", ["相册总览", "相簿總覽", "Album overview", "アルバム一覧"]],
        ["9eb4e735a3f4096b514517e5cc0f4f66.png", ["从系统照片中选择", "從系統照片中選擇", "Choose from Photos", "「写真」から選択"]],
        ["8d81422aab85dc587680e8bd098c281f.png", ["确认所选照片", "確認所選照片", "Review selected photos", "選択した写真を確認"]],
        ["2ad9b19fb7a339bd440e24b6c27bdb35.jpg", ["查看照片信息", "查看照片資訊", "View photo details", "写真情報を見る"]],
        ["8cba85af475761f6fa7d13fb5074d2d5.jpg", ["在地图上浏览", "在地圖上瀏覽", "Browse on a map", "地図で見る"]]
      ];
      gallery.replaceChildren();
      screens.forEach(([file, labels]) => {
        const base = file.replace(/\.[^.]+$/, "");
        const figure = document.createElement("figure");
        figure.className = "ui-figure";
        figure.innerHTML = `<div class="ui-image-wrap"><picture><source type="image/webp" srcset="./assets/realscreens/optimized/${base}-480.webp 480w, ./assets/realscreens/optimized/${base}-800.webp 800w" sizes="(max-width: 520px) min(calc(100vw - 36px), 280px), 320px"><img src="./assets/realscreens/${file}" alt="Freezon app screen: ${labels[2]}" width="1206" height="2622" loading="lazy" decoding="async"></picture></div><figcaption><span data-lang-content="zh-Hans">${labels[0]}</span><span data-lang-content="zh-Hant">${labels[1]}</span><span data-lang-content="en">${labels[2]}</span><span data-lang-content="ja">${labels[3]}</span></figcaption>`;
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

    const initAmbientCanvas = () => {
      const canvas = document.getElementById("ambient-canvas");
      if (!canvas) return;
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (reducedMotion || navigator.connection?.saveData) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let width = 1;
      let height = 1;
      let particles = [];
      const pointer = { x: -10000, y: -10000, active: false };

      const colors = [
        "rgba(255, 255, 255, 0.20)",
        "rgba(155, 200, 209, 0.18)",
        "rgba(255, 255, 255, 0.11)",
        "rgba(155, 200, 209, 0.08)"
      ];

      const getCount = () => {
        const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
        const density = isCoarse ? 0.4 : 0.8;
        const base = Math.floor((width * height) / 9000 * density);
        return Math.min(Math.max(base, 40), isCoarse ? 60 : 130);
      };

      const createParticle = (i) => {
        const seed = i * 13.579;
        const rand = (s) => (Math.sin(s) * 10000) % 1;
        const r1 = Math.abs(rand(seed));
        const r2 = Math.abs(rand(seed + 1));
        return {
          x: r1 * width,
          y: r2 * height,
          vx: 0,
          vy: 0,
          seed: Math.abs(rand(seed + 2)) * 1000,
          color: colors[i % colors.length],
          size: 0.85 + Math.abs(rand(seed + 3)) * 0.35
        };
      };

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));
        const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        particles = Array.from({ length: getCount() }, (_, i) => createParticle(i));
      };

      window.addEventListener("pointermove", (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      }, { passive: true });

      window.addEventListener("blur", () => { pointer.active = false; pointer.x = -10000; pointer.y = -10000; });
      window.addEventListener("resize", resize, { passive: true });
      resize();

      let lastTime = performance.now();
      let isRunning = true;
      let animId = null;

      const loop = (now) => {
        if (!isRunning) return;
        const dt = Math.min(Math.max((now - lastTime) / 16, 0.5), 2.5);
        lastTime = now;

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const influenceRadius = 240;
        const swirlStrength = 0.85;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const oldX = p.x;
          const oldY = p.y;

          const timeVal = now * 0.00035;
          const angle = (
            Math.sin(p.x * 0.0016 + timeVal + p.seed * 0.01) +
            Math.cos(p.y * 0.0016 - timeVal + p.seed * 0.01) +
            Math.sin((p.x + p.y) * 0.0010 + timeVal)
          ) * Math.PI;

          const accel = 0.06;
          p.vx = p.vx * 0.92 + Math.cos(angle) * accel;
          p.vy = p.vy * 0.92 + Math.sin(angle) * accel;

          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < influenceRadius) {
              const factor = (1 - dist / influenceRadius) * swirlStrength;
              p.vx += (-dy / dist) * factor;
              p.vy += (dx / dist) * factor;
            }
          }

          const newX = oldX + p.vx * dt;
          const newY = oldY + p.vy * dt;
          p.x = newX;
          p.y = newY;

          // Delicate fine stream line
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(oldX, oldY);
          ctx.lineTo(newX, newY);
          ctx.stroke();

          if (newX < -30 || newX > width + 30 || newY < -30 || newY > height + 30) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.vx = 0;
            p.vy = 0;
          }
        }

        ctx.restore();
        animId = window.requestAnimationFrame(loop);
      };

      animId = window.requestAnimationFrame(loop);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          isRunning = false;
          if (animId) window.cancelAnimationFrame(animId);
          animId = null;
        } else {
          if (!isRunning) {
            isRunning = true;
            lastTime = performance.now();
            animId = window.requestAnimationFrame(loop);
          }
        }
      });
    };

    const initScrollReveal = () => {
      const targets = document.querySelectorAll(".section, .feature-proof, .album-pair article, .principle-grid article, .quiet-content, .contact-block");
      if (!targets.length) return;
      targets.forEach((el) => el.classList.add("reveal-on-scroll"));

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

      targets.forEach((el) => observer.observe(el));
    };

    initAmbientCanvas();
    initScrollReveal();

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
