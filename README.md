# Freezon Website

Official product, support, and privacy pages for Freezon and Freezon Banner.

- Freezon: `/`, `/support/freezon/`, `/privacy/freezon/`
- Freezon Banner: `/freezon-banner/`, `/support/freezon-banner/`, `/privacy/freezon-banner/`
- Guides: `/guides/` in English and `/guides/<locale>/` in the six other site languages.
- Legacy `/support/` and `/privacy/` links redirect to the Freezon pages.

The site uses static HTML, CSS, and JavaScript. No build is required. Language preference is stored locally in the browser.

For local preview, run `python3 -m http.server 4173 --bind 127.0.0.1`.

Guides use `guides/<slug>/index.html` and the shared `assets/guides.css`. Use the confirmed article copy and a canonical URL matching the route. New guides share one set of English app screenshots across all seven pages. The first screenshot has a localized note about the English interface and the app's language support. Existing guides keep their original screenshots. Add each new article to the appropriate product group and to `sitemap.xml`. End each article with a localized product features link and the product's existing QR image from `assets/appstore/` beside the download button. When available, use the article's App Store Connect campaign URL for the button.

Use article-specific cover art from the image generation gateway. Choose a modern visual that represents the topic; for photo vault guides, use contemporary digital imagery. For banner guides that show a phone screen, show short, readable text appropriate to the scene (for example, `ENCORE!` at a concert). Verify the spelling and readability at list thumbnail size. Save one 1200 x 630 WebP, ideally under 100 KiB, at `guides/media/<slug>/cover.webp`. The article, list, and share preview reuse that file for every language. A guide without a suitable cover uses a text-only listing.

For the first photo vault guide, update localized copy in `scripts/guides/photo-vault.mjs` and run `node scripts/guides/build.mjs`. Commit the generated locale pages together with their source. The generator also refreshes matching language links in the English pages and the localized sitemap entries. Serving the checked-in pages requires no build.

New guides are generated from reviewed locale packages in `scripts/guides/articles/`. Run the same guide builder to render all seven pages and update the product listings and sitemap. The Freezon editorial workspace prepares, verifies, and optionally publishes these packages. Commit only the public packages and generated pages; keep reviews and product evidence outside the website repo.

Only material intended for public distribution belongs in this repository. Product implementation evidence, diagnostic captures, and internal artwork records stay outside Git tracking.
