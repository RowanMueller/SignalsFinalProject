"use client";

import { useState } from "react";

import { uncompressedRawBytes } from "~/lib/image-size-helpers";
import { api } from "~/trpc/react";

function formatBytes(n: number): string {
  if (n <= 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const presets = {
  high: { quality: 90, sparsity: 0.85, threshold: 0 },
  medium: { quality: 60, sparsity: 0.5, threshold: 0 },
  aggressive: { quality: 35, sparsity: 0.25, threshold: 2 },
} as const;

type Mode = "GRAY_DCT" | "RGB_FFT";

export function TicCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [b64, setB64] = useState<string | null>(null);
  const [quality, setQuality] = useState(60);
  const [sparsity, setSparsity] = useState(0.5);
  const [threshold, setThreshold] = useState(0);
  const [maxSize, setMaxSize] = useState(1024);
  const [workspace, setWorkspace] = useState<Mode>("GRAY_DCT");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: history, refetch } = api.compression.listResults.useQuery({
    take: 15,
  });

  const { data: loadedRun, isLoading: loadingRun } =
    api.compression.getResult.useQuery(
      { id: selectedId! },
      { enabled: selectedId != null && selectedId.length > 0 },
    );

  const run = api.compression.run.useMutation({
    onSuccess: (r) => {
      setSelectedId(r.id);
      void refetch();
    },
  });

  const onFile = (f: File | null) => {
    setFile(f);
    setB64(null);
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const t = r.result;
      if (typeof t === "string") setB64(t);
    };
    r.readAsDataURL(f);
  };

  const applyPreset = (k: keyof typeof presets) => {
    const p = presets[k];
    setQuality(p.quality);
    setSparsity(p.sparsity);
    setThreshold(p.threshold);
  };

  const display = loadedRun
    ? {
        id: loadedRun.id,
        pipelineMode: loadedRun.pipelineMode,
        mse: loadedRun.mse,
        psnr: loadedRun.psnr,
        originalUploadBytes: loadedRun.originalUploadBytes,
        reconstructedPngBytes: loadedRun.reconstructedPngBytes,
        estimatedTransformBytes: loadedRun.estimatedTransformBytes,
        imageWidth: loadedRun.imageWidth,
        imageHeight: loadedRun.imageHeight,
        originalPreviewPngBytes: loadedRun.originalPreviewPngBytes,
        compressionRatio: loadedRun.compressionRatio,
        retainedCoefficients: loadedRun.retainedCoefficients,
        bppEstimate: loadedRun.bppEstimate,
        quantizationLabel: loadedRun.quantizationLabel,
        originalUrl: loadedRun.originalImagePath,
        reconstructedUrl: loadedRun.reconstructedImagePath,
        dctVizUrl: loadedRun.dctPreviewPath,
        quantVizUrl: loadedRun.quantPreviewPath,
        createdAt: loadedRun.createdAt,
      }
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-semibold text-zinc-100">TIC</h1>
        <div className="flex gap-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={workspace === "GRAY_DCT"}
            className={`rounded px-3 py-1.5 text-sm ${
              workspace === "GRAY_DCT"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            onClick={() => setWorkspace("GRAY_DCT")}
          >
            Grayscale
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={workspace === "RGB_FFT"}
            className={`rounded px-3 py-1.5 text-sm ${
              workspace === "RGB_FFT"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            onClick={() => setWorkspace("RGB_FFT")}
          >
            RGB
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,280px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <input
              type="file"
              accept="image/*"
              className="min-w-0 flex-1 text-sm text-zinc-300 file:mr-2 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-zinc-200"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["high", "High"],
                  ["medium", "Med"],
                  ["aggressive", "Low"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-800"
                  onClick={() => applyPreset(k)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {file && (
            <p className="text-xs text-zinc-500">
              {file.name} · {formatBytes(file.size)}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-zinc-400">
              Quality
              <input
                type="range"
                min={1}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="accent-emerald-500"
              />
              <span className="text-xs text-zinc-600">{quality}</span>
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-400">
              Retention
              <input
                type="range"
                min={0.02}
                max={1}
                step={0.01}
                value={sparsity}
                onChange={(e) => setSparsity(Number(e.target.value))}
                className="accent-emerald-500"
              />
              <span className="text-xs text-zinc-600">
                {(sparsity * 100).toFixed(0)}%
              </span>
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-400">
              Threshold
              <input
                type="number"
                min={0}
                max={2000}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-400">
              Max edge
              <input
                type="range"
                min={256}
                max={2048}
                step={64}
                value={maxSize}
                onChange={(e) => setMaxSize(Number(e.target.value))}
                className="accent-emerald-500"
              />
              <span className="text-xs text-zinc-600">{maxSize}px</span>
            </label>
          </div>

          <button
            type="button"
            disabled={!b64 || run.isPending}
            className="w-full max-w-xs rounded bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (!b64 || !file) return;
              void run.mutateAsync({
                imageBase64: b64,
                originalFilename: file.name,
                quality,
                sparsity,
                threshold,
                maxSize,
                pipelineMode: workspace,
              });
            }}
          >
            {run.isPending ? "…" : "Run"}
          </button>
          {run.error && (
            <p className="text-sm text-red-400">{run.error.message}</p>
          )}

          {selectedId && (loadingRun || display) && (
            <div className="space-y-4 border-t border-zinc-800 pt-6">
              {loadingRun && !display && (
                <p className="text-sm text-zinc-500">…</p>
              )}
              {display &&
                display.originalUrl &&
                display.reconstructedUrl &&
                display.originalUrl !== "pending" && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs text-zinc-600">In</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={display.originalUrl}
                        alt=""
                        className="w-full rounded border border-zinc-800"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-zinc-600">Out</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={display.reconstructedUrl}
                        alt=""
                        className="w-full rounded border border-zinc-800"
                      />
                    </div>
                    {display.dctVizUrl && display.quantVizUrl && (
                      <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={display.dctVizUrl}
                          alt=""
                          className="w-full rounded border border-zinc-800"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={display.quantVizUrl}
                          alt=""
                          className="w-full rounded border border-zinc-800"
                        />
                      </div>
                    )}
                  </div>

                  {(() => {
                    const up = display.originalUploadBytes;
                    const est = display.estimatedTransformBytes;
                    const reconPng = display.reconstructedPngBytes;
                    const w = display.imageWidth;
                    const h = display.imageHeight;
                    const raw = uncompressedRawBytes(
                      w,
                      h,
                      display.pipelineMode as "GRAY_DCT" | "RGB_FFT",
                    );
                    const prevOrig = display.originalPreviewPngBytes;
                    return (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                          {[
                            ["Upload", formatBytes(up)],
                            ["Raw", w > 0 ? formatBytes(raw) : "—"],
                            ["Transform (est.)", formatBytes(est)],
                            ["Preview PNG", prevOrig > 0 ? formatBytes(prevOrig) : "—"],
                            ["Out PNG", reconPng > 0 ? formatBytes(reconPng) : "—"],
                            [
                              "PSNR / MSE",
                              `${display.psnr.toFixed(1)} dB / ${display.mse.toFixed(3)}`,
                            ],
                          ].map(([k, v]) => (
                            <div
                              key={k}
                              className="rounded border border-zinc-800 bg-zinc-900/40 px-2 py-2"
                            >
                              <p className="text-[10px] uppercase text-zinc-600">
                                {k}
                              </p>
                              <p className="mt-0.5 truncate text-sm text-zinc-200">
                                {v}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-zinc-600">
                          {display.quantizationLabel} · ratio {display.compressionRatio.toFixed(1)} ·
                          {display.retainedCoefficients} coeff. · {display.bppEstimate.toFixed(2)}{" "}
                          bpp
                        </p>
                        <a
                          href={display.reconstructedUrl}
                          download
                          className="text-sm text-emerald-500 hover:text-emerald-400"
                        >
                          Download
                        </a>
                      </div>
                    );
                  })()}
                </>
              )}
              {display && display.originalUrl === "pending" && (
                <p className="text-sm text-zinc-500">…</p>
              )}
            </div>
          )}
        </div>

        <aside className="lg:border-l lg:border-zinc-800 lg:pl-6">
          <h2 className="mb-2 text-xs font-medium uppercase text-zinc-600">
            History
          </h2>
          <ul className="max-h-[60vh] space-y-1.5 overflow-y-auto text-sm">
            {history?.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  className={`w-full rounded border px-2 py-1.5 text-left text-zinc-400 hover:bg-zinc-900 ${
                    selectedId === h.id
                      ? "border-zinc-600 bg-zinc-900"
                      : "border-zinc-800"
                  }`}
                  onClick={() => setSelectedId(h.id)}
                >
                  <div className="truncate text-zinc-200">{h.originalFilename}</div>
                  <div className="text-xs text-zinc-600">
                    {h.pipelineMode === "RGB_FFT" ? "RGB" : "Gray"} ·{" "}
                    {h.psnr.toFixed(0)} dB
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
