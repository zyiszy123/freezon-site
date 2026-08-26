(() => {
  const supported = ["zh-Hans", "zh-Hant", "en", "ja"];
  const languageAliases = {
    "zh-cn": "zh-Hans",
    "zh-sg": "zh-Hans",
    "zh-hans": "zh-Hans",
    "zh-tw": "zh-Hant",
    "zh-hk": "zh-Hant",
    "zh-hant": "zh-Hant",
    en: "en",
    ja: "ja"
  };

  const normalizedLanguage = (value) => {
    if (!value) return null;
    if (supported.includes(value)) return value;
    const lower = value.toLowerCase();
    if (languageAliases[lower]) return languageAliases[lower];
    const base = lower.split("-")[0];
    return languageAliases[base] || null;
  };

  const getInitialLanguage = () => {
    const parameters = new URLSearchParams(window.location.search);
    const requested = normalizedLanguage(parameters.get("lang"));
    const saved = normalizedLanguage(window.localStorage.getItem("freezon-language"));
    const browser = normalizedLanguage(navigator.languages?.[0] || navigator.language);
    return requested || saved || browser || "zh-Hans";
  };

  let currentLang = getInitialLanguage();

  const setLanguage = (lang) => {
    if (!supported.includes(lang)) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    window.localStorage.setItem("freezon-language", lang);

    // Update active state in switchers
    document.querySelectorAll("[data-language-choice]").forEach((choice) => {
      const selected = choice.dataset.languageChoice === lang;
      choice.setAttribute("aria-current", selected ? "true" : "false");
      if (selected) {
        choice.classList.add("bg-white/15", "text-cyan-400", "border-cyan-400/50");
        choice.classList.remove("text-gray-400", "border-white/10");
      } else {
        choice.classList.remove("bg-white/15", "text-cyan-400", "border-cyan-400/50");
        choice.classList.add("text-gray-400", "border-white/10");
      }
    });

    // Update localized links
    document.querySelectorAll("[data-localized-link]").forEach((link) => {
      try {
        const destination = new URL(link.getAttribute("href"), window.location.href);
        destination.searchParams.set("lang", lang);
        link.setAttribute("href", destination.href);
      } catch (e) {}
    });

    // Refresh icons if lucide is available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // Toast Notification System
  window.showToast = (message, duration = 3000) => {
    const toast = document.getElementById("toast-notification");
    const toastText = document.getElementById("toast-message");
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  };

  // Copy Email Helper
  window.copyEmail = (email = "zyiszyapps@163.com") => {
    navigator.clipboard.writeText(email).then(() => {
      const lang = document.documentElement.lang || "zh-Hans";
      const messages = {
        "zh-Hans": "支持邮箱已复制到剪贴板！",
        "zh-Hant": "支援信箱已複製至剪貼簿！",
        "en": "Support email copied to clipboard!",
        "ja": "サポート用メールアドレスをコピーしました！"
      };
      window.showToast(messages[lang] || messages["zh-Hans"]);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  // Interactive Real App Screenshot Switcher
  window.currentAppScreen = "unlock";

  window.setAppScreen = (screenName) => {
    window.currentAppScreen = screenName;

    // Update Image Slides
    document.querySelectorAll(".screen-slide").forEach((slide) => {
      slide.classList.remove("active");
    });
    const target = document.getElementById(`slide-${screenName}`);
    if (target) {
      target.classList.add("active");
    }

    // Update Interactive Tab Buttons
    document.querySelectorAll("[data-screen-btn]").forEach((btn) => {
      const isActive = btn.dataset.screenBtn === screenName;
      if (isActive) {
        btn.classList.add("bg-white/20", "text-cyan-400", "border-cyan-400/50");
        btn.classList.remove("bg-white/5", "text-gray-400", "border-white/10");
      } else {
        btn.classList.remove("bg-white/20", "text-cyan-400", "border-cyan-400/50");
        btn.classList.add("bg-white/5", "text-gray-400", "border-white/10");
      }
    });

    if (window.lucide) window.lucide.createIcons();
  };

  // Trigger Face ID Unlock Animation
  window.triggerFaceIDUnlock = () => {
    const overlay = document.getElementById("mockup-faceid-overlay");
    if (!overlay) {
      window.setAppScreen("media");
      return;
    }
    overlay.classList.add("scanning");
    setTimeout(() => {
      overlay.classList.remove("scanning");
      window.setAppScreen("media");
      const lang = document.documentElement.lang || "zh-Hans";
      const messages = {
        "zh-Hans": "Face ID 验证成功 · 已解锁相册",
        "zh-Hant": "Face ID 驗證成功 · 已解鎖相簿",
        "en": "Face ID Verified · Album Unlocked",
        "ja": "Face ID 認証成功 · ロック解除完了"
      };
      window.showToast(messages[lang] || messages["zh-Hans"]);
    }, 900);
  };

  
  // Workflow Tour Switcher
  window.setWorkflowTab = (workflowKey) => {
    document.querySelectorAll('[data-workflow-tab]').forEach((tab) => {
      const isTarget = tab.dataset.workflowTab === workflowKey;
      if (isTarget) {
        tab.classList.add('active', 'bg-cyan-500/10', 'border-cyan-400/40', 'text-cyan-400');
        tab.classList.remove('text-gray-400', 'border-white/10', 'bg-white/[0.03]');
      } else {
        tab.classList.remove('active', 'bg-cyan-500/10', 'border-cyan-400/40', 'text-cyan-400');
        tab.classList.add('text-gray-400', 'border-white/10', 'bg-white/[0.03]');
      }
    });

    document.querySelectorAll('.workflow-panel').forEach((panel) => {
      panel.classList.remove('active');
    });
    const activePanel = document.getElementById("workflow-panel-" + workflowKey);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    if (window.lucide) window.lucide.createIcons();
  };

  // Accordion Toggle
  window.toggleAccordion = (headerElement) => {
    const item = headerElement.closest(".accordion-item");
    if (!item) return;
    const isOpen = item.classList.contains("is-open");
    
    // Optional: close siblings if desired or let user keep multiple open
    item.classList.toggle("is-open", !isOpen);
  };

  // Mobile Drawer Toggle
  window.toggleMobileMenu = () => {
    const menu = document.getElementById("mobile-menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  };

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);

    // Language switcher click listeners
    document.querySelectorAll("[data-language-choice]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const lang = button.dataset.languageChoice;
        if (lang) {
          setLanguage(lang);
        }
      });
    });

    // Close mobile menu on clicking any navigation link inside it
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        const menu = document.getElementById("mobile-menu");
        if (menu) menu.classList.add("hidden");
      });
    });

    // TOC Active ScrollSpy for Privacy Policy
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".toc-nav-link").forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("text-cyan-400", "font-semibold", "border-cyan-400", "bg-white/[0.04]");
              link.classList.remove("text-gray-400", "border-transparent");
            } else {
              link.classList.remove("text-cyan-400", "font-semibold", "border-cyan-400", "bg-white/[0.04]");
              link.classList.add("text-gray-400", "border-transparent");
            }
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll("section[id]").forEach((section) => {
      tocObserver.observe(section);
    });

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
})();

