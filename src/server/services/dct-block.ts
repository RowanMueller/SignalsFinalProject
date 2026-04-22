/**
 * 8×8 DCT-II (JPEG-style): level-shift by −128 before forward, +128 after inverse.
 * Forward:  F = ¼·B·f·Bᵀ   —  Inverse:  f = ¼·Bᵀ·F·B
 * B[u][x] = C(u)·cos((2x+1)uπ/16),  C(0)=1/√2,  C(k)=1.
 */

const N = 8;

function cRow(u: number): number {
  return u === 0 ? 1 / Math.SQRT2 : 1;
}

function buildB(): number[][] {
  const B: number[][] = Array.from({ length: N }, () =>
    Array<number>(N).fill(0),
  );
  for (let u = 0; u < N; u++) {
    for (let x = 0; x < N; x++) {
      B[u]![x] = cRow(u) * Math.cos(((2 * x + 1) * u * Math.PI) / 16);
    }
  }
  return B;
}

const B = buildB();

function transpose8(M: number[][]): number[][] {
  const T: number[][] = Array.from({ length: N }, () =>
    Array<number>(N).fill(0),
  );
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      T[i]![j] = M[j]![i]!;
    }
  }
  return T;
}

function mul8(A: number[][], C: number[][]): number[][] {
  const R: number[][] = Array.from({ length: N }, () =>
    Array<number>(N).fill(0),
  );
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let s = 0;
      for (let k = 0; k < N; k++) {
        s += A[i]![k]! * C[k]![j]!;
      }
      R[i]![j] = s;
    }
  }
  return R;
}

const BT = transpose8(B);

/** 2D DCT, f in spatial (after −128), output DCT domain. */
export function dct2d8x8(f: number[][]): number[][] {
  const t = mul8(B, f);
  const t2 = mul8(t, BT);
  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      t2[u]![v]! *= 0.25;
    }
  }
  return t2;
}

/** 2D inverse DCT, F in DCT domain, returns spatial (before +128). */
export function idct2d8x8(F: number[][]): number[][] {
  const t = mul8(BT, F);
  const t2 = mul8(t, B);
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      t2[x]![y]! *= 0.25;
    }
  }
  return t2;
}
