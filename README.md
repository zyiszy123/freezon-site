# Freezon Support Site

Static support and privacy pages for Freezon / 定格.

- Freezon (相册):
  - Support: `/support/freezon/` (legacy `/support/` redirects here)
  - Privacy policy: `/privacy/freezon/` (legacy `/privacy/` redirects here)
- Freezon Banner (手持弹幕):
  - Product: `/freezon-banner/`
  - Support: `/support/freezon-banner/`
  - Privacy policy: `/privacy/freezon-banner/`
- Languages: `zh-Hans`, `zh-Hant`, `en`, and `ja`

The site uses no cookies, forms, analytics, or external runtime dependencies. Language preference is stored locally in the browser. No build is required. Serve the repository with a static HTTP server so directory routes resolve to their index pages.

Photo Vault supports iPhone and iPad with four localized campaign galleries. Approved 1.0.1 artwork is self-contained under `assets/vault-campaign/`; its README and manifest document provenance and proportional WebP conversion. The iPad campaign stays in landscape with its full canvas visible. This website update does not publish the app or deploy the site.

Preview: run `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173/?lang=zh-Hans` (also `zh-Hant`, `en`, `ja`). With Playwright and Sharp available, run `node tools/verify-vault.cjs` for responsive and interaction checks. That check opens individual HTML files directly; use HTTP for manual navigation through directory links.
