-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompressionRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipelineMode" TEXT NOT NULL DEFAULT 'GRAY_DCT',
    "originalFilename" TEXT NOT NULL,
    "transformType" TEXT NOT NULL,
    "quality" INTEGER NOT NULL,
    "sparsity" REAL NOT NULL,
    "threshold" REAL NOT NULL DEFAULT 0,
    "mse" REAL NOT NULL,
    "psnr" REAL NOT NULL,
    "originalUploadBytes" INTEGER NOT NULL DEFAULT 0,
    "reconstructedPngBytes" INTEGER NOT NULL DEFAULT 0,
    "estimatedTransformBytes" INTEGER NOT NULL DEFAULT 0,
    "imageWidth" INTEGER NOT NULL DEFAULT 0,
    "imageHeight" INTEGER NOT NULL DEFAULT 0,
    "originalPreviewPngBytes" INTEGER NOT NULL DEFAULT 0,
    "compressionRatio" REAL NOT NULL,
    "retainedCoefficients" INTEGER NOT NULL,
    "bppEstimate" REAL NOT NULL,
    "quantizationLabel" TEXT NOT NULL,
    "originalImagePath" TEXT NOT NULL DEFAULT 'pending',
    "reconstructedImagePath" TEXT NOT NULL DEFAULT 'pending',
    "dctPreviewPath" TEXT,
    "quantPreviewPath" TEXT
);
INSERT INTO "new_CompressionRun" ("bppEstimate", "compressionRatio", "createdAt", "dctPreviewPath", "estimatedTransformBytes", "id", "mse", "originalFilename", "originalImagePath", "originalUploadBytes", "pipelineMode", "psnr", "quality", "quantPreviewPath", "quantizationLabel", "reconstructedImagePath", "reconstructedPngBytes", "retainedCoefficients", "sparsity", "threshold", "transformType") SELECT "bppEstimate", "compressionRatio", "createdAt", "dctPreviewPath", "estimatedTransformBytes", "id", "mse", "originalFilename", "originalImagePath", "originalUploadBytes", "pipelineMode", "psnr", "quality", "quantPreviewPath", "quantizationLabel", "reconstructedImagePath", "reconstructedPngBytes", "retainedCoefficients", "sparsity", "threshold", "transformType" FROM "CompressionRun";
DROP TABLE "CompressionRun";
ALTER TABLE "new_CompressionRun" RENAME TO "CompressionRun";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
