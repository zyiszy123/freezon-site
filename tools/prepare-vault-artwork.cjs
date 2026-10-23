const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');

const source = process.argv[2];
if (!source) throw new Error('Pass the appstore-screenshots/final directory.');
const destination = path.resolve(__dirname, '../assets/vault-campaign');
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ja'];
const names = ['01_dual_vault', '02_pure_experience', '03_lossless_media', '04_cross_vault_migration', '05_safe_cleanup', '06_encrypted_backup'];
const devices = {
  iphone: { widths: [660, 1320], size: [1320, 2868] },
  ipad: { widths: [1100, 2752], size: [2752, 2064] },
  duo: { widths: [1100, 2853], size: [2853, 2007] }
};

(async () => {
  const manifest = {
    source: 'appstore-screenshots/final',
    provenance: {
      iphone: '2026-10-15 approved App Store posters with Apple device frames.',
      ipad: '2026-10-15 approved App Store posters with Apple device frames.',
      duo: '2026-10-22 simulator campaign posters with schematic frames, not official Apple hardware artwork; not uploaded to App Store Connect.'
    },
    transformation: 'Full canvas resized proportionally to WebP; no cropping, reframing, or text changes.', images: []
  };
  for (const locale of locales) {
    for (const [device, spec] of Object.entries(devices)) {
      const folder = path.join(destination, locale, device);
      await fs.mkdir(folder, { recursive: true });
      for (const name of names) {
        const input = await fs.readFile(path.join(source, device, locale, `${name}.png`));
        const metadata = await sharp(input).metadata();
        if (metadata.width !== spec.size[0] || metadata.height !== spec.size[1]) throw new Error(`Unexpected dimensions: ${device}/${locale}/${name}`);
        for (const width of spec.widths) {
          const file = `${name}-${width}.webp`;
          const output = await sharp(input).resize({ width }).webp({ quality: 88, effort: 6 }).toFile(path.join(folder, file));
          manifest.images.push({ locale, device, file, width: output.width, height: output.height, bytes: output.size, sourceWidth: metadata.width, sourceHeight: metadata.height, sourceSHA256: crypto.createHash('sha256').update(input).digest('hex') });
        }
      }
    }
  }
  await fs.writeFile(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Prepared ${manifest.images.length} WebP files from 72 campaign posters.`);
})();
