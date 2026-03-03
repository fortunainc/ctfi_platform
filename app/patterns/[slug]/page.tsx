import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Database, Eye, FileText, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock data - will be replaced with database calls
const patterns: Record<string, any> = {
  'protocol-overload': {
    id: 'protocol-overload',
    title: 'Protocol Overload',
    slug: 'protocol-overload',
    failureType: 'PROTOCOL_OVERLOAD',
    therapeuticArea: '',
    definition: 'A pattern where protocol complexity exceeds operational capacity, leading to systematic failures before first patient enrollment.',
    earlySignals: [
      'Protocol document length exceeds 100 pages',
      'More than 15 inclusion/exclusion criteria',
      'Multiple complex primary and secondary endpoints',
      'Frequent source document verification requirements',
      'Complex inclusion criteria requiring multiple confirmations',
      'Site staff struggling to explain protocol to patients'
    ],
    whyMissed: [
      'Sponsor teams optimize for statistical power, not operational feasibility',
      'Sites overpromise during feasibility to win business',
      'Protocol complexity is viewed as necessary for scientific rigor',
      'Early warnings are dismissed as implementation challenges',
      'Sites fear sounding incompetent if they raise concerns'
    ],
    rootCause: [
      'Protocol design without adequate site operator input',
      'Inadequate pilot testing of operational burden',
      'Competitive pressure to maximize protocol comprehensiveness',
      'Siloed teams within sponsor organizations',
      'Underestimation of staff turnover impact on complex protocols'
    ],
    mitigation: [
      'Protocol complexity should be measured and tracked during design',
      'Sites with prior experience should be prioritized for complex protocols',
      'Budget should include provisions for additional staff time',
      'Phased rollout to high-performing sites before broader activation',
      'Regular check-ins with sites to identify operational strain early'
    ],
    summary: 'Excessive protocol complexity leading to site fatigue and data quality degradation before first patient enrollment.',
    relatedPostMortemsCount: 12,
    viewCount: 342,
    createdAt: '2024-01-15',
    createdBy: 'Editor'
  },
  'enrollment-mirage': {
    id: 'enrollment-mirage',
    title: 'Enrollment Mirage',
    slug: 'enrollment-mirage',
    failureType: 'ENROLLMENT_COLLAPSE',
    therapeuticArea: '',
    definition: 'A pattern where site enrollment estimates prove dramatically inaccurate due to competitive landscape and patient pool exhaustion.',
    earlySignals: [
      'Overly optimistic site feasibility reports',
      'Competing trials in same indication',
      'Rapid patient pool depletion',
      'Screen failure rates above 80%',
      'Sites struggling to screen enough patients',
      'Principal investigator time allocation issues'
    ],
    whyMissed: [
      'Feasibility reports are often sales documents, not reality checks',
      'Sponsors assume they have exclusive access to patient populations',
      'Competitive intelligence gathering is insufficient',
      'Historical site performance is not thoroughly vetted',
      'Patient pool calculations don\'t account for competing trials'
    ],
    rootCause: [
      'Overreliance on site self-reported data without verification',
      'Inadequate market research on competitive landscape',
      'Failure to track site enrollment across all studies',
      'Sites隐瞒 actual capacity to win studies',
      'Lack of real-time enrollment tracking mechanisms'
    ],
    mitigation: [
      'Verify site enrollment claims through independent audits',
      'Track competitive trials in therapeutic area',
      'Use conservative enrollment projections with buffers',
      'Implement early enrollment warning systems',
      'Prioritize sites with proven enrollment consistency'
    ],
    summary: 'Site estimates promising high enrollment that never materializes due to competitive landscape and patient pool exhaustion.',
    relatedPostMortemsCount: 8,
    viewCount: 256,
    createdAt: '2024-01-10',
    createdBy: 'Editor'
  },
  'budget-suffocation': {
    id: 'budget-suffocation',
    title: 'Budget Suffocation',
    slug: 'budget-suffocation',
    failureType: 'BUDGET_UNDERFUNDING',
    therapeuticArea: '',
    definition: 'A pattern where site budgets fail to cover actual operational costs, leading to early termination or quality compromises.',
    earlySignals: [
      'Budget below industry standard per patient',
      'No allowance for extra staff time',
      'Excessive non-reimbursable activities',
      'Sites declining participation mid-trial',
      'High staff turnover at participating sites',
      'Delayed data submission patterns'
    ],
    whyMissed: [
      'Sponsors prioritize cost containment over operational sustainability',
      'Site budgets are calculated based on ideal scenarios',
      'Hidden costs emerge only after study initiation',
      'Sites are reluctant to negotiate terms',
      'Budget templates haven\'t been updated for modern trial complexity'
    ],
    rootCause: [
      'Outdated budget benchmarks that don\'t reflect current costs',
      'Failure to account for regulatory burden increases',
      'Underestimation of source documentation requirements',
      'No contingency for protocol complexity increases',
      'Sites accepting budgets to win business despite insufficient funding'
    ],
    mitigation: [
      'Use current market benchmarks for budget calculations',
      'Include contingency funds for unexpected complexity',
      'Budget for adequate staff time and training',
      'Regular budget reviews during study conduct',
      'Transparent communication about budget constraints'
    ],
    summary: 'Community site budgets insufficient to cover actual operational costs, leading to early termination or quality compromises.',
    relatedPostMortemsCount: 6,
    viewCount: 189,
    createdAt: '2024-01-08',
    createdBy: 'Editor'
  },
  'cro-signal-loss': {
    id: 'cro-signal-loss',
    title: 'CRO Signal Loss',
    slug: 'cro-signal-loss',
    failureType: 'CRO_EXECUTION_FAILURE',
    therapeuticArea: null,
    definition: 'A pattern where communication breakdowns between sponsor and CRO create operational blind spots and delayed intervention.',
    earlySignals: [
      'Infrequent site monitoring',
      'Delayed data review cycles',
      'Unclear escalation pathways',
      'CRA turnover exceeding 40%',
      'Site staff reporting lack of CRO responsiveness',
      'Inconsistent monitoring reports'
    ],
    whyMissed: [
      'CRO relationships are viewed as transactional rather than strategic',
      'Sponsors delegate too much without oversight',
      'KPIs focus on process completion rather than quality',
      'Regular joint reviews are not conducted',
      'Communication channels are not clearly defined'
    ],
    rootCause: [
      'Inadequate SLA monitoring and enforcement',
      'High CRO staff turnover affecting consistency',
      'Overloaded CRO teams handling too many sites',
      'Poor information sharing between sponsor and CRO',
      'Lack of joint risk management processes'
    ],
    mitigation: [
      'Establish clear KPIs and regular performance reviews',
      'Implement joint oversight committees',
      'Define escalation pathways clearly',
      'Maintain sponsor-level visibility into site performance',
      'Regular communication schedules between teams'
    ],
    summary: 'Communication breakdown between sponsor and CRO leading to operational blind spots and delayed intervention.',
    relatedPostMortemsCount: 5,
    viewCount: 167,
    createdAt: '2024-01-05',
    createdBy: 'Editor'
  },
  'amendment-cascade': {
    id: 'amendment-cascade',
    title: 'Amendment Cascade',
    slug: 'amendment-cascade',
    failureType: 'AMENDMENT_CASCADE',
    therapeuticArea: '',
    definition: 'A pattern where multiple protocol amendments in rapid succession cause site confusion, protocol deviations, and enrollment delays.',
    earlySignals: [
      'Protocol changes within 3 months',
      'Sites requiring re-training on amendments',
      'Increase in protocol deviations',
      'Enrollment suspension periods',
      'Site complaints about frequent changes',
      'Delay in implementing amendment changes'
    ],
    whyMissed: [
      'Each amendment is viewed in isolation rather than cumulatively',
      'Operational impact assessments are superficial',
      'Regulatory pressures drive rapid amendments',
      'Sites are reluctant to push back on changes',
      'Timeline pressures override operational feasibility'
    ],
    rootCause: [
      'Insufficient protocol development and testing',
      'Regulatory requirement changes',
      'Competitive pressure to add endpoints',
      'Inadequate feasibility data collection',
      'Lack of centralized amendment coordination'
    ],
    mitigation: [
      'Comprehensive protocol development with stakeholder input',
      'Pilot testing before protocol finalization',
      'Bundle changes when possible rather than frequent amendments',
      'Adequate lead time for amendment implementation',
      'Site consultation on amendment feasibility'
    ],
    summary: 'Multiple protocol amendments in rapid succession causing site confusion, protocol deviations, and enrollment delays.',
    relatedPostMortemsCount: 4,
    viewCount: 134,
    createdAt: '2024-01-03',
    createdBy: 'Editor'
  },
  'site-selection-mismatch': {
    id: 'site-selection-mismatch',
    title: 'Site Selection Mismatch',
    slug: 'site-selection-mismatch',
    failureType: 'SITE_SELECTION_MISMATCH',
    therapeuticArea: '',
    definition: 'A pattern where sites are selected based on promised rather than actual capabilities, leading to underperformance and study delays.',
    earlySignals: [
      'Discrepancy in feasibility vs actual data',
      'Lack of prior experience with similar trials',
      'Inadequate staff qualification',
      'Site infrastructure limitations',
      'High protocol deviation rates early in study',
      'Struggling to meet activation milestones'
    ],
    whyMissed: [
      'Feasibility reports overstate capabilities',
      'Sponsors prioritize geographic spread over quality',
      'Site visits don\'t reveal operational reality',
      'Pressure to activate sites quickly',
      'Sites隐瞒 limitations during selection process'
    ],
    rootCause: [
      'Inadequate site qualification processes',
      'Overreliance on self-reported site data',
      'Insufficient site visits and audits',
      'Poor historical performance verification',
      'Pressure to meet activation timelines'
    ],
    mitigation: [
      'Thorough site qualification with actual performance verification',
      'Prioritize sites with relevant experience',
      'Conduct comprehensive site visits',
      'Verify historical enrollment and performance data',
      'Implement phased site activation approach'
    ],
    summary: 'Sites selected based on promised rather than actual capabilities, leading to underperformance and study delays.',
    relatedPostMortemsCount: 7,
    viewCount: 198,
    createdAt: '2024-01-12',
    createdBy: 'Editor'
  }
};

export async function generateStaticParams() {
  return Object.keys(patterns).map((slug) => ({
    slug,
  }));
}

export default async function PatternDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pattern = patterns[slug];

  if (!pattern) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">CTFI</div>
                <div className="text-xs text-white/95 font-medium">Failure Intelligence</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/patterns">
                <Button variant="ghost" className="text-white font-semibold hover:bg-white/10 px-4">
                  All Patterns
                </Button>
              </Link>
              <Link href="/pricing">
                <Button className="bg-white text-slate-900 hover:bg-white/90">
                  Get Pro Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <Link href="/patterns">
          <Button variant="ghost" className="text-white/90 hover:bg-white/10 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patterns
          </Button>
        </Link>
      </div>

      {/* Pattern Content */}
      <div className="container mx-auto px-4 pb-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {pattern.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/10 rounded text-sm font-semibold text-white/90">
                  {pattern.failureType.replace(/_/g, ' ')}
                </span>
                {pattern.therapeuticArea && (
                  <span className="px-3 py-1 bg-blue-500/20 rounded text-sm font-semibold text-blue-400">
                    {pattern.therapeuticArea}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xl text-white/90 mb-6">
            {pattern.definition}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{pattern.relatedPostMortemsCount} retrospective analyses</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{pattern.viewCount} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated {pattern.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Pattern Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Early Warning Signs */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Early Warning Signs</h2>
              </div>
              <p className="text-white/70 mb-4 text-sm">
                These signals typically appear <strong>before</strong> the failure becomes obvious. Spot them early to take action.
              </p>
              <ul className="space-y-3">
                {pattern.earlySignals.map((signal: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Leadership Misses It */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Why Leadership Misses It</h2>
              <p className="text-white/70 mb-4 text-sm">
                Understanding these blind spots helps you recognize when you might be making the same mistakes.
              </p>
              <ul className="space-y-3">
                {pattern.whyMissed.map((reason: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <span className="text-red-400 text-lg mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Root Cause */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">What Actually Causes It</h2>
              <p className="text-white/70 mb-4 text-sm">
                Based on analysis of multiple trial failures, these are the underlying drivers.
              </p>
              <ul className="space-y-3">
                {pattern.rootCause.map((cause: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mitigation */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">What Mitigates It</h2>
              <p className="text-white/70 mb-4 text-sm">
                These are <strong>observations</strong> from trials that avoided this failure, not prescriptive advice.
              </p>
              <ul className="space-y-3">
                {pattern.mitigation.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call to Action */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">See Full Retrospective Analyses</h3>
              <p className="text-white/90 text-sm mb-4">
                This pattern is synthesized from {pattern.relatedPostMortemsCount} anonymized retrospective analyses. Access the full library to see the detailed reports.
              </p>
              <Link href="/pricing">
                <Button className="w-full bg-white text-red-600 hover:bg-white/90">
                  Get Pro Access ($29/mo)
                </Button>
              </Link>
            </div>

            {/* Related Patterns */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Related Patterns</h3>
              <div className="space-y-3">
                <Link href="/patterns/enrollment-mirage" className="block group">
                  <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <div className="font-semibold text-white text-sm group-hover:text-red-400">
                      Enrollment Mirage
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Overestimating site enrollment potential
                    </div>
                  </div>
                </Link>
                <Link href="/patterns/site-selection-mismatch" className="block group">
                  <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <div className="font-semibold text-white text-sm group-hover:text-red-400">
                      Site Selection Mismatch
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Promised vs actual site capabilities
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Contribute */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Seen This Pattern?</h3>
              <p className="text-white/70 text-sm mb-4">
                Have you experienced this failure? Submit an anonymous retrospective analysis to help others avoid it.
              </p>
              <Link href="/submit">
                <Button variant="outline" className="w-full border-2 border-white/70 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 text-white font-semibold hover:text-white">
                  Submit Retrospective Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/90 text-sm">
            © 2026 CTFI. Clinical Trial Failure Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}