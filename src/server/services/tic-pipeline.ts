import sharp from "sharp";

import { dct2d8x8, idct2d8x8 } from "~/server/services/dct-block";
import { scaledLuminanceTable } from "~/server/services/jpeg-quantization";
import {
  bppHeuristic,
  compressionRatio,
  mse8bit,
  originalBitsGrayscale8,
  psnr,
} from "~/server/services/metrics";

const BLOCK = 8;
const N = 64;

export type PipelineInput = {
  imageBuffer: Buffer;
  quality: number;
  /** 0..1, fraction of DCT coefficients kept per 8×8 block (before quant). */
  sparsity: number;
  /** If > 0, zero DCT coeff with |c| < threshold before sparsity. */
  threshold: number;
  maxSize: number;
};

export type PipelineResult = {
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

function applySparsity(
  dct: number[][],
  keepFraction: number,
): { sparse: number[][] } {
  const flat: { i: number; j: number; v: number }[] = [];
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      flat.push({ i, j, v: dct[i]![j]! });
    }
  }
  flat.sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
  const k = Math.max(1, Math.min(N, Math.round(keepFraction * N)));
  const sparse: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  for (let t = 0; t < k; t++) {
    const o = flat[t];
    if (o) sparse[o.i]![o.j] = o.v;
  }
  return { sparse };
}

function processBlockDct(
  block: number[][],
  Q: number[],
  sparsity: number,
  threshold: number,
): { recon: number[][]; nzQuant: number; quantAbs: number } {
  const f: number[][] = Array.from({ length: BLOCK }, (_, x) =>
    Array.from({ length: BLOCK }, (_, y) => block[x]![y]! - 128),
  );
  const D = dct2d8x8(f);
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      if (Math.abs(D[i]![j]!) < threshold) {
        D[i]![j] = 0;
      }
    }
  }
  const { sparse: S } = applySparsity(D, sparsity);
  let nz = 0;
  let sumAbs = 0;
  const qblock: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      const q = Q[i * BLOCK + j]!;
      const qd = S[i]![j]! / q;
      const r = Math.round(qd);
      if (r !== 0) nz += 1;
      sumAbs += Math.abs(r);
      qblock[i]![j] = r;
    }
  }
  const Dq: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  for (let i = 0; i < BLOCK; i++) {
    for (let j = 0; j < BLOCK; j++) {
      Dq[i]![j] = qblock[i]![j]! * Q[i * BLOCK + j]!;
    }
  }
  const sp = idct2d8x8(Dq);
  const recon: number[][] = Array.from({ length: BLOCK }, (_, x) =>
    Array.from({ length: BLOCK }, (_, y) => {
      const v = sp[x]![y]! + 128;
      return Math.min(255, Math.max(0, v));
    }),
  );
  return { recon, nzQuant: nz, quantAbs: sumAbs / N };
}

function blockFromGrey(
  grey: Uint8ClampedArray,
  w: number,
  px: number,
  py: number,
): number[][] {
  const b: number[][] = Array.from({ length: BLOCK }, () =>
    Array<number>(BLOCK).fill(0),
  );
  for (let x = 0; x < BLOCK; x++) {
    for (let y = 0; y < BLOCK; y++) {
      b[x]![y] = grey[(py + y) * w + (px + x)] ?? 0;
    }
  }
  return b;
}

function toGreyPng(buf: Uint8ClampedArray, w: number, h: number) {
  return sharp(
    Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength),
    { raw: { width: w, height: h, channels: 1 } },
  ).png();
}

/**
 * Block–DCT, JPEG luma quant, optional sparsity + threshold, grayscale.
 * For RGB and the FFT (Fourier) path use `runPipelineRgbFft` in `tic-pipeline-rgb-fft`.
 */
export async function runPipeline(
  input: PipelineInput,
): Promise<PipelineResult> {
  const qTable = scaledLuminanceTable(input.quality);
  const label = `JPEG luma, Q=${input.quality}`;

  const meta = await sharp(input.imageBuffer)
    .grayscale()
    .rotate()
    .resize({
      width: input.maxSize,
      height: input.maxSize,
      fit: "inside",
      withoutEnlargement: true,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w0 = meta.info.width;
  const h0 = meta.info.height;
  const pw = padDim(w0);
  const ph = padDim(h0);
  const grey = new Uint8ClampedArray(pw * ph);
  const { data } = meta;
  for (let y = 0; y < h0; y++) {
    for (let x = 0; x < w0; x++) {
      grey[y * pw + x] = data[y * w0 + x] ?? 0;
    }
  }

  const outGrey = new Uint8ClampedArray(pw * ph);
  const dctViz = new Float32Array((pw / BLOCK) * (ph / BLOCK));
  const quantViz = new Float32Array((pw / BLOCK) * (ph / BLOCK));
  let totalNz = 0;
  const blocksX = pw / BLOCK;
  const blocksY = ph / BLOCK;

  for (let by = 0; by < blocksY; by++) {
    for (let bx = 0; bx < blocksX; bx++) {
      const px = bx * BLOCK;
      const py = by * BLOCK;
      const block = blockFromGrey(grey, pw, px, py);
      const f = block.map((row) => row.map((v) => v - 128)) as number[][];
      const dct = dct2d8x8(f);
      dctViz[by * blocksX + bx] = Math.log1p(Math.abs(dct[0]![0]!));

      const r = processBlockDct(
        block,
        qTable,
        input.sparsity,
        input.threshold,
      );
      quantViz[by * blocksX + bx] = r.quantAbs;
      totalNz += r.nzQuant;
      for (let x = 0; x < BLOCK; x++) {
        for (let y = 0; y < BLOCK; y++) {
          outGrey[(py + y) * pw + (px + x)] = r.recon[x]![y]!;
        }
      }
    }
  }

  const [origPng, reconPng, dctVizPng, quantVizPng] = await Promise.all([
    toGreyPng(grey, pw, ph)
      .extract({ left: 0, top: 0, width: w0, height: h0 })
      .toBuffer(),
    toGreyPng(outGrey, pw, ph)
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
      return await sharp(Buffer.from(p.buffer, p.byteOffset, p.byteLength), {
        raw: { width: w, height: h, channels: 1 },
      })
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
      return await sharp(Buffer.from(p.buffer, p.byteOffset, p.byteLength), {
        raw: { width: w, height: h, channels: 1 },
      })
        .png()
        .toBuffer();
    })(),
  ]);

  const a = new Uint8ClampedArray(w0 * h0);
  const b = new Uint8ClampedArray(w0 * h0);
  for (let y = 0; y < h0; y++) {
    for (let x = 0; x < w0; x++) {
      const o = y * w0 + x;
      a[o] = grey[y * pw + x] ?? 0;
      b[o] = outGrey[y * pw + x] ?? 0;
    }
  }
  const m = mse8bit(a, b);
  const p = psnr(m);
  const origB = originalBitsGrayscale8(w0, h0);
  const estB = totalNz * 10;
  const cr = compressionRatio(origB, estB);
  const bpp = bppHeuristic(totalNz, w0, h0, 10);

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
