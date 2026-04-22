import sharp from "sharp";

import { scaledLuminanceTable } from "~/server/services/jpeg-quantization";
import {
  bppHeuristic,
  compressionRatio,
  mse8bit,
  originalBitsRgb24,
  psnr,
} from "~/server/services/metrics";
import {
  type C,
  cmag2,
  fft2d8x8Real,
  ifft2d8x8ToReal,
} from "~/server/services/fft-2d-8x8";

const BLOCK = 8;
const N = 64;

export type RgbFftInput = {
  imageBuffer: Buffer;
  quality: number;
  sparsity: number;
  threshold: number;
  maxSize: number;
};

export type RgbFftResult = {
  width: number;
  height: number;
  paddedWidth: number;
  paddedHeight: number;
  mse: number;
  psnr: number;
  compressionRatio: number;
  retainedCoefficients: number;
  bppEstimate: number;
  quantizationLabel: string;
  origPng: Buffer;
  reconPng: Buffer;
  dctVizPng: Buffer;
  quantVizPng: Buffer;
};

function padDim(n: number): number {
  return Math.ceil(n / BLOCK) * BLOCK;
}

function sparsityTopByMagnitude(
  F: C[][],
  keepFraction: number,
): { sparse: C[][] } {
  const flat: { i: number; j: number; c: C; m: number }[] = [];
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      const c = { ...F[i]![j]! };
      const m = Math.hypot(c.re, c.im);
      flat.push({ i, j, c, m });
    }
  }
  flat.sort((a, b) => b.m - a.m);
  const k = Math.max(1, Math.min(N, Math.round(keepFraction * N)));
  const sparse: C[][] = Array.from({ length: BLOCK }, () =>
    Array.from({ length: BLOCK }, () => ({ re: 0, im: 0 })),
  );
  for (let t = 0; t < k; t++) {
    const o = flat[t]!;
    sparse[o.i]![o.j] = o.c;
  }
  return { sparse };
}

function processBlockFftIfft(
  block: number[][],
  Q: number[],
  sparsity: number,
  threshold: number,
): { recon: number[][]; nzQuant: number; meanAbs: number; dcMag: number } {
  const f: number[][] = block.map((row) =>
    row.map((v) => v - 128),
  );
  const F = fft2d8x8Real(f);
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      if (cmag2(F[i]![j]!) < threshold * threshold) {
        F[i]![j] = { re: 0, im: 0 };
      }
    }
  }
  const { sparse: S } = sparsityTopByMagnitude(F, sparsity);
  let nz = 0;
  let sumAbs = 0;
  const Qf: C[][] = Array.from({ length: BLOCK }, () =>
    Array.from({ length: BLOCK }, () => ({ re: 0, im: 0 })),
  );
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      const q = Q[i * BLOCK + j]!;
      const z = S[i]![j]!;
      const qre = Math.round(z.re / q);
      const qim = Math.round(z.im / q);
      if (qre !== 0 || qim !== 0) nz += 1;
      sumAbs += Math.abs(qre) + Math.abs(qim);
      Qf[i]![j] = { re: qre * q, im: qim * q };
    }
  }
  const sp = ifft2d8x8ToReal(Qf);
  const recon: number[][] = Array.from({ length: BLOCK }, (_, x) =>
    Array.from({ length: BLOCK }, (_, y) => {
      const v = sp[x]![y]! + 128;
      return Math.min(255, Math.max(0, v));
    }),
  );
  const dc = cmag2(S[0]![0]!);
  return { recon, nzQuant: nz, meanAbs: sumAbs / N, dcMag: Math.sqrt(dc) };
}

function blockRgb(
  r: Uint8ClampedArray,
  g: Uint8ClampedArray,
  b: Uint8ClampedArray,
  w: number,
  px: number,
  py: number,
) {
  const br: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  const bg: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  const bb: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  for (let x = 0; x < BLOCK; x++) {
    for (let y = 0; y < BLOCK; y++) {
      const o = (py + y) * w + (px + x);
      br[x]![y] = r[o] ?? 0;
      bg[x]![y] = g[o] ?? 0;
      bb[x]![y] = b[o] ?? 0;
    }
  }
  return { br, bg, bb };
}

function toRgbPng(
  r: Uint8ClampedArray,
  g: Uint8ClampedArray,
  b: Uint8ClampedArray,
  w: number,
  h: number,
) {
  const inter = new Uint8ClampedArray(w * h * 3);
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    inter[p] = r[i] ?? 0;
    inter[p + 1] = g[i] ?? 0;
    inter[p + 2] = b[i] ?? 0;
  }
  return sharp(Buffer.from(inter.buffer, inter.byteOffset, inter.byteLength), {
    raw: { width: w, height: h, channels: 3 },
  }).png();
}

/**
 * 8×8 blocks, RGB, 2D complex FFT / inverse (per channel), same quant table + sparsity.
 */
export async function runPipelineRgbFft(
  input: RgbFftInput,
): Promise<RgbFftResult> {
  const qTable = scaledLuminanceTable(input.quality);
  const label = `RGB, 2D FFT+IFFT, JPEG-style Q, Q=${input.quality}`;

  const base = await sharp(input.imageBuffer)
    .rotate()
    .resize({
      width: input.maxSize,
      height: input.maxSize,
      fit: "inside",
      withoutEnlargement: true,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w0 = base.info.width;
  const h0 = base.info.height;
  const ch = base.info.channels;
  if (ch < 3) {
    throw new Error("RGB/FFT path needs at least 3 channels.");
  }

  const src = new Uint8ClampedArray(base.data);
  const rIn = new Uint8ClampedArray(w0 * h0);
  const gIn = new Uint8ClampedArray(w0 * h0);
  const bIn = new Uint8ClampedArray(w0 * h0);
  for (let y = 0; y < h0; y++) {
    for (let x = 0; x < w0; x++) {
      const p = (y * w0 + x) * ch;
      rIn[y * w0 + x] = src[p] ?? 0;
      gIn[y * w0 + x] = src[p + 1] ?? 0;
      bIn[y * w0 + x] = src[p + 2] ?? 0;
    }
  }

  const pw = padDim(w0);
  const ph = padDim(h0);
  const r = new Uint8ClampedArray(pw * ph);
  const g = new Uint8ClampedArray(pw * ph);
  const b = new Uint8ClampedArray(pw * ph);
  for (let y = 0; y < h0; y++) {
    for (let x = 0; x < w0; x++) {
      const o = y * pw + x;
      r[o] = rIn[y * w0 + x] ?? 0;
      g[o] = gIn[y * w0 + x] ?? 0;
      b[o] = bIn[y * w0 + x] ?? 0;
    }
  }

  const rOut = new Uint8ClampedArray(pw * ph);
  const gOut = new Uint8ClampedArray(pw * ph);
  const bOut = new Uint8ClampedArray(pw * ph);

  const dctViz = new Float32Array((pw / BLOCK) * (ph / BLOCK));
  const quantViz = new Float32Array((pw / BLOCK) * (ph / BLOCK));
  let totalNz = 0;
  const blocksX = pw / BLOCK;
  const blocksY = ph / BLOCK;

  for (let by = 0; by < blocksY; by++) {
    for (let bx = 0; bx < blocksX; bx++) {
      const px = bx * BLOCK;
      const py = by * BLOCK;
      const { br, bg, bb } = blockRgb(r, g, b, pw, px, py);
      let sumDc = 0;
      let sumM = 0;
      const rr0 = processBlockFftIfft(
        br,
        qTable,
        input.sparsity,
        input.threshold,
      );
      const rr1 = processBlockFftIfft(
        bg,
        qTable,
        input.sparsity,
        input.threshold,
      );
      const rr2 = processBlockFftIfft(
        bb,
        qTable,
        input.sparsity,
        input.threshold,
      );
      totalNz += rr0.nzQuant + rr1.nzQuant + rr2.nzQuant;
      sumDc = (rr0.dcMag + rr1.dcMag + rr2.dcMag) / 3;
      sumM = (rr0.meanAbs + rr1.meanAbs + rr2.meanAbs) / 3;
      dctViz[by * blocksX + bx] = Math.log1p(sumDc);
      quantViz[by * blocksX + bx] = sumM;
      for (let x = 0; x < BLOCK; x++) {
        for (let y = 0; y < BLOCK; y++) {
          const o = (py + y) * pw + (px + x);
          rOut[o] = rr0.recon[x]![y]!;
          gOut[o] = rr1.recon[x]![y]!;
          bOut[o] = rr2.recon[x]![y]!;
        }
      }
    }
  }

  const [origPng, reconPng, dctVizPng, quantVizPng] = await Promise.all([
    toRgbPng(r, g, b, pw, ph)
      .extract({ left: 0, top: 0, width: w0, height: h0 })
      .toBuffer(),
    toRgbPng(rOut, gOut, bOut, pw, ph)
      .extract({ left: 0, top: 0, width: w0, height: h0 })
      .toBuffer(),
    (async () => {
      const maxD = Math.max(1, ...Array.from(dctViz), 1e-6);
      const w = Math.max(1, Math.floor(blocksX));
      const h = Math.max(1, Math.floor(blocksY));
      const p = new Uint8ClampedArray(w * h);
      for (let i = 0; i < w * h; i++) {
        p[i] = Math.min(255, (dctViz[i]! / maxD) * 255);
      }
      return await sharp(
        Buffer.from(p.buffer, p.byteOffset, p.byteLength),
        { raw: { width: w, height: h, channels: 1 } },
      )
        .png()
        .toBuffer();
    })(),
    (async () => {
      const maxQ = Math.max(1, ...Array.from(quantViz), 1e-6);
      const w = Math.max(1, Math.floor(blocksX));
      const h = Math.max(1, Math.floor(blocksY));
      const p = new Uint8ClampedArray(w * h);
      for (let i = 0; i < w * h; i++) {
        p[i] = Math.min(255, (quantViz[i]! / maxQ) * 255);
      }
      return await sharp(
        Buffer.from(p.buffer, p.byteOffset, p.byteLength),
        { raw: { width: w, height: h, channels: 1 } },
      )
        .png()
        .toBuffer();
    })(),
  ]);

  const origRgb = new Uint8ClampedArray(w0 * h0 * 3);
  const reconRgb = new Uint8ClampedArray(w0 * h0 * 3);
  for (let y = 0; y < h0; y++) {
    for (let x = 0; x < w0; x++) {
      const o = (y * w0 + x) * 3;
      origRgb[o] = r[y * pw + x] ?? 0;
      origRgb[o + 1] = g[y * pw + x] ?? 0;
      origRgb[o + 2] = b[y * pw + x] ?? 0;
      reconRgb[o] = rOut[y * pw + x] ?? 0;
      reconRgb[o + 1] = gOut[y * pw + x] ?? 0;
      reconRgb[o + 2] = bOut[y * pw + x] ?? 0;
    }
  }
  const m = mse8bit(origRgb, reconRgb);
  const p = psnr(m);
  const origB = originalBitsRgb24(w0, h0);
  const estB = totalNz * 20;
  const cr = compressionRatio(origB, estB);
  const bpp = bppHeuristic(totalNz, w0, h0, 20);

  return {
    width: w0,
    height: h0,
    paddedWidth: pw,
    paddedHeight: ph,
    mse: m,
    psnr: p,
    compressionRatio: cr,
    retainedCoefficients: totalNz,
    bppEstimate: bpp,
    quantizationLabel: label,
    origPng,
    reconPng,
    dctVizPng,
    quantVizPng,
  };
}
