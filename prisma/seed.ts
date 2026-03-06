import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.reply.deleteMany();
  await prisma.threadFollow.deleteMany();
  await prisma.patternSignal.deleteMany();
  await prisma.careerDiscussion.deleteMany();
  await prisma.trialConfession.deleteMany();
  await prisma.operatorPlaybook.deleteMany();
  await prisma.industrySignal.deleteMany();
  await prisma.caseDrop.deleteMany();
  await prisma.trialTypeRoom.deleteMany();
  await prisma.pollVote.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: 'user_1',
        handle: 'Operator_4821',
        reputationScore: 250,
        reputationTier: 'Field Expert',
        badges: ['Trial Fixer', 'Protocol Navigator'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_2',
        handle: 'CRA_3927',
        reputationScore: 120,
        reputationTier: 'Senior Operator',
        badges: ['Site Advocate'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_3',
        handle: 'CRC_7184',
        reputationScore: 45,
        reputationTier: 'Experienced Operator',
        badges: [],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_4',
        handle: 'SiteLead_9256',
        reputationScore: 520,
        reputationTier: 'Trusted Contributor',
        badges: ['Trial Fixer', 'Enrollment Strategist', 'Site Advocate'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_5',
        handle: 'PM_1643',
        reputationScore: 180,
        reputationTier: 'Senior Operator',
        badges: ['Protocol Navigator'],
      },
    }),
  ]);

  console.log('✅ Created users');

  // Create Trial Type Rooms
  await Promise.all([
    prisma.trialTypeRoom.create({
      data: {
        name: 'Oncology Trials',
        description: 'Discussion space for oncology clinical trials',
        slug: 'oncology-trials',
        participantCount: 127,
      },
    }),
    prisma.trialTypeRoom.create({
      data: {
        name: 'Rare Disease Trials',
        description: 'For rare disease and orphan drug trials',
        slug: 'rare-disease-trials',
        participantCount: 89,
      },
    }),
    prisma.trialTypeRoom.create({
      data: {
        name: 'Device Trials',
        description: 'Medical device clinical trials',
        slug: 'device-trials',
        participantCount: 64,
      },
    }),
    prisma.trialTypeRoom.create({
      data: {
        name: 'Cardiovascular Trials',
        description: 'Cardiology and cardiovascular studies',
        slug: 'cardiovascular-trials',
        participantCount: 73,
      },
    }),
    prisma.trialTypeRoom.create({
      data: {
        name: 'Neurology Trials',
        description: 'Neurological disorder trials',
        slug: 'neurology-trials',
        participantCount: 58,
      },
    }),
  ]);

  console.log('✅ Created trial type rooms');

  // Create Threads (20 sample discussions)
  const threadData = [
    {
      title: 'Protocol amendment added procedures without increasing site budget',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Urgent',
      description: 'Sponsor just amended the protocol to add 3 new mandatory procedures per visit, but refused to increase our site budget. These procedures add about 2 hours per patient visit. Has anyone dealt with this before?',
      userId: users[0].id,
      sameSituationCount: 63,
    },
    {
      title: 'Enrollment completely stalled - unrealistic expectations from CRA',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Rare Disease',
      siteCountRange: '1-10',
      issueCategory: 'Enrollment',
      urgencyLevel: 'Critical',
      description: 'Our CRA is pushing for 5 patients per month when we only have 12 qualified patients in our database. The study has very strict inclusion criteria. How do I push back without damaging the relationship?',
      userId: users[1].id,
      sameSituationCount: 47,
    },
    {
      title: 'IRB keeps rejecting our consent form updates',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Cardiovascular',
      siteCountRange: '11-50',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'We submitted consent form updates required by the sponsor, but our local IRB has rejected them 3 times now citing language issues. The sponsor template language conflicts with local IRB requirements. Anyone else dealt with this conflict?',
      userId: users[2].id,
      sameSituationCount: 31,
    },
    {
      title: 'Patient lost insurance coverage during ongoing trial',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Urgent',
      description: 'A patient enrolled in our study just lost their insurance coverage. The study drug is provided but all study-related procedures must be covered. Sponsor says it is the site responsibility. Is this standard?',
      userId: users[3].id,
      sameSituationCount: 28,
    },
    {
      title: 'Monitoring visits are becoming excessive - 2x monthly',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Neurology',
      siteCountRange: '1-10',
      issueCategory: 'Sponsor expectations',
      urgencyLevel: 'Normal',
      description: 'The CRA team has increased monitoring visits from monthly to twice monthly. This is taking significant time away from patient care and enrollment activities. Is this normal for Phase 3 studies?',
      userId: users[4].id,
      sameSituationCount: 52,
    },
    {
      title: 'Query overload - 45 queries on last monitoring report',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Device',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'Last monitoring visit resulted in 45 queries, most of which seem nitpicky. Is this typical for device studies? It is taking my entire day just to address queries.',
      userId: users[0].id,
      sameSituationCount: 38,
    },
    {
      title: 'Startup budget exhausted before first patient enrollment',
      trialPhase: 'Phase 1',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Sponsor expectations',
      urgencyLevel: 'Critical',
      description: 'Our startup budget was supposed to cover first 3 patients but we have not enrolled anyone and the funds are gone due to unexpected startup delays and costs. Sponsor is unwilling to provide additional funds. What options do we have?',
      userId: users[1].id,
      sameSituationCount: 41,
    },
    {
      title: 'Patient withdrawal due to travel burden',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Rare Disease',
      siteCountRange: '1-10',
      issueCategory: 'Enrollment',
      urgencyLevel: 'Normal',
      description: 'Several patients have withdrawn because the study requires weekly visits and they cannot travel that frequently. Sponsor will not consider reducing visit frequency. Has anyone successfully negotiated visit frequency?',
      userId: users[2].id,
      sameSituationCount: 35,
    },
    {
      title: 'Lab values outside reference range - protocol unclear',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Cardiovascular',
      siteCountRange: '11-50',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'Protocol says to notify medical monitor for lab values outside reference range but does not specify which labs or what threshold. We are drowning in notifications. Is there a standard approach?',
      userId: users[3].id,
      sameSituationCount: 29,
    },
    {
      title: 'Competing study recruiting from same patient pool',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Enrollment',
      urgencyLevel: 'Urgent',
      description: 'Another site in our area started recruiting for a competing study with less restrictive criteria and better compensation. We are losing all our potential patients. How do I handle this with my sponsor?',
      userId: users[4].id,
      sameSituationCount: 44,
    },
    {
      title: 'Electronic Diary device not working for elderly patients',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Neurology',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Normal',
      description: 'The electronic diary required for this study is too complex for our elderly patient population. Multiple patients have stopped completing entries. Sponsor is not providing paper alternatives.',
      userId: users[0].id,
      sameSituationCount: 36,
    },
    {
      title: 'Central pharmacy shipping delays affecting patient doses',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Sponsor expectations',
      urgencyLevel: 'Critical',
      description: 'Central pharmacy has been experiencing shipping delays causing patients to miss scheduled doses. This is affecting safety and efficacy data. Sponsor says they are working on it but no improvement.',
      userId: users[1].id,
      sameSituationCount: 39,
    },
    {
      title: 'Salary support payments consistently late',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Cardiovascular',
      siteCountRange: '11-50',
      issueCategory: 'Sponsor expectations',
      urgencyLevel: 'Urgent',
      description: 'Salary support payments for the study coordinator have been late for 4 out of 5 months. This is affecting our budget and morale. Multiple emails to sponsor finance team go unanswered.',
      userId: users[2].id,
      sameSituationCount: 27,
    },
    {
      title: 'Assessment schedule conflicts with standard care',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Rare Disease',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'The study assessment schedule requires patients to come in twice weekly but standard care is weekly. This is a major burden on patients and is causing compliance issues.',
      userId: users[3].id,
      sameSituationCount: 33,
    },
    {
      title: ' blinded study but pharmacist keeps unblinding accidentally',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Device',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Urgent',
      description: 'Our pharmacist keeps accidentally revealing treatment assignment when preparing study drug. We have had 3 unblinding incidents. Pharmacist is experienced but this system is just confusing.',
      userId: users[4].id,
      sameSituationCount: 25,
    },
    {
      title: 'Patient advocate insists on protocol deviation',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Normal',
      description: 'A patient advocate is insisting we deviate from protocol to accommodate patient preferences. The patient wants to continue in study but protocol violations are accumulating.',
      userId: users[0].id,
      sameSituationCount: 22,
    },
    {
      title: 'Temperature excursions during drug shipment',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Rare Disease',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'Multiple drug shipments have arrived with temperature excursions. Sponsor keeps saying to use them anyway but staff are uncomfortable. Is there guidance on this?',
      userId: users[1].id,
      sameSituationCount: 30,
    },
    {
      title: 'Competency assessments for staff are excessive',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Cardiovascular',
      siteCountRange: '11-50',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Normal',
      description: 'Sponsor requires competency assessments for every staff member before they can perform any study activity. This takes weeks and delays study start. Is this industry standard?',
      userId: users[2].id,
      sameSituationCount: 26,
    },
    {
      title: 'Patient compensation insufficient for time burden',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Neurology',
      siteCountRange: '1-10',
      issueCategory: 'Sponsor expectations',
      urgencyLevel: 'Urgent',
      description: 'Study visits take 4-6 hours but patient compensation only covers travel costs. Patients are dropping out due to financial burden. Sponsor refuses to increase compensation.',
      userId: users[3].id,
      sameSituationCount: 34,
    },
    {
      title: 'Data management queries are contradictory',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Oncology',
      siteCountRange: '1-10',
      issueCategory: 'Protocol burden',
      urgencyLevel: 'Needs Advice',
      description: 'Different data managers are sending contradictory queries. One says to correct data one way, another says the opposite. We do not know which instructions to follow.',
      userId: users[4].id,
      sameSituationCount: 24,
    },
  ];

  const threads = await Promise.all(
    threadData.map((data) =>
      prisma.thread.create({
        data,
      })
    )
  );

  console.log('✅ Created threads');

  // Create Replies
  await Promise.all([
    prisma.reply.create({
      data: {
        threadId: threads[0].id,
        userId: users[1].id,
        content: 'This happened to us on an oncology study. We documented all the additional time and presented it to the CRA. They eventually agreed to a budget adjustment. Key was showing the actual cost impact.',
        helpfulVotes: 12,
        isMostHelpful: true,
      },
    }),
    prisma.reply.create({
      data: {
        threadId: threads[1].id,
        userId: users[3].id,
        content: 'We had the same issue. I scheduled a call with the CRA manager and project manager together to discuss realistic enrollment expectations based on our patient database. They revised the targets.',
        helpfulVotes: 18,
        isMostHelpful: true,
      },
    }),
    prisma.reply.create({
      data: {
        threadId: threads[3].id,
        userId: users[4].id,
        content: 'The sponsor is responsible for study drug costs but procedures may depend on the contract. Check your Clinical Trial Agreement - some sites negotiated for procedure coverage.',
        helpfulVotes: 9,
        isMostHelpful: true,
      },
    }),
  ]);

  console.log('✅ Created replies');

  // Create Polls (10 sample polls)
  const pollData = [
    {
      question: 'Sponsor added procedures without increasing budget. Is this happening at your site?',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Oncology',
      options: ['Yes frequently', 'Sometimes', 'Rarely', 'Never'],
      duration: 24,
    },
    {
      question: 'How often do you experience unrealistic enrollment expectations from CRAs?',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Rare Disease',
      options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
      duration: 48,
    },
    {
      question: 'How frequently does your local IRB reject sponsor consent form language?',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Cardiovascular',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      duration: 24,
    },
    {
      question: 'What is your average monitoring visit frequency?',
      trialPhase: 'Phase 3',
      therapeuticArea: 'All',
      options: ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Less than quarterly'],
      duration: 72,
    },
    {
      question: 'How many queries do you typically receive per monitoring report?',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Device',
      options: ['0-10', '11-25', '26-50', '51-100', '100+'],
      duration: 48,
    },
    {
      question: 'Have you ever exhausted startup budget before first patient?',
      trialPhase: 'Phase 1',
      therapeuticArea: 'All',
      options: ['Yes, multiple times', 'Yes, once', 'Almost', 'No'],
      duration: 24,
    },
    {
      question: 'How often do patients withdraw due to visit frequency burden?',
      trialPhase: 'Phase 3',
      therapeuticArea: 'Rare Disease',
      options: ['Very frequently', 'Frequently', 'Sometimes', 'Rarely', 'Never'],
      duration: 48,
    },
    {
      question: 'How satisfied are you with central pharmacy shipping reliability?',
      trialPhase: 'Phase 2',
      therapeuticArea: 'Oncology',
      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'],
      duration: 72,
    },
    {
      question: 'How often are salary support payments late?',
      trialPhase: 'Phase 3',
      therapeuticArea: 'All',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      duration: 48,
    },
    {
      question: 'How many temperature excursions do you experience per year?',
      trialPhase: 'Phase 2',
      therapeuticArea: 'All',
      options: ['None', '1-2', '3-5', '6-10', '10+'],
      duration: 24,
    },
  ];

  const polls = await Promise.all(
    pollData.map((data) =>
      prisma.poll.create({
        data: {
          ...data,
          expiresAt: new Date(Date.now() + data.duration * 60 * 60 * 1000),
        },
      })
    )
  );

  console.log('✅ Created polls');

  // Create Industry Signals (5 sample signals)
  await Promise.all([
    prisma.industrySignal.create({
      data: {
        title: 'FDA Issues Warning Letter for Protocol Deviations',
        source: 'FDA Warning Letter',
        sourceUrl: 'https://www.fda.gov',
        eventDate: new Date('2024-02-15'),
        question: 'What operational conditions usually lead to situations like this?',
        therapeuticArea: 'All',
        trialPhase: 'All',
      },
    }),
    prisma.industrySignal.create({
      data: {
        title: 'EMA Inspection Report Highlights Informed Consent Issues',
        source: 'EMA Inspection Report',
        eventDate: new Date('2024-02-10'),
        question: 'How do you ensure proper informed consent documentation at your site?',
        therapeuticArea: 'All',
        trialPhase: 'All',
      },
    }),
    prisma.industrySignal.create({
      data: {
        title: 'Major Pharma Company Terminates Oncology Trial Due to Enrollment Issues',
        source: 'Clinical Trial Termination',
        eventDate: new Date('2024-02-08'),
        question: 'What are the common causes of trial terminations due to enrollment?',
        therapeuticArea: 'Oncology',
        trialPhase: 'Phase 3',
      },
    }),
    prisma.industrySignal.create({
      data: {
        title: 'Regulatory Compliance Event: Multiple Sites Cited for GCP Violations',
        source: 'Regulatory Compliance Event',
        eventDate: new Date('2024-02-05'),
        question: 'What operational practices help maintain GCP compliance?',
        therapeuticArea: 'All',
        trialPhase: 'All',
      },
    }),
    prisma.industrySignal.create({
      data: {
        title: 'New FDA Guidance on Decentralized Clinical Trials',
        source: 'FDA Guidance',
        sourceUrl: 'https://www.fda.gov',
        eventDate: new Date('2024-02-01'),
        question: 'How will this guidance impact your trial operations?',
        therapeuticArea: 'All',
        trialPhase: 'All',
      },
    }),
  ]);

  console.log('✅ Created industry signals');

  // Create Operator Playbooks (3 sample playbooks)
  await Promise.all([
    prisma.operatorPlaybook.create({
      data: {
        title: 'Escalating Unrealistic Enrollment Expectations',
        threadId: threads[1].id,
        userId: users[3].id,
        situationDescription: 'Sponsors and CRAs often set enrollment targets that are not realistic given local patient populations and study criteria.',
        warningSigns: [
          'Enrollment targets do not match your patient database',
          'CRA pressure increases without additional resources',
          'Site is blamed for slow enrollment',
          'Regular meetings focus only on enrollment numbers',
        ],
        escalationSteps: [
          'Document your actual patient population data',
          'Analyze inclusion/exclusion criteria impact',
          'Schedule call with CRA manager and project manager',
          'Present data-driven analysis of realistic targets',
          'Propose alternative recruitment strategies',
          'Request additional budget for recruitment efforts',
        ],
        escalationLanguage:
          'Based on our patient database analysis, the current enrollment targets are not achievable with our local population. We would like to discuss realistic targets and potential additional resources for recruitment efforts.',
        lessonsLearned:
          'Data-driven discussions are more effective than emotional arguments. Always come prepared with patient database analysis and be ready to suggest solutions, not just problems.',
        therapeuticArea: 'Rare Disease',
        trialPhase: 'Phase 2',
      },
    }),
    prisma.operatorPlaybook.create({
      data: {
        title: 'Handling Protocol Amendment Budget Impacts',
        threadId: threads[0].id,
        userId: users[0].id,
        situationDescription: 'Protocol amendments frequently add procedures and requirements without corresponding budget increases.',
        warningSigns: [
          'Amendment adds procedures without budget discussion',
          'Time burden increases without additional staff',
          'Site absorbs costs that should be sponsor responsibility',
          'Multiple amendments compound the problem',
        ],
        escalationSteps: [
          'Document time required for all new procedures',
          'Calculate actual cost impact per patient',
          'Present documentation to CRA and project manager',
          'Request budget adjustment before implementing changes',
          'If refused, escalate to CRA manager or study director',
        ],
        escalationLanguage:
          'The protocol amendment requires X additional hours per patient visit. At our current patient volume, this represents a cost of $Y per month. We request a budget adjustment to cover these additional required procedures.',
        lessonsLearned:
          'Always address budget impacts immediately upon receiving amendments. Documentation of actual time and cost is essential for successful budget negotiations.',
        therapeuticArea: 'Oncology',
        trialPhase: 'Phase 3',
      },
    }),
    prisma.operatorPlaybook.create({
      data: {
        title: 'Managing IRB Consent Form Language Conflicts',
        threadId: threads[2].id,
        userId: users[2].id,
        situationDescription: 'Local IRBs often reject sponsor consent form templates due to language conflicts with local requirements.',
        warningSigns: [
          'IRB rejects sponsor template language',
          'Multiple resubmissions required',
          'Delays in study startup or amendments',
          'IRB cites specific language conflicts',
        ],
        escalationSteps: [
          'Document specific IRB requirements',
          'Highlight exact language conflicts',
          'Request sponsor to review IRB feedback',
          'Ask sponsor legal team to provide alternative language',
          'Request waiver if standard language is required',
          'Escalate to sponsor IRB team or legal department',
        ],
        escalationLanguage:
          'Our IRB has rejected the consent form language due to specific requirements that conflict with the sponsor template. We need the sponsor legal team to provide alternative language that satisfies both sponsor requirements and local IRB standards.',
        lessonsLearned:
          'Build relationships with your IRB and understand their specific requirements. Early communication with sponsor IRB teams can prevent delays.',
        therapeuticArea: 'Cardiovascular',
        trialPhase: 'Phase 3',
      },
    }),
  ]);

  console.log('✅ Created operator playbooks');

  // Create Trial Confessions (3 sample confessions)
  await Promise.all([
    prisma.trialConfession.create({
      data: {
        userId: users[0].id,
        title: 'I was told to enroll a patient slightly outside eligibility',
        content: 'To keep enrollment numbers alive, my manager suggested enrolling a patient who was 2 weeks outside the eligibility window. The patient met all other criteria and the study was running behind. I did it, and no one found out, but I still feel guilty.',
        therapeuticArea: 'Oncology',
        trialPhase: 'Phase 3',
        isApproved: true,
      },
    }),
    prisma.trialConfession.create({
      data: {
        userId: users[1].id,
        title: 'I rarely complete all case report forms on time',
        content: 'With 5 active studies and no administrative support, I have to prioritize. Some CRFs from low priority studies sit for weeks before I enter the data. The CRAs complain but there are only so many hours in a day.',
        therapeuticArea: 'All',
        trialPhase: 'All',
        isApproved: true,
      },
    }),
    prisma.trialConfession.create({
      data: {
        userId: users[2].id,
        title: 'I have lost count of the protocol violations',
        content: 'Between competing protocols and standard care conflicts, we have protocol violations on almost every patient. I report the major ones but the minor ones pile up. I am afraid of what will happen during an inspection.',
        therapeuticArea: 'Cardiovascular',
        trialPhase: 'Phase 3',
        isApproved: true,
      },
    }),
  ]);

  console.log('✅ Created trial confessions');

  // Create Career Discussions (3 sample discussions)
  await Promise.all([
    prisma.careerDiscussion.create({
      data: {
        userId: users[3].id,
        title: 'How to push back on unrealistic sponsors without burning bridges',
        content: 'I am dealing with a sponsor who has completely unrealistic expectations but I do not want to damage my relationship or my site reputation. What is the best approach?',
        topic: 'Pushing back on sponsors',
        helpfulVotes: 45,
      },
    }),
    prisma.careerDiscussion.create({
      data: {
        userId: users[4].id,
        title: 'Avoiding blame for protocol design failures',
        content: 'When a protocol has design flaws that cause operational problems, how do you protect your site from being blamed for poor performance? We have been flagged as underperforming but the protocol itself is the problem.',
        topic: 'Avoiding blame for protocol failures',
        helpfulVotes: 38,
      },
    }),
    prisma.careerDiscussion.create({
      data: {
        userId: users[0].id,
        title: 'Managing CRO pressure to take on too many studies',
        content: 'Our CRO keeps pushing us to take on more studies but we are already stretched thin. Saying no feels like we will lose future opportunities but saying yes is burning out our staff.',
        topic: 'Handling CRO pressure',
        helpfulVotes: 32,
      },
    }),
  ]);

  console.log('✅ Created career discussions');

  // Create Case Drops (3 sample case drops)
  await Promise.all([
    prisma.caseDrop.create({
      data: {
        caseNumber: 1,
        title: 'The Unapproved Amendment',
        content: 'A major amendment added 12 new procedures without budget increase. Site documented 200+ hours of additional work and eventually secured supplemental funding. Key lesson: Always document before implementing.',
        trialPhase: 'Phase 3',
        outcome: 'Successful - Budget increased after 3 months',
      },
    }),
    prisma.caseDrop.create({
      data: {
        caseNumber: 2,
        title: 'The Enrollment Collapse',
        content: 'Study enrolled 0 patients in 6 months despite aggressive targets. Analysis revealed inclusion criteria were too restrictive. Sponsor eventually amended protocol after 3 sites dropped out. Remaining sites still struggle.',
        trialPhase: 'Phase 2',
        outcome: 'Partial - Protocol amended but enrollment remains low',
      },
    }),
    prisma.caseDrop.create({
      data: {
        caseNumber: 3,
        title: 'The Temperature Excursion Crisis',
        content: 'Multiple shipments arrived with temperature excursions. Site documented all incidents and refused to use compromised product. After 2 months, sponsor changed shipping vendor. No patients were affected.',
        trialPhase: 'Phase 2',
        outcome: 'Successful - Vendor changed, no patient impact',
      },
    }),
  ]);

  console.log('✅ Created case drops');

  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('Summary:');
  console.log(`- ${users.length} users created`);
  console.log(`- ${threads.length} threads created`);
  console.log(`- ${polls.length} polls created`);
  console.log(`- 5 industry signals created`);
  console.log(`- 3 operator playbooks created`);
  console.log(`- 3 trial confessions created`);
  console.log(`- 3 career discussions created`);
  console.log(`- 3 case drops created`);
  console.log(`- 5 trial type rooms created`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });