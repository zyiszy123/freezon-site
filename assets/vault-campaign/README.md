# Freezon Photo Vault campaign

Web derivatives of 72 campaign posters in four locales: six iPhone, six landscape iPad, and six iPhone Duo posters per locale. Original composition, image text, and aspect ratio are preserved. No additional device frame is applied.

Source: `/Users/mac/code/local/ios-private-photo-vault/appstore-screenshots/final/{iphone,ipad,duo}/{locale}/`. See the source project's `appstore-screenshots/README.md`, `resources/`, and `raw/duo/NOTES.md` for provenance.

The 48 iPhone/iPad posters were uploaded to App Store Connect for version 1.0.1 on 2026-10-15. Their baked-in Apple device frames are iPhone 18 Pro Silver (portrait) and iPad Pro (M5) 11-inch Silver (landscape), from [Apple Design Resources](https://developer.apple.com/design/resources/). These sources are unchanged.

The 24 Duo posters were captured on the iPhone Duo simulator and prepared on 2026-10-22. Each combines unfolded inner-screen and folded outer-screen views. Their schematic frames are not official Apple Duo hardware artwork. Media types, counts, and file details use diagnostic sample data; these images do not establish performance or functional test results. The Duo posters have not been uploaded to App Store Connect.

The website uses only files in this repository. `manifest.json` records source hashes, source dimensions, and output sizes. To regenerate with Node and Sharp installed:

```sh
node tools/prepare-vault-artwork.cjs /path/to/appstore-screenshots/final
```

Small derivatives serve normal layouts; full width derivatives serve high density displays and the image viewer. Both preserve the complete canvas.
