import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { randomBytes } from 'crypto'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:Zihua..27@db.stqqczcsdyholkfocmdh.supabase.co:5432/postgres?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting BehindTheProtocol seed data...')

  try {
    // Create Trial Type Rooms
    const trialTypeRooms = await Promise.all([
      prisma.trialTypeRoom.create({
        data: {
          name: 'Oncology Trials',
          description: 'Discussions about oncology clinical trials',
          slug: 'oncology-trials',
        },
      }),
      prisma.trialTypeRoom.create({
        data: {
          name: 'Rare Disease Trials',
          description: 'Discussions about rare disease clinical trials',
          slug: 'rare-disease-trials',
        },
      }),
      prisma.trialTypeRoom.create({
        data: {
          name: 'Device Trials',
          description: 'Discussions about medical device clinical trials',
          slug: 'device-trials',
        },
      }),
      prisma.trialTypeRoom.create({
        data: {
          name: 'Early Phase Trials',
          description: 'Discussions about Phase 1 and Phase 2 trials',
          slug: 'early-phase-trials',
        },
      }),
      prisma.trialTypeRoom.create({
        data: {
          name: 'Academic Trials',
          description: 'Discussions about academic institution trials',
          slug: 'academic-trials',
        },
      }),
    ])

    console.log('✅ Created 5 Trial Type Rooms')

    // Create Sample Users
    const generateHandle = (role: string) => {
      const id = randomBytes(2).readUInt16BE(0)
      return `${role}_${id}`
    }

    const users = await Promise.all([
      prisma.user.create({
        data: {
          clerkId: 'user_1',
          handle: generateHandle('Operator'),
          reputationScore: 150,
          reputationTier: 'Experienced Operator',
        },
      }),
      prisma.user.create({
        data: {
          clerkId: 'user_2',
          handle: generateHandle('CRA'),
          reputationScore: 450,
          reputationTier: 'Field Expert',
        },
      }),
      prisma.user.create({
        data: {
          clerkId: 'user_3',
          handle: generateHandle('SiteLead'),
          reputationScore: 50,
          reputationTier: 'Operator',
        },
      }),
    ])

    console.log('✅ Created 3 sample users')

    // Create Sample Threads
    const threads = await Promise.all([
      prisma.thread.create({
        data: {
          userId: users[0].id,
          title: 'Enrollment 70% below forecast - Sponsor insisting projections were correct',
          trialPhase: 'Phase 3',
          therapeuticArea: 'Oncology',
          siteCountRange: '51-100',
          issueCategory: 'Enrollment problems',
          description: 'We are screening but failing eligibility. Sites are reporting high screen failure rates. Sponsor insists their feasibility projections were accurate and we should be hitting targets. Has anyone dealt with this disconnect between feasibility expectations and reality?',
          urgencyLevel: 'Urgent',
        },
      }),
      prisma.thread.create({
        data: {
          userId: users[1].id,
          title: 'Sponsor added 4 additional procedures without increasing budget',
          trialPhase: 'Phase 2',
          therapeuticArea: 'Rare Disease',
          siteCountRange: '1-10',
          issueCategory: 'Budget issues',
          description: 'Protocol amendment was just released adding 4 additional procedures per visit. No additional budget provided. Sites are already overburdened. Is this happening elsewhere?',
          urgencyLevel: 'Critical',
        },
      }),
      prisma.thread.create({
        data: {
          userId: users[2].id,
          title: 'CRO communication breakdown - Protocol interpretation varies across sites',
          trialPhase: 'Phase 3',
          therapeuticArea: 'Oncology',
          siteCountRange: '11-50',
          issueCategory: 'CRO communication',
          description: 'Different CRA interpretations of protocol requirements. Some sites being asked for documentation others are not. Creating inconsistency and frustration.',
          urgencyLevel: 'Needs Advice',
        },
      }),
    ])

    console.log('✅ Created 3 sample threads')

    // Create Sample Replies
    const replies = await Promise.all([
      prisma.reply.create({
        data: {
          threadId: threads[0].id,
          userId: users[1].id,
          content: 'This is unfortunately common in oncology Phase 3. Feasibility studies often assume optimal screening ratios that don\'t account for real-world patient populations. I\'ve seen this resolved by: 1) Doing a retrospective screen failure analysis 2) Re-negotiating enrollment targets based on actual site performance data 3) Adding site-level enrichment strategies.',
          helpfulVotes: 12,
        },
      }),
      prisma.reply.create({
        data: {
          threadId: threads[1].id,
          userId: users[0].id,
          content: 'Happened to us last year. We pushed back hard on the budget increase - documented the additional time required for each procedure, got site PIs to sign off on the burden, and presented the data to sponsor. They eventually adjusted the budget. Key is getting site leadership aligned.',
          helpfulVotes: 8,
        },
      }),
      prisma.reply.create({
        data: {
          threadId: threads[0].id,
          userId: users[2].id,
          content: 'I would request a feasibility reassessment. The original projections were likely based on optimistic assumptions that don\'t match your actual patient population.',
          helpfulVotes: 3,
        },
      }),
    ])

    console.log('✅ Created 3 sample replies')

    // Mark one reply as most helpful
    await prisma.reply.update({
      where: { id: replies[0].id },
      data: { isMostHelpful: true },
    })

    // Create Sample Polls
    const now = new Date()
    const poll1Expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours
    const poll2Expiry = new Date(now.getTime() + 48 * 60 * 60 * 1000) // 48 hours

    await Promise.all([
      prisma.poll.create({
        data: {
          question: 'Sponsor added 4 additional procedures without increasing budget. Is this happening at your site?',
          trialPhase: 'Phase 2',
          therapeuticArea: 'Rare Disease',
          options: ['Yes', 'Similar but less severe', 'No'],
          duration: 24,
          expiresAt: poll1Expiry,
        },
      }),
      prisma.poll.create({
        data: {
          question: 'Have you experienced unexpected protocol amendment cascades in the past 6 months?',
          trialPhase: 'Phase 3',
          therapeuticArea: 'Oncology',
          options: ['Yes, multiple', 'Yes, one', 'No'],
          duration: 48,
          expiresAt: poll2Expiry,
        },
      }),
    ])

    console.log('✅ Created 2 sample polls')

    // Create Sample Case Drops
    await Promise.all([
      prisma.caseDrop.create({
        data: {
          caseNumber: 1,
          title: 'Protocol Amendment Disaster',
          content: 'Phase 2 rare disease trial. Protocol amendment added 3 additional MRIs per patient. Sites warned it would reduce enrollment. Sponsor proceeded anyway. Enrollment dropped 47% in 3 months. Trial eventually terminated due to inability to meet enrollment targets.',
          trialPhase: 'Phase 2',
          outcome: 'Trial terminated due to enrollment failure',
        },
      }),
      prisma.caseDrop.create({
        data: {
          caseNumber: 2,
          title: 'Budget Starvation Crisis',
          content: 'Phase 3 oncology trial with 85 sites. Initial budget projected for 12-month enrollment. Trial extended to 24 months due to enrollment challenges. Sponsor refused to increase budget beyond original projection. Sites began withdrawing from study. Critical data collection points missed due to site turnover.',
          trialPhase: 'Phase 3',
          outcome: 'Study compromised, sites withdrew, data collection gaps',
        },
      }),
    ])

    console.log('✅ Created 2 sample case drops')

    // Create sample thread follows
    await Promise.all([
      prisma.threadFollow.create({
        data: {
          threadId: threads[0].id,
          userId: users[1].id,
        },
      }),
      prisma.threadFollow.create({
        data: {
          threadId: threads[1].id,
          userId: users[0].id,
        },
      }),
    ])

    console.log('✅ Created thread follows')

    // Add same situation counts
    await Promise.all([
      prisma.thread.update({
        where: { id: threads[0].id },
        data: { sameSituationCount: 23 },
      }),
      prisma.thread.update({
        where: { id: threads[1].id },
        data: { sameSituationCount: 47 },
      }),
    ])

    console.log('✅ Added same situation counts')

    console.log('🎉 Seed data completed successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })