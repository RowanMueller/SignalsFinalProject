import { z } from "zod";

import { writeTicAsset, ticPublicUrl } from "~/server/lib/tic-assets";
import { runPipeline } from "~/server/services/tic-pipeline";
import { runPipelineRgbFft } from "~/server/services/tic-pipeline-rgb-fft";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { psnrGuide } from "~/lib/quality-guide";
import { db } from "~/server/db";

type TDb = typeof db;

const MAX_B64 = 4 * 1024 * 1024;

const runBase = {
  imageBase64: z.string().min(10),
  originalFilename: z.string().min(1).max(256),
  quality: z.number().min(1).max(100),
  sparsity: z.number().min(0.02).max(1),
  threshold: z.number().min(0).max(1000),
  maxSize: z.number().min(256).max(2048).optional().default(1024),
};

type PipelineOut = {
  width: number;
  height: number;
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

function estimatedTransformStorageBytes(
  mode: "GRAY_DCT" | "RGB_FFT",
  retained: number,
): number {
  const bitsPer = mode === "RGB_FFT" ? 20 : 10;
  return Math.max(0, Math.ceil((retained * bitsPer) / 8));
}

async function persistRun(
  prisma: TDb,
  id: string,
  out: PipelineOut,
  pipelineMode: "GRAY_DCT" | "RGB_FFT",
) {
  await writeTicAsset(id, "original.png", out.origPng);
  await writeTicAsset(id, "reconstructed.png", out.reconPng);
  await writeTicAsset(id, "dct.png", out.dctVizPng);
  await writeTicAsset(id, "quant.png", out.quantVizPng);

  const updated = await prisma.compressionRun.update({
    where: { id },
    data: {
      originalImagePath: ticPublicUrl(id, "original.png"),
      reconstructedImagePath: ticPublicUrl(id, "reconstructed.png"),
      dctPreviewPath: ticPublicUrl(id, "dct.png"),
      quantPreviewPath: ticPublicUrl(id, "quant.png"),
    },
  });

  const g = psnrGuide(out.psnr);
  return {
    id: updated.id,
    pipelineMode,
    width: out.width,
    height: out.height,
    mse: out.mse,
    psnr: out.psnr,
    qualityShort: g.short,
    qualityDetail: g.detail,
    compressionRatio: out.compressionRatio,
    retainedCoefficients: out.retainedCoefficients,
    bppEstimate: out.bppEstimate,
    quantizationLabel: out.quantizationLabel,
    originalUploadBytes: updated.originalUploadBytes,
    reconstructedPngBytes: updated.reconstructedPngBytes,
    estimatedTransformBytes: updated.estimatedTransformBytes,
    imageWidth: updated.imageWidth,
    imageHeight: updated.imageHeight,
    originalPreviewPngBytes: updated.originalPreviewPngBytes,
    originalUrl: updated.originalImagePath,
    reconstructedUrl: updated.reconstructedImagePath,
    dctVizUrl: updated.dctPreviewPath,
    quantVizUrl: updated.quantPreviewPath,
    createdAt: updated.createdAt,
  };
}

export const compressionRouter = createTRPCRouter({
  run: publicProcedure
    .input(
      z.discriminatedUnion("pipelineMode", [
        z.object({
          pipelineMode: z.literal("GRAY_DCT"),
          ...runBase,
        }),
        z.object({
          pipelineMode: z.literal("RGB_FFT"),
          ...runBase,
        }),
      ]),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.imageBase64.length > MAX_B64) {
        throw new Error("Image too large; try a smaller file or lower resolution.");
      }
      const buf = Buffer.from(
        input.imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        "base64",
      );
      if (buf.length < 10) {
        throw new Error("Invalid image data.");
      }

      const common = {
        quality: input.quality,
        sparsity: input.sparsity,
        threshold: input.threshold,
        maxSize: input.maxSize,
        imageBuffer: buf,
      };

      const uploadBytes = buf.length;

      if (input.pipelineMode === "GRAY_DCT") {
        const out = await runPipeline(common);
        const run = await ctx.db.compressionRun.create({
          data: {
            pipelineMode: "GRAY_DCT",
            originalFilename: input.originalFilename,
            transformType: "DCT",
            quality: input.quality,
            sparsity: input.sparsity,
            threshold: input.threshold,
            mse: out.mse,
            psnr: out.psnr,
            originalUploadBytes: uploadBytes,
            reconstructedPngBytes: out.reconPng.length,
            estimatedTransformBytes: estimatedTransformStorageBytes(
              "GRAY_DCT",
              out.retainedCoefficients,
            ),
            imageWidth: out.width,
            imageHeight: out.height,
            originalPreviewPngBytes: out.origPng.length,
            compressionRatio: out.compressionRatio,
            retainedCoefficients: out.retainedCoefficients,
            bppEstimate: out.bppEstimate,
            quantizationLabel: out.quantizationLabel,
          },
        });
        return persistRun(ctx.db, run.id, out, "GRAY_DCT");
      }

      const out = await runPipelineRgbFft(common);
      const run = await ctx.db.compressionRun.create({
        data: {
          pipelineMode: "RGB_FFT",
          originalFilename: input.originalFilename,
          transformType: "Fourier",
          quality: input.quality,
          sparsity: input.sparsity,
          threshold: input.threshold,
          mse: out.mse,
          psnr: out.psnr,
          originalUploadBytes: uploadBytes,
          reconstructedPngBytes: out.reconPng.length,
          estimatedTransformBytes: estimatedTransformStorageBytes(
            "RGB_FFT",
            out.retainedCoefficients,
          ),
          imageWidth: out.width,
          imageHeight: out.height,
          originalPreviewPngBytes: out.origPng.length,
          compressionRatio: out.compressionRatio,
          retainedCoefficients: out.retainedCoefficients,
          bppEstimate: out.bppEstimate,
          quantizationLabel: out.quantizationLabel,
        },
      });
      return persistRun(ctx.db, run.id, out, "RGB_FFT");
    }),

  getResult: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.compressionRun.findUnique({
        where: { id: input.id },
      });
    }),

  listResults: publicProcedure
    .input(
      z.object({ take: z.number().min(1).max(100).default(20) }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.compressionRun.findMany({
        orderBy: { createdAt: "desc" },
        take: input.take,
      });
    }),
});
