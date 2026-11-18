// news-image-20261117 entry: "The World in One Day" — a one-page front page for
// Tuesday 17 November 2026. The artwork lives in entry.png beside this file
// (drawn as HTML/SVG in page.html, rendered by render.mjs); this program's job
// is to deliver those exact bytes to the output directory, but only after
// proving the image still obeys the contest caps, so a bad asset can never be
// submitted by accident.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output.

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576; // 1 MiB
const MAX_SIDE = 1024; // pixels, either axis

function fail(message: string): never {
  console.error(`main.ts: entry.png rejected: ${message}`);
  process.exit(1);
}

// Width/height read straight from the image header: PNG keeps them in the
// IHDR chunk right after the 8-byte signature; JPEG keeps them in a start-of-
// frame segment, found by walking the marker stream.
function pngSize(bytes: Buffer): { width: number; height: number } {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length < 24 || !signature.every((b, i) => bytes[i] === b)) {
    fail('the PNG signature is missing or the file is truncated');
  }
  if (bytes.toString('ascii', 12, 16) !== 'IHDR') {
    fail('the first PNG chunk is not IHDR');
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function jpegSize(bytes: Buffer): { width: number; height: number } {
  let offset = 2; // skip the SOI marker
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) fail('the JPEG marker stream is corrupt');
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (length < 2) fail('the JPEG marker stream is corrupt');
    // SOF0/SOF1/SOF2 carry the frame dimensions (and are not DHT/JPG/DAC).
    if (marker >= 0xc0 && marker <= 0xc2) {
      if (offset + 9 > bytes.length) fail('the JPEG frame header is truncated');
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  fail('no JPEG start-of-frame segment found');
}

function imageSize(bytes: Buffer): { width: number; height: number } {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return pngSize(bytes);
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return jpegSize(bytes);
  fail('the file is neither a PNG nor a JPEG image');
}

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

if (bytes.length > MAX_BYTES) {
  fail(`the file is ${bytes.length} bytes, over the ${MAX_BYTES}-byte cap`);
}
const { width, height } = imageSize(bytes);
if (width < 1 || height < 1 || width > MAX_SIDE || height > MAX_SIDE) {
  fail(`the image is ${width}x${height}, outside the 1..${MAX_SIDE} pixel limit on each side`);
}

const target = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(source, target);
console.log(`main.ts: entry.png verified (${width}x${height}, ${bytes.length} bytes) and copied to ${target}`);
