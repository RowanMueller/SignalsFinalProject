/**
 * Separable 2D complex DFT/IDFT (8×8) for real-valued blocks.
 * Forward: 1D DFT on each row, then each column. Inverse: inverse on columns, then rows.
 * Each 1D uses direct O(8²) with exp(-2πi kn/8) / IFFT (1/8) scaling.
 */

export type C = { re: number; im: number };

const TAU = 2 * Math.PI;
const N = 8;

function cadd(a: C, b: C): C {
  return { re: a.re + b.re, im: a.im + b.im };
}

function cmul(a: C, b: C): C {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function cscale(a: C, s: number): C {
  return { re: a.re * s, im: a.im * s };
}

/** 1D DFT, length 8, forward (sign negative in exp). */
export function dft1d8(x: C[]): C[] {
  const X: C[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }));
  for (let k = 0; k < N; k++) {
    let sum: C = { re: 0, im: 0 };
    for (let n = 0; n < N; n++) {
      const th = (-TAU * k * n) / N;
      const w: C = { re: Math.cos(th), im: Math.sin(th) };
      sum = cadd(sum, cmul(x[n]!, w));
    }
    X[k] = sum;
  }
  return X;
}

/** 1D IDFT, length 8: x[n] = (1/8) Σ_k X[k] e^{+2πi kn/8} */
export function idft1d8(X: C[]): C[] {
  const x: C[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }));
  for (let n = 0; n < N; n++) {
    let sum: C = { re: 0, im: 0 };
    for (let k = 0; k < N; k++) {
      const th = (TAU * k * n) / N;
      const w: C = { re: Math.cos(th), im: Math.sin(th) };
      sum = cadd(sum, cmul(X[k]!, w));
    }
    x[n] = cscale(sum, 1 / N);
  }
  return x;
}

function empty8x8C(): C[][] {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => ({ re: 0, im: 0 })),
  );
}

/**
 * 2D DFT of real input (imaginary part of f ignored; pass real values in .re).
 */
export function fft2d8x8Real(f: number[][]): C[][] {
  const row: C[][] = [];
  for (let i = 0; i < N; i++) {
    const r: C[] = [];
    for (let j = 0; j < N; j++) {
      r.push({ re: f[i]![j]!, im: 0 });
    }
    row.push(dft1d8(r));
  }
  const F = empty8x8C();
  for (let j = 0; j < N; j++) {
    const col: C[] = [];
    for (let i = 0; i < N; i++) {
      col.push(row[i]![j]!);
    }
    const outc = dft1d8(col);
    for (let i = 0; i < N; i++) {
      F[i]![j] = outc[i]!;
    }
  }
  return F;
}

/** 2D IDFT, returns real part only (should be ≈ the spatial block, imaginary ≈ 0). */
export function ifft2d8x8ToReal(F: C[][]): number[][] {
  const colIf: C[][] = empty8x8C();
  for (let j = 0; j < N; j++) {
    const col: C[] = [];
    for (let i = 0; i < N; i++) {
      col.push({ ...F[i]![j]! });
    }
    const o = idft1d8(col);
    for (let i = 0; i < N; i++) {
      colIf[i]![j] = o[i]!;
    }
  }
  const f: C[][] = [];
  for (let i = 0; i < N; i++) {
    f.push(idft1d8(colIf[i]!));
  }
  return f.map((row) => row.map((c) => c.re));
}

export function cmag2(z: C): number {
  return z.re * z.re + z.im * z.im;
}

export const FFT_BLOCK = N;
export const FFT_BINS = 64;
