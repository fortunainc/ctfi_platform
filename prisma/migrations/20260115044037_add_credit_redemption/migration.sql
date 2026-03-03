-- CreateEnum
CREATE TYPE "RedemptionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED');

-- CreateTable
CREATE TABLE "CreditRedemption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "status" "RedemptionStatus" NOT NULL DEFAULT 'PENDING',
    "userNotes" TEXT,
    "adminNotes" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CreditRedemption_userId_idx" ON "CreditRedemption"("userId");

-- CreateIndex
CREATE INDEX "CreditRedemption_status_idx" ON "CreditRedemption"("status");

-- CreateIndex
CREATE INDEX "CreditRedemption_createdAt_idx" ON "CreditRedemption"("createdAt");

-- AddForeignKey
ALTER TABLE "CreditRedemption" ADD CONSTRAINT "CreditRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
