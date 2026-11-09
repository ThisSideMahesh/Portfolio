#!/usr/bin/env node
/**
 * Door pipeline. Input: content/source/door-cutout.png (made on-device from door.webp with
 * `swift scripts/cutout.swift content/source/door.webp content/source/door-cutout.png`).
 * Output, in public/images:
 *   door-frame.png       the whole door (frame, lintel, threshold, both leaves)
 *   door-leaf-left.png   left leaf only, to swing on its left hinge
 *   door-leaf-right.png  right leaf only, to swing on its right hinge
 * The alpha edge is shrunk by 1 px to remove the light fringe left by the white studio
 * background. Leaf positions (as % of the frame) are printed for components/home/door-card.tsx.
 */
import sharp from "sharp";

const SRC = "content/source/door-cutout.png";
const OUT = "public/images";

// Measured on the 1080x1080 source (guides checked visually).
const FRAME = { left: 240, top: 14, width: 586, height: 1010 };
const LEAVES = { left: 336, centre: 533, right: 735, top: 80, bottom: 935 };

// 1 px alpha erosion: split alpha, erode it, join it back.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const alpha = await sharp(data, { raw: info }).extractChannel(3).erode(1).raw().toBuffer();
for (let i = 0; i < info.width * info.height; i++) data[i * 4 + 3] = alpha[i];
const cleaned = sharp(data, { raw: info }).png();
const cleanedBuffer = await cleaned.toBuffer();

async function save(region, file) {
  await sharp(cleanedBuffer).extract(region).png({ compressionLevel: 9 }).toFile(`${OUT}/${file}`);
  const meta = await sharp(`${OUT}/${file}`).metadata();
  if (meta.exif || meta.xmp || meta.iptc) throw new Error(`${file}: metadata was not stripped`);
  console.log(`${file}: ${meta.width}x${meta.height}`);
}

const leafH = LEAVES.bottom - LEAVES.top;

// Frame: the leaf area is made transparent so the dark doorway shows when the leaves open.
{
  const frameRaw = await sharp(cleanedBuffer).extract(FRAME).raw().toBuffer({ resolveWithObject: true });
  const { width: fw, height: fh } = frameRaw.info;
  const x0 = LEAVES.left - FRAME.left;
  const x1 = LEAVES.right - FRAME.left;
  const y0 = LEAVES.top - FRAME.top;
  const y1 = LEAVES.bottom - FRAME.top;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) frameRaw.data[(y * fw + x) * 4 + 3] = 0;
  await sharp(frameRaw.data, { raw: { width: fw, height: fh, channels: 4 } }).png({ compressionLevel: 9 }).toFile(`${OUT}/door-frame.png`);
  console.log(`door-frame.png: ${fw}x${fh} (leaf area cleared)`);
}
await save({ left: LEAVES.left, top: LEAVES.top, width: LEAVES.centre - LEAVES.left, height: leafH }, "door-leaf-left.png");
await save({ left: LEAVES.centre, top: LEAVES.top, width: LEAVES.right - LEAVES.centre, height: leafH }, "door-leaf-right.png");

const pct = (v, of) => `${((v / of) * 100).toFixed(2)}%`;
console.log("leaf box (relative to frame):", {
  top: pct(LEAVES.top - FRAME.top, FRAME.height),
  height: pct(leafH, FRAME.height),
  left: pct(LEAVES.left - FRAME.left, FRAME.width),
  centre: pct(LEAVES.centre - FRAME.left, FRAME.width),
  right: pct(FRAME.left + FRAME.width - LEAVES.right, FRAME.width),
});
