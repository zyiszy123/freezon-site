# Freezon Website

Official product, support, and privacy pages for Freezon and Freezon Banner.

- Freezon: `/`, `/support/freezon/`, `/privacy/freezon/`
- Freezon Banner: `/freezon-banner/`, `/support/freezon-banner/`, `/privacy/freezon-banner/`
- Guides: `/guides/` in English and `/guides/<locale>/` in the six other site languages.
- Legacy `/support/` and `/privacy/` links redirect to the Freezon pages.

The site uses static HTML, CSS, and JavaScript. No build is required. Language preference is stored locally in the browser.

For local preview, run `python3 -m http.server 4173 --bind 127.0.0.1`.

Guides use `guides/<slug>/index.html` and the shared `assets/guides.css`. Use the confirmed article copy and a canonical URL matching the route. Use the same in-app screens across language versions, with screenshots in the page language. Keep campaign artwork for guide covers and share images. Add each new article to the appropriate product group in `guides/index.html` and to `sitemap.xml`. End each article with a link to the relevant product's features in the article language and the product's existing QR image from `assets/appstore/` beside the download button. When available, use the article's App Store Connect campaign URL for the button.

For the first photo vault guide, update localized copy in `scripts/guides/photo-vault.mjs` and run `node scripts/guides/build.mjs`. Commit the generated locale pages together with their source. The generator also refreshes matching language links in the English pages and the localized sitemap entries. Serving the checked-in pages requires no build.

Only material intended for public distribution belongs in this repository. Product implementation evidence, diagnostic captures, and internal artwork records stay outside Git tracking.
