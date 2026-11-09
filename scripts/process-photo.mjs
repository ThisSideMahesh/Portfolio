#!/usr/bin/env node
/**
 * Photo pipeline (docs/DESIGN.md §6): background removal (on-device, `pnpm cutout`), crop,
 * resize and global colour balance only. Face and body pixels are never edited.
 * Input:  content/source/photo.jpg and photo-cutout.png (private, git-ignored)
 * Output: public/images/mahesh-cutout.png (B&W), mahesh-cutout-colour.png (hover reveal) and
 *         mahesh-story-cutout.png (B&W full figure), all with transparent backgrounds
 * sharp drops EXIF/GPS by default (no .withMetadata()), and the script verifies it.
 * next/image then serves AVIF/WebP from these sources.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SRC = "content/source/photo.jpg";
const OUT_DIR = "public/images";
const BALANCE_STRENGTH = 0.4; // 40% grey-world correction: removes the yellow lamp cast, keeps skin tone

mkdirSync(OUT_DIR, { recursive: true });

const { channels } = await sharp(SRC).stats();
const [r, g, b] = channels.map((c) => c.mean);
const grey = (r + g + b) / 3;
const gains = [r, g, b].map((mean) => 1 + BALANCE_STRENGTH * (grey / mean - 1));

// Hero: the background-free cut-out (made on-device by `pnpm cutout`), head to just below the
// hands, black and white plus a colour-balanced copy for the hover reveal. PNG keeps the alpha.
const CUTOUT = "content/source/photo-cutout.png";
const cutRegion = { left: 150, top: 40, width: 860, height: 1160 };
for (const [file, colour] of [
  ["mahesh-cutout.png", false],
  ["mahesh-cutout-colour.png", true],
]) {
  let pipeline = sharp(CUTOUT).extract(cutRegion);
  pipeline = colour ? pipeline.linear([...gains, 1], [0, 0, 0, 0]) : pipeline.greyscale();
  await pipeline.toColourspace("srgb").png({ compressionLevel: 9, palette: false }).toFile(`${OUT_DIR}/${file}`);
  const meta = await sharp(`${OUT_DIR}/${file}`).metadata();
  if (meta.exif || meta.xmp || meta.iptc) throw new Error(`${file}: metadata was not stripped`);
  console.log(`${file}: ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}, metadata stripped`);
}

// Story: the full-figure cut-out (no background), black and white.
{
  const file = "mahesh-story-cutout.png";
  await sharp(CUTOUT)
    .extract({ left: 160, top: 50, width: 840, height: 1398 })
    .greyscale()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_DIR}/${file}`);
  const meta = await sharp(`${OUT_DIR}/${file}`).metadata();
  if (meta.exif || meta.xmp || meta.iptc) throw new Error(`${file}: metadata was not stripped`);
  console.log(`${file}: ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}, metadata stripped`);
}

console.log(`gains r=${gains[0].toFixed(3)} g=${gains[1].toFixed(3)} b=${gains[2].toFixed(3)}`);
