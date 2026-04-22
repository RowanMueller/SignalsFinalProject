export function mse8bit(a: Uint8ClampedArray, b: Uint8ClampedArray): number {
  if (a.length !== b.length) throw new Error("MSE: length mismatch");
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i]! - b[i]!;
    s += d * d;
  }
  return s / a.length;
}

export function psnr(mse: number, max: number = 255): number {
  if (mse <= 0) return 99;
  return 10 * Math.log10((max * max) / mse);
}

export function originalBitsGrayscale8(width: number, height: number): number {
  return width * height * 8;
}

export function originalBitsRgb24(width: number, height: number): number {
  return width * height * 24;
}

/** Rough bpp after quant: non-zero int coeffs × bits per coeff / pixels. */
export function bppHeuristic(
  nonZeroCount: number,
  width: number,
  height: number,
  bitsPerCoeff = 10,
): number {
  return (nonZeroCount * bitsPerCoeff) / (width * height);
}

export function compressionRatio(
  origBits: number,
  estCompressedBits: number,
): number {
  if (estCompressedBits < 1) return origBits;
  return origBits / estCompressedBits;
}
