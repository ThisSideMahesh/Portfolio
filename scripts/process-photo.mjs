#!/usr/bin/env node
/**
 * Photo pipeline (docs/DESIGN.md §6): crop, resize and global colour balance only.
 * Input:  content/source/photo.jpg (private, git-ignored)
 * Output: public/images/mahesh-hero.jpg (treatment A, 4:5) and mahesh-story.jpg (treatment B, 3:4)
 * sharp drops EXIF/GPS by default (no .withMetadata()), and the script verifies it.
 * next/image then serves AVIF/WebP from these sources.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SRC = "content/source/photo.jpg";
const OUT_DIR = "public/images";
const BALANCE_STRENGTH = 0.4; // 40% grey-world correction: removes the yellow lamp cast, keeps skin tone

mkdirSync(OUT_DIR, { recursive: true });

const { width, height } = await sharp(SRC).metadata();
if (!width || !height) throw new Error(`Cannot read dimensions of ${SRC}`);

const { channels } = await sharp(SRC).stats();
const [r, g, b] = channels.map((c) => c.mean);
const grey = (r + g + b) / 3;
const gains = [r, g, b].map((mean) => 1 + BALANCE_STRENGTH * (grey / mean - 1));

/** @param {sharp.Region} region @param {string} file @param {number} saturation */
async function exportCrop(region, file, saturation) {
  await sharp(SRC)
    .rotate() // honour orientation before the tag is dropped
    .extract(region)
    .linear(gains, [0, 0, 0])
    .modulate({ saturation })
    .toColourspace("srgb")
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`${OUT_DIR}/${file}`);

  const meta = await sharp(`${OUT_DIR}/${file}`).metadata();
  if (meta.exif || meta.xmp || meta.iptc) throw new Error(`${file}: metadata was not stripped`);
  console.log(`${file}: ${meta.width}x${meta.height}, metadata stripped`);
}

// A: head to chest, 4:5, centred, 3% from the top.
const aWidth = Math.round(width * 0.7);
const aHeight = Math.min(Math.round((aWidth * 5) / 4), height);
await exportCrop(
  { left: Math.round((width - aWidth) / 2), top: Math.round(height * 0.03), width: aWidth, height: aHeight },
  "mahesh-hero.jpg",
  1,
);

// B: full figure, 3:4 from the top, slight global desaturation so the planting recedes.
await exportCrop({ left: 0, top: 0, width, height: Math.min(Math.round((width * 4) / 3), height) }, "mahesh-story.jpg", 0.85);

console.log(`gains r=${gains[0].toFixed(3)} g=${gains[1].toFixed(3)} b=${gains[2].toFixed(3)}`);
