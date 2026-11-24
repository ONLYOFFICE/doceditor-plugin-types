// Placeholder PNG icons for a new plugin, drawn in code so the scaffold needs no binary assets:
// a rounded square in the theme's foreground color. They exist so config.json points at real
// files from the first run; the author replaces them with their own artwork.

import zlib from 'node:zlib';

/** Toolbar icon scales the editor asks for, with the file suffix each one uses. */
export const ICON_SCALES = Object.freeze([
  { scale: '100%', suffix: '', factor: 1 },
  { scale: '125%', suffix: '@1.25x', factor: 1.25 },
  { scale: '150%', suffix: '@1.5x', factor: 1.5 },
  { scale: '175%', suffix: '@1.75x', factor: 1.75 },
  { scale: '200%', suffix: '@2x', factor: 2 },
]);

const TOOLBAR_SIZE = 28;
const STORE_SIZE = [120, 60];

const COLORS = {
  light: [0x44, 0x44, 0x44],
  dark: [0xf3, 0xf3, 0xf3],
  store: [0x44, 0x6d, 0xb3],
};

/**
 * Every icon file a scaffolded plugin references, keyed by its path inside the plugin.
 * @returns {Map<string, Buffer>}
 */
export function placeholderIcons() {
  const files = new Map();
  for (const style of ['light', 'dark']) {
    for (const { suffix, factor } of ICON_SCALES) {
      const size = Math.round(TOOLBAR_SIZE * factor);
      files.set(`resources/${style}/icon${suffix}.png`, roundedSquare(size, size, COLORS[style]));
    }
  }
  for (const { suffix, factor } of ICON_SCALES) {
    const [w, h] = STORE_SIZE.map((n) => Math.round(n * factor));
    files.set(`resources/store/icons/icon${suffix}.png`, roundedSquare(w, h, COLORS.store));
  }
  return files;
}

/**
 * A centered rounded square on a transparent canvas, as an RGBA PNG.
 * @param {number} width @param {number} height @param {number[]} rgb
 */
function roundedSquare(width, height, rgb) {
  const side = Math.round(Math.min(width, height) * 0.7);
  const left = Math.floor((width - side) / 2);
  const top = Math.floor((height - side) / 2);
  const radius = side * 0.22;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1);
    raw[row] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const alpha = coverage(x + 0.5 - left, y + 0.5 - top, side, radius);
      if (!alpha) continue;
      const at = row + 1 + x * 4;
      raw[at] = rgb[0];
      raw[at + 1] = rgb[1];
      raw[at + 2] = rgb[2];
      raw[at + 3] = Math.round(alpha * 255);
    }
  }
  return png(width, height, raw);
}

/** How much of the pixel centered at (x, y) the rounded square covers, 0..1, with a soft edge. */
function coverage(x, y, side, radius) {
  const dx = Math.max(radius - x, 0, x - (side - radius));
  const dy = Math.max(radius - y, 0, y - (side - radius));
  if (x < 0 || y < 0 || x > side || y > side) return 0;
  const outside = Math.hypot(dx, dy) - radius;
  return Math.min(1, Math.max(0, 0.5 - outside));
}

function png(width, height, raw) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
