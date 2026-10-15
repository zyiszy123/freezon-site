const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');

const source = process.argv[2];
if (!source) throw new Error('Pass the approved appstore-official-bezels directory.');
const destination = path.resolve(__dirname, '../assets/vault-campaign');
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ja'];
const names = ['01_dual_vault', '02_pure_experience', '03_lossless_media', '04_cross_vault_migration', '05_safe_cleanup', '06_encrypted_backup'];

(async () => {
  const manifest = { source: 'appstore-official-bezels-20261015', transformation: 'Full canvas resized proportionally to WebP; no cropping, reframing, or text changes.', images: [] };
  for (const locale of locales) {
    for (const device of ['iphone', 'ipad']) {
      const folder = path.join(destination, locale, device);
      await fs.mkdir(folder, { recursive: true });
      for (const name of names) {
        const input = await fs.readFile(path.join(source, locale, device, `${name}.png`));
        const metadata = await sharp(input).metadata();
        for (const width of device === 'ipad' ? [1100, 2752] : [660, 1320]) {
          const file = `${name}-${width}.webp`;
          const output = await sharp(input).resize({ width }).webp({ quality: 88, effort: 6 }).toFile(path.join(folder, file));
          manifest.images.push({ locale, device, file, width: output.width, height: output.height, bytes: output.size, sourceWidth: metadata.width, sourceHeight: metadata.height, sourceSHA256: crypto.createHash('sha256').update(input).digest('hex') });
        }
      }
    }
  }
  await fs.writeFile(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Prepared ${manifest.images.length} WebP files from 48 approved posters.`);
})();
