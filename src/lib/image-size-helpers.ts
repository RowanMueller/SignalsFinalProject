/** Theoretical size if every pixel were stored raw (8 bits / channel, no file header). */
export function uncompressedRawBytes(
  w: number,
  h: number,
  mode: "GRAY_DCT" | "RGB_FFT",
): number {
  if (w <= 0 || h <= 0) return 0;
  const bytesPerPixel = mode === "RGB_FFT" ? 3 : 1;
  return w * h * bytesPerPixel;
}
