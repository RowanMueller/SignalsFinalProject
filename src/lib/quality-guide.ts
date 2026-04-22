/**
 * Rule-of-thumb PSNR bands for tuning (not a guarantee for every image).
 * Use with MSE and visual inspection.
 */
export function psnrGuide(psnr: number): {
  short: string;
  detail: string;
} {
  if (psnr >= 40) {
    return {
      short: "Very high fidelity",
      detail:
        "Often effectively lossless visually. Good region to search for strong transform-domain compression without obvious damage.",
    };
  }
  if (psnr >= 35) {
    return {
      short: "High fidelity",
      detail:
        "Small errors; usually hard to notice at normal viewing. Nudge quality/sparsity up if you still see artifacts.",
    };
  }
  if (psnr >= 30) {
    return {
      short: "Noticeable loss possible",
      detail:
        "Softening or blocking may appear. For minimal loss, raise JPEG quality or coefficient retention.",
    };
  }
  return {
    short: "Strong degradation",
    detail:
      "Clearly visible difference from the original. This run trades quality for size.",
  };
}
