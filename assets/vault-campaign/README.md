# Freezon Photo Vault campaign

Web derivatives of the 48 approved Apple bezel posters uploaded to App Store Connect for version 1.0.1 on 2026-10-15. Each of four locales includes six iPhone and six landscape iPad posters. Original composition, image text, and aspect ratio are preserved. No additional device frame is applied.

Source: `/Users/mac/code/local/ios-private-photo-vault/output/appstore-official-bezels-20261015/`. Source attribution and Apple design resource information are in that directory's `NOTES.md` and `resources/`.

The baked-in Apple device frames are iPhone 18 Pro Silver (portrait) and iPad Pro (M5) 11-inch Silver (landscape), from [Apple Design Resources](https://developer.apple.com/design/resources/). The website does not redraw or add device frames.

The website uses only files in this repository. `manifest.json` records source hashes, source dimensions, and output sizes. To regenerate with Node and Sharp installed:

```sh
node tools/prepare-vault-artwork.cjs /path/to/appstore-official-bezels-20261015
```

Small derivatives serve normal layouts; full width derivatives serve high density displays and the image viewer. Both preserve the complete canvas.
