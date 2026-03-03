import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Database, FileText, ArrowRight, Lock, Eye, Users, Shield, Lightbulb } from 'lucide-react';

// All 12 Official Failure Patterns from CTFI Business Overview
const patterns = [
  {
    id: 'protocol-overload-drift',
    title: 'Protocol Overload Drift',
    failureType: 'PROTOCOL_OVERLOAD_DRIFT',
    frequency: 'High',
    detectionWindow: 'Weeks 4-12',
    impact: 'Critical',
    summary: 'Protocol complexity creates early strain that is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Site staff report protocol is "too complex" in first 4 weeks',
      'Deviation rate exceeds 20% before first patient enrollment',
      'Multiple protocol clarification requests within first month',
      'Sites requesting simplified versions or checklists',
      'Training completion time exceeds standard by 50%+'
    ],
    relatedPostMortemsCount: 12,
    viewCount: 342
  },
  {
    id: 'enrollment-assumption-collapse',
    title: 'Enrollment Assumption Collapse',
    failureType: 'ENROLLMENT_ASSUMPTION_COLLAPSE',
    frequency: 'Very High',
    detectionWindow: 'Weeks 2-8',
    impact: 'Critical',
    summary: 'Early enrollment strain is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'First patient enrollment beyond week 4 of activation',
      'Site-reported patient pool size exceeds actual screening encounters by 3x',
      'Screen failure rate below 5% (suspiciously low)',
      'Sites refusing to provide realistic patient forecasts',
      'Recruitment plans based on historical data that doesn\'t match protocol'
    ],
    relatedPostMortemsCount: 8,
    viewCount: 256
  },
  {
    id: 'silent-site-strain',
    title: 'Silent Site Strain',
    failureType: 'SILENT_SITE_STRAIN',
    frequency: 'High',
    detectionWindow: 'Weeks 6-16',
    impact: 'High',
    summary: 'Early operational strain is absorbed locally at sites until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Staff turnover at 30%+ within first 6 months',
      'Consistent "we\'re understaffed" feedback from coordinators',
      'Declining response times to CRA queries',
      'Sites working weekends/nights to maintain basic operations',
      'Multiple concurrent trials competing for same staff'
    ],
    relatedPostMortemsCount: 6,
    viewCount: 189
  },
  {
    id: 'budget-starvation-lag',
    title: 'Budget Starvation Lag',
    failureType: 'BUDGET_STARVATION_LAG',
    frequency: 'Medium',
    detectionWindow: 'Months 2-6',
    impact: 'Critical',
    summary: 'Early budget strain is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Site payments consistently delayed beyond contractual terms',
      'CRA visits reduced or postponed due to budget constraints',
      'Sites requesting additional compensation mid-trial',
      'Unanticipated costs exceeding contingency budget',
      'Protocol amendments requiring additional unfunded work'
    ],
    relatedPostMortemsCount: 5,
    viewCount: 167
  },
  {
    id: 'pi-bandwidth-failure',
    title: 'PI Bandwidth Failure',
    failureType: 'PI_BANDWIDTH_FAILURE',
    frequency: 'Medium',
    detectionWindow: 'Weeks 8-16',
    impact: 'High',
    summary: 'Early PI capacity strain is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'PI not reviewing documents within contractual timelines',
      'Delegating critical review tasks to sub-investigators without authority',
      'Missing investigator meetings or late arrivals',
      'Sites reporting PI "too busy" for trial activities',
      'Protocol deviations due to PI not providing oversight'
    ],
    relatedPostMortemsCount: 4,
    viewCount: 134
  },
  {
    id: 'cro-translation-breakdown',
    title: 'CRO Translation Breakdown',
    failureType: 'CRO_TRANSLATION_BREAKDOWN',
    frequency: 'High',
    detectionWindow: 'Weeks 4-12',
    impact: 'High',
    summary: 'Early CRO communication strain is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Sponsor staff unable to get timely responses from CRO',
      'Different answers from different CRO team members',
      'CRO requesting clarifications that should be known',
      'Site issues escalated to CRO but not resolved',
      'Lack of visibility into CRO operational status'
    ],
    relatedPostMortemsCount: 7,
    viewCount: 198
  },
  {
    id: 'amendment-cascade-fatigue',
    title: 'Amendment Cascade Fatigue',
    failureType: 'AMENDMENT_CASCADE_FATIGUE',
    frequency: 'Medium',
    detectionWindow: 'Months 3-9',
    impact: 'High',
    summary: 'Early strain from protocol amendments is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Multiple protocol amendments within first 6 months',
      'Sites reporting "amendment fatigue" or "we\'re tired of changes"',
      'Amendment implementation not completed before next amendment issued',
      'Sites requesting compensation for amendment-related work',
      'Declining site performance after each amendment'
    ],
    relatedPostMortemsCount: 4,
    viewCount: 134
  },
  {
    id: 'monitoring-signal-suppression',
    title: 'Monitoring Signal Suppression',
    failureType: 'MONITORING_SIGNAL_SUPPRESSION',
    frequency: 'Medium',
    detectionWindow: 'Weeks 6-14',
    impact: 'Critical',
    summary: 'Early warning signals from monitoring activities are absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Monitoring reports filed but not reviewed by leadership',
      'Critical issues flagged but not escalated',
      'CRA observations consistent across sites but no pattern recognition',
      'Sites reporting "nobody reads the monitoring reports"',
      'Issues repeated site-to-site without systemic resolution'
    ],
    relatedPostMortemsCount: 5,
    viewCount: 167
  },
  {
    id: 'recruitment-vendor-mismatch',
    title: 'Recruitment Vendor Mismatch',
    failureType: 'RECRUITMENT_VENDOR_MISMATCH',
    frequency: 'Medium',
    detectionWindow: 'Weeks 4-10',
    impact: 'High',
    summary: 'Early strain from recruitment vendor performance is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Recruitment vendor not meeting agreed-upon targets',
      'Different messaging from vendor vs sponsor',
      'Sites reporting vendor recruitment approaches are ineffective',
      'Vendor spending but not delivering patients',
      'Recruitment strategies not aligned with protocol requirements'
    ],
    relatedPostMortemsCount: 6,
    viewCount: 189
  },
  {
    id: 'data-burden-accumulation',
    title: 'Data Burden Accumulation',
    failureType: 'DATA_BURDEN_ACCUMULATION',
    frequency: 'Low',
    detectionWindow: 'Months 4-8',
    impact: 'Medium',
    summary: 'Early data collection strain is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Sites reporting data collection is "too much work"',
      'Increasing data query rates over time',
      'Sites requesting EDC simplification',
      'Data quality declining due to collection burden',
      'Sites working nights/weekends to catch up on data entry'
    ],
    relatedPostMortemsCount: 3,
    viewCount: 89
  },
  {
    id: 'decision-latency-lock',
    title: 'Decision Latency Lock',
    failureType: 'DECISION_LATENCY_LOCK',
    frequency: 'Medium',
    detectionWindow: 'Weeks 8-20',
    impact: 'High',
    summary: 'Early strain from delayed decisions is absorbed locally until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Critical decisions pending for weeks/months',
      'Sites reporting "waiting for sponsor approval" on routine items',
      'Multiple approval layers required for simple decisions',
      'Decision requests acknowledged but not acted upon',
      'Operational issues escalating due to lack of timely decisions'
    ],
    relatedPostMortemsCount: 5,
    viewCount: 167
  },
  {
    id: 'compliance-by-workaround',
    title: 'Compliance-by-Workaround',
    failureType: 'COMPLIANCE_BY_WORKAROUND',
    frequency: 'Low',
    detectionWindow: 'Months 2-12',
    impact: 'Critical',
    summary: 'Early strain from compliance requirements is absorbed locally through workarounds until escalation becomes unsafe, increasing downstream collapse risk.',
    earlySignals: [
      'Sites reporting "we have to get creative to comply"',
      'Non-standard processes to meet requirements',
      'Sites privately admitting they\'re not following protocol strictly',
      'Increasing protocol deviations attributed to "practical" reasons',
      'Sites requesting guidance on how to comply with difficult requirements'
    ],
    relatedPostMortemsCount: 4,
    viewCount: 134
  }
];

export default function PatternsPage() {
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
                <div className="text-xs text-white/95 font-medium">Failure Patterns</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Home
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

      {/* Header */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            12 Official Failure Patterns
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Synthesized patterns from anonymized trial failures. Understand what really goes wrong before it happens to you.
          </p>
        </div>

        {/* Anonymity Reminder */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-4xl mx-auto mb-12">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">This summary reflects patterns observed across similar trials.</h3>
              <p className="text-white/90 text-sm">
                It does not judge performance. It does not assign blame. It exists to give you language, context, and options.
              </p>
            </div>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <Link 
              key={pattern.id} 
              href={`/patterns/${pattern.id}`}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 h-full">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {pattern.title}
                </h3>

                {/* Failure Type & Frequency Badge */}
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs font-semibold text-white/90">
                    {pattern.failureType.replace(/_/g, ' ')}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    pattern.frequency === 'Very High' ? 'bg-red-500/20 text-red-400' :
                    pattern.frequency === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    pattern.frequency === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {pattern.frequency}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    pattern.impact === 'Critical' ? 'bg-red-600/20 text-red-500' :
                    'bg-yellow-600/20 text-yellow-500'
                  }`}>
                    {pattern.impact} Impact
                  </span>
                </div>

                {/* Summary */}
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {pattern.summary}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-white/70 mb-4">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{pattern.relatedPostMortemsCount} retrospective analyses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{pattern.viewCount} views</span>
                  </div>
                </div>

                {/* Early Signals Preview */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Early signals:</span>
                  </div>
                  <ul className="space-y-1">
                    {pattern.earlySignals.slice(0, 2).map((signal, idx) => (
                      <li key={idx} className="text-xs text-white/70 flex items-start gap-1">
                        <span className="text-red-400">•</span>
                        <span className="line-clamp-1">{signal}</span>
                      </li>
                    ))}
                    {pattern.earlySignals.length > 2 && (
                      <li className="text-xs text-white/50 italic">
                        +{pattern.earlySignals.length - 2} more signals...
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-2 text-sm text-white font-semibold group-hover:text-red-400 transition-colors">
                  <span>View full pattern</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Want full access to all patterns?
            </h2>
            <p className="text-white/90 mb-6">
              Get Pro access for $29/month. Unlock all 12 patterns, full retrospective library, and monthly new content.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                <Lock className="h-5 w-5 mr-2" />
                Get Pro Access
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/90 text-sm">
            © 2026 CTFI. Clinical Trial Failure Intelligence.
          </p>
          <p className="text-white/60 text-xs mt-2">
            You're not reporting a failure. You're checking your footing.
          </p>
        </div>
      </footer>
    </div>
  );
}