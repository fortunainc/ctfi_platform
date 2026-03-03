-- CreateTable
CREATE TABLE "ClinicalTrial" (
    "id" TEXT NOT NULL,
    "nctId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "phase" TEXT[],
    "conditions" TEXT[],
    "interventions" TEXT[],
    "sponsor" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "enrollmentCount" INTEGER,
    "enrollmentType" TEXT,
    "studyType" TEXT NOT NULL,
    "hasResults" BOOLEAN NOT NULL DEFAULT false,
    "predictedEnrollment" INTEGER NOT NULL,
    "predictedDuration" INTEGER NOT NULL,
    "predictedSuccess" DOUBLE PRECISION NOT NULL,
    "actualDuration" INTEGER,
    "enrollmentError" DOUBLE PRECISION,
    "durationError" DOUBLE PRECISION,
    "costImpact" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicalTrial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalTrial_nctId_key" ON "ClinicalTrial"("nctId");

-- CreateIndex
CREATE INDEX "ClinicalTrial_nctId_idx" ON "ClinicalTrial"("nctId");

-- CreateIndex
CREATE INDEX "ClinicalTrial_status_idx" ON "ClinicalTrial"("status");

-- CreateIndex
CREATE INDEX "ClinicalTrial_phase_idx" ON "ClinicalTrial"("phase");
