/**
 * Standard JPEG luminance quantization table and quality scaling.
 */

const LUMINANCE_BASE: number[] = [
  16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24,
  40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77,
  24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95,
  98, 112, 100, 103, 99,
];

/** Quality 1–100; returns 64 entry row-major 8×8 table (min entry 1). */
export function scaledLuminanceTable(quality: number): number[] {
  const q = Math.min(100, Math.max(1, Math.round(quality)));
  const scale = q < 50 ? 5000 / q : 200 - 2 * q;
  return LUMINANCE_BASE.map((v) => Math.max(1, Math.floor((v * scale + 50) / 100)));
}
