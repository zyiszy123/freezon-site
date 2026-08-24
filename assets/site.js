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

  const parameters = new URLSearchParams(window.location.search);
  const requested = normalizedLanguage(parameters.get("lang"));
  const saved = normalizedLanguage(window.localStorage.getItem("freezon-language"));
  const browser = normalizedLanguage(navigator.languages?.[0] || navigator.language);
  const language = requested || saved || browser || "en";

  document.documentElement.lang = language;
  document.querySelectorAll("[data-language-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.languagePanel === language);
  });
  document.querySelectorAll("[data-language-choice]").forEach((choice) => {
    const selected = choice.dataset.languageChoice === language;
    choice.setAttribute("aria-current", selected ? "true" : "false");
  });
  document.querySelectorAll("[data-localized-link]").forEach((link) => {
    const destination = new URL(link.getAttribute("href"), window.location.href);
    destination.searchParams.set("lang", language);
    link.setAttribute("href", destination.href);
  });
  window.localStorage.setItem("freezon-language", language);
})();
