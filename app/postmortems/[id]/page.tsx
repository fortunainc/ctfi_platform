import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Shield, Calendar, User, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock data - will be replaced with database calls
const postMortems: Record<string, any> = {
  'pm-001': {
    id: 'pm-001',
    title: 'Phase III Oncology Trial - Enrollment Collapse at Community Sites',
    role: 'CRC',
    trialPhase: 'PHASE_III',
    therapeuticArea: 'Oncology',
    failureType: 'ENROLLMENT_COLLAPSE',
    confidenceLevel: 'HIGH',
    whatFailed: 'Trial failed to enroll a single patient at 5 community sites over 6 months, despite promising feasibility reports from each site claiming ability to enroll 2-3 patients per month. Sites attributed failure to patient pool exhaustion, competitive landscape, and lack of patient recruitment support.',
    
    earlyWarningSigns: [
      'Site feasibility overestimated patient pool by 300% based on actual chart reviews conducted 6 months later',
      'Three competing trials with similar inclusion criteria active at same sites during enrollment period',
      'Patient population already depleted by 3 prior oncology trials at these sites in past 18 months',
      'Sites lacked dedicated research coordinators - relied on overburdened clinic staff',
      'No patient recruitment strategy or materials provided by sponsor to sites',
      'Sites unable to identify any potential patients during initial chart reviews after activation'
    ],
    
    leadershipMisunderstanding: 'Sponsor believed site feasibility reports without independent verification. Assumed sites would handle patient recruitment independently. Misinterpreted low screening failure rates as good site selection rather than poor screening activity. Failed to recognize that sites were competing for the same small patient pool.',
    
    whatWouldDoDifferently: 'Would conduct real patient chart reviews during feasibility phase, not rely on site estimates. Would track competitive landscape at each site before activation. Would require dedicated research coordinator allocation as site qualification criterion. Would provide patient recruitment materials and strategies to sites. Would stagger site activation to avoid competing with own trials at same sites.',
    
    failureObviousAt: 'Month 3 - after zero enrollments across all activated sites despite screening activity',
    
    createdAt: '2024-01-20',
    status: 'APPROVED',
    patterns: ['enrollment-mirage', 'site-selection-mismatch']
  }
};

export async function generateStaticParams() {
  return Object.keys(postMortems).map((id) => ({
    id,
  }));
}

export default function RetrospectiveDetailPage({ params }: { params: { id: string } }) {
  const pm = postMortems[params.id];

  if (!pm) {
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
              <Link href="/postmortems">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  All Post-Mortems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <Link href="/postmortems">
          <Button variant="ghost" className="text-white/90 hover:bg-white/10 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
        </Link>
      </div>

      {/* Post-Mortem Content */}
      <div className="container mx-auto px-4 pb-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {pm.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-500/20 rounded text-sm font-semibold text-blue-400">
              Role: {pm.role}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 rounded text-sm font-semibold text-purple-400">
              Phase: {pm.trialPhase.replace('_', ' ')}
            </span>
            <span className="px-3 py-1 bg-green-500/20 rounded text-sm font-semibold text-green-400">
              Therapeutic Area: {pm.therapeuticArea}
            </span>
            <span className="px-3 py-1 bg-red-500/20 rounded text-sm font-semibold text-red-400">
              Failure: {pm.failureType.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Confidence: <strong>{pm.confidenceLevel}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Failure obvious: <strong>{pm.failureObviousAt}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Submitted: <strong>{pm.createdAt}</strong></span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What Failed */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertOctagon className="h-6 w-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">What Failed</h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                {pm.whatFailed}
              </p>
            </div>

            {/* Early Warning Signs */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Early Warning Signs</h2>
              </div>
              <p className="text-white/70 mb-4">
                These signals appeared <strong>before</strong> the failure became obvious:
              </p>
              <ul className="space-y-3">
                {pm.earlyWarningSigns.map((sign: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-lg">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Leadership Misunderstood */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">What Leadership Misunderstood</h2>
              <p className="text-white/90 leading-relaxed text-lg">
                {pm.leadershipMisunderstanding}
              </p>
            </div>

            {/* What I Would Do Differently */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">What I Would Do Differently</h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                {pm.whatWouldDoDifferently}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Patterns */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Related Patterns</h3>
              <div className="space-y-3">
                {pm.patterns.map((patternSlug: string) => (
                  <Link key={patternSlug} href={`/patterns/${patternSlug}`} className="block group">
                    <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                      <div className="font-semibold text-white text-sm group-hover:text-red-400 capitalize">
                        {patternSlug.replace(/-/g, ' ')}
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        Synthesized from similar failures
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Anonymization Notice */}
            <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Anonymized Content</h3>
              </div>
              <p className="text-white/80 text-sm">
                This retrospective analysis has been anonymized to protect the contributor. No sponsor names, site names, or protocol titles are included.
              </p>
            </div>

            {/* Contribute CTA */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Have a Similar Failure?</h3>
              <p className="text-white/90 text-sm mb-4">
                Submit your own anonymized retrospective analysis to help others avoid the same mistakes.
              </p>
              <Link href="/submit">
                <Button className="w-full bg-white text-red-600 hover:bg-white/90">
                  Submit Post-Mortem
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