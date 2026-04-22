-- CreateTable
CREATE TABLE "CompressionRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originalFilename" TEXT NOT NULL,
    "transformType" TEXT NOT NULL,
    "quality" INTEGER NOT NULL,
    "sparsity" REAL NOT NULL,
    "threshold" REAL NOT NULL DEFAULT 0,
    "mse" REAL NOT NULL,
    "psnr" REAL NOT NULL,
    "compressionRatio" REAL NOT NULL,
    "retainedCoefficients" INTEGER NOT NULL,
    "bppEstimate" REAL NOT NULL,
    "quantizationLabel" TEXT NOT NULL,
    "originalImagePath" TEXT NOT NULL DEFAULT 'pending',
    "reconstructedImagePath" TEXT NOT NULL DEFAULT 'pending',
    "dctPreviewPath" TEXT,
    "quantPreviewPath" TEXT
);
