-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OPERATOR', 'ADMIN', 'SPONSOR');

-- CreateEnum
CREATE TYPE "ReputationTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "ContributionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "PatternType" AS ENUM ('ENROLLMENT', 'PROTOCOL', 'SITE', 'DATA', 'REGULATORY', 'THERAPEUTIC', 'SUCCESS');

-- CreateEnum
CREATE TYPE "ModerationActionType" AS ENUM ('APPROVE', 'REJECT', 'FLAG', 'UNFLAG');

-- CreateEnum
CREATE TYPE "CreditTransactionType" AS ENUM ('SUBMISSION_STAKE', 'APPROVAL_REWARD', 'REJECTION_PENALTY', 'MARKETPLACE_REDEEM', 'TRAINING_REDEEM', 'ADMIN_ADJUSTMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OPERATOR',
    "therapeuticAreas" TEXT[],
    "yearsExperience" INTEGER,
    "currentPosition" TEXT,
    "certifications" TEXT[],
    "credits" INTEGER NOT NULL DEFAULT 0,
    "reputationScore" INTEGER NOT NULL DEFAULT 0,
    "reputationTier" "ReputationTier" NOT NULL DEFAULT 'BRONZE',
    "contributionsCount" INTEGER NOT NULL DEFAULT 0,
    "approvedCount" INTEGER NOT NULL DEFAULT 0,
    "rejectedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntelligenceChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "contextPrompt" TEXT NOT NULL,
    "failurePrompt" TEXT NOT NULL,
    "whyPrompt" TEXT NOT NULL,
    "changePrompt" TEXT NOT NULL,
    "contextLimit" INTEGER NOT NULL DEFAULT 100,
    "failureLimit" INTEGER NOT NULL DEFAULT 200,
    "whyLimit" INTEGER NOT NULL DEFAULT 200,
    "changeLimit" INTEGER NOT NULL DEFAULT 200,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntelligenceChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntelligenceContribution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "whatFailed" TEXT NOT NULL,
    "whyFailed" TEXT NOT NULL,
    "whatToChange" TEXT NOT NULL,
    "trialPhase" TEXT,
    "therapeuticArea" TEXT,
    "sponsorType" TEXT,
    "status" "ContributionStatus" NOT NULL DEFAULT 'PENDING',
    "moderatedAt" TIMESTAMP(3),
    "moderatedBy" TEXT,
    "rejectionReason" TEXT,
    "creditsAwarded" INTEGER NOT NULL DEFAULT 0,
    "creditsPenalty" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntelligenceContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PatternType" NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatternCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternTag" (
    "id" TEXT NOT NULL,
    "contributionId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "taggedBy" TEXT NOT NULL,
    "taggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confidence" INTEGER NOT NULL DEFAULT 100,
    "notes" TEXT,

    CONSTRAINT "PatternTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModerationAction" (
    "id" TEXT NOT NULL,
    "contributionId" TEXT NOT NULL,
    "moderatorId" TEXT NOT NULL,
    "action" "ModerationActionType" NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "relevanceScore" INTEGER,
    "specificityScore" INTEGER,
    "actionabilityScore" INTEGER,
    "noveltyScore" INTEGER,
    "evidenceScore" INTEGER,
    "totalScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModerationAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CreditTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "contributionId" TEXT,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "postCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_reputationTier_idx" ON "User"("reputationTier");

-- CreateIndex
CREATE UNIQUE INDEX "IntelligenceChannel_name_key" ON "IntelligenceChannel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IntelligenceChannel_slug_key" ON "IntelligenceChannel"("slug");

-- CreateIndex
CREATE INDEX "IntelligenceChannel_slug_idx" ON "IntelligenceChannel"("slug");

-- CreateIndex
CREATE INDEX "IntelligenceChannel_isActive_idx" ON "IntelligenceChannel"("isActive");

-- CreateIndex
CREATE INDEX "IntelligenceContribution_userId_idx" ON "IntelligenceContribution"("userId");

-- CreateIndex
CREATE INDEX "IntelligenceContribution_channelId_idx" ON "IntelligenceContribution"("channelId");

-- CreateIndex
CREATE INDEX "IntelligenceContribution_status_idx" ON "IntelligenceContribution"("status");

-- CreateIndex
CREATE INDEX "IntelligenceContribution_createdAt_idx" ON "IntelligenceContribution"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PatternCategory_name_key" ON "PatternCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PatternCategory_slug_key" ON "PatternCategory"("slug");

-- CreateIndex
CREATE INDEX "PatternCategory_type_idx" ON "PatternCategory"("type");

-- CreateIndex
CREATE INDEX "PatternCategory_isActive_idx" ON "PatternCategory"("isActive");

-- CreateIndex
CREATE INDEX "PatternTag_contributionId_idx" ON "PatternTag"("contributionId");

-- CreateIndex
CREATE INDEX "PatternTag_categoryId_idx" ON "PatternTag"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "PatternTag_contributionId_categoryId_key" ON "PatternTag"("contributionId", "categoryId");

-- CreateIndex
CREATE INDEX "ModerationAction_contributionId_idx" ON "ModerationAction"("contributionId");

-- CreateIndex
CREATE INDEX "ModerationAction_moderatorId_idx" ON "ModerationAction"("moderatorId");

-- CreateIndex
CREATE INDEX "ModerationAction_createdAt_idx" ON "ModerationAction"("createdAt");

-- CreateIndex
CREATE INDEX "CreditTransaction_userId_idx" ON "CreditTransaction"("userId");

-- CreateIndex
CREATE INDEX "CreditTransaction_createdAt_idx" ON "CreditTransaction"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ForumCategory_name_key" ON "ForumCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ForumCategory_slug_key" ON "ForumCategory"("slug");

-- CreateIndex
CREATE INDEX "ForumCategory_slug_idx" ON "ForumCategory"("slug");

-- CreateIndex
CREATE INDEX "ForumCategory_isActive_idx" ON "ForumCategory"("isActive");

-- CreateIndex
CREATE INDEX "ForumPost_userId_idx" ON "ForumPost"("userId");

-- CreateIndex
CREATE INDEX "ForumPost_categoryId_idx" ON "ForumPost"("categoryId");

-- CreateIndex
CREATE INDEX "ForumPost_createdAt_idx" ON "ForumPost"("createdAt");

-- CreateIndex
CREATE INDEX "ForumComment_userId_idx" ON "ForumComment"("userId");

-- CreateIndex
CREATE INDEX "ForumComment_postId_idx" ON "ForumComment"("postId");

-- CreateIndex
CREATE INDEX "ForumComment_createdAt_idx" ON "ForumComment"("createdAt");

-- AddForeignKey
ALTER TABLE "IntelligenceContribution" ADD CONSTRAINT "IntelligenceContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntelligenceContribution" ADD CONSTRAINT "IntelligenceContribution_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "IntelligenceChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntelligenceContribution" ADD CONSTRAINT "IntelligenceContribution_moderatedBy_fkey" FOREIGN KEY ("moderatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternTag" ADD CONSTRAINT "PatternTag_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "IntelligenceContribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternTag" ADD CONSTRAINT "PatternTag_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PatternCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationAction" ADD CONSTRAINT "ModerationAction_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "IntelligenceContribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationAction" ADD CONSTRAINT "ModerationAction_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ForumCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
