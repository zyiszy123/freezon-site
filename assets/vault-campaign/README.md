# Freezon Photo Vault campaign

Web derivatives of 126 campaign posters in seven locales: `zh-Hans`, `zh-Hant`, `en`, `ja`, `ko`, `es-419`, and `pt-BR`. Each locale has six iPhone, six landscape iPad, and six iPhone Duo posters. Original composition, image text, and aspect ratio are preserved. No additional device frame is applied.

Source: `/Users/mac/code/local/ios-private-photo-vault/appstore-screenshots/final/{iphone,ipad,duo}/{locale}/`. See the source project's `appstore-screenshots/README.md`, `resources/`, and `raw/duo/NOTES.md` for provenance.

The original four-language iPhone/iPad set was uploaded to App Store Connect for version 1.0.1 on 2026-10-15. The website now uses the refreshed iPad set from 2026-10-26 and the three new locales from 2026-10-27, based on App main `2f123bd`. The original four-language iPhone set is unchanged. Baked-in Apple device frames are iPhone 18 Pro Silver (portrait) and iPad Pro (M5) 11-inch Silver (landscape), from [Apple Design Resources](https://developer.apple.com/design/resources/). This update does not upload screenshots to App Store Connect.

The Duo set uses the latest supplied final images, including the refreshed four locales and three new locales. Each combines unfolded inner-screen and folded outer-screen views. Their schematic frames are not official Apple Duo hardware artwork. Media types, counts, and file details use diagnostic sample data; these images do not establish performance or functional test results. The Duo posters have not been uploaded to App Store Connect.

On 2026-10-28, iPad and Duo themes 02, 04, 05 and 06 were refreshed in all seven locales from App main `68d6d2f`: the latest settings sidebar, migration selection, cleanup selection and backup screens. This replaces 56 source posters and 112 WebP derivatives. See the source project's `sidebar-update-captures.json` and `sidebar-update-verification.json` for provenance. iPhone posters and themes 01 and 03 retain their existing files. Updated derivatives use image cache version `20261028`; other posters retain `20261027`.

The website uses only files in this repository. `manifest.json` records source hashes, source dimensions, and output sizes. To regenerate with Node and Sharp installed:

```sh
node tools/prepare-vault-artwork.cjs /path/to/appstore-screenshots/final
```

Small derivatives serve normal layouts; full width derivatives serve high density displays and the image viewer. Both preserve the complete canvas.

Images load on demand. The browser selects one hero source for the current locale and viewport; the gallery has one active image with lazy loading. Switching a device, language, or topic requests the selected image only. Opening the dialog requests its full-size derivative. No gallery prefetch, service worker cache, or bulk image preload is used.
