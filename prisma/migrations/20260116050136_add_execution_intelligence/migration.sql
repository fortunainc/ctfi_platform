-- CreateTable
CREATE TABLE "trial_real_time_status" (
    "id" TEXT NOT NULL,
    "trialId" TEXT NOT NULL,
    "enrollmentRate" DOUBLE PRECISION NOT NULL,
    "sitePerformanceScore" DOUBLE PRECISION NOT NULL,
    "dataQualityScore" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trial_real_time_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_performance" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "trialId" TEXT NOT NULL,
    "patientCount" INTEGER NOT NULL,
    "enrollmentVelocity" DOUBLE PRECISION NOT NULL,
    "protocolCompliance" DOUBLE PRECISION NOT NULL,
    "staffWorkload" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operational_alerts" (
    "id" TEXT NOT NULL,
    "trialId" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operational_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historical_metrics" (
    "id" TEXT NOT NULL,
    "trialId" TEXT NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historical_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trial_real_time_status_trialId_key" ON "trial_real_time_status"("trialId");

-- CreateIndex
CREATE INDEX "trial_real_time_status_trialId_idx" ON "trial_real_time_status"("trialId");

-- CreateIndex
CREATE INDEX "site_performance_trialId_idx" ON "site_performance"("trialId");

-- CreateIndex
CREATE UNIQUE INDEX "site_performance_siteId_trialId_key" ON "site_performance"("siteId", "trialId");

-- CreateIndex
CREATE INDEX "operational_alerts_trialId_idx" ON "operational_alerts"("trialId");

-- CreateIndex
CREATE INDEX "operational_alerts_severity_idx" ON "operational_alerts"("severity");

-- CreateIndex
CREATE INDEX "operational_alerts_isResolved_idx" ON "operational_alerts"("isResolved");

-- CreateIndex
CREATE INDEX "historical_metrics_trialId_timestamp_idx" ON "historical_metrics"("trialId", "timestamp");

-- AddForeignKey
ALTER TABLE "trial_real_time_status" ADD CONSTRAINT "trial_real_time_status_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "ClinicalTrial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_performance" ADD CONSTRAINT "site_performance_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "trial_real_time_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_alerts" ADD CONSTRAINT "operational_alerts_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "trial_real_time_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historical_metrics" ADD CONSTRAINT "historical_metrics_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "trial_real_time_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
