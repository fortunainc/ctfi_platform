import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock, Search, Filter, FileText, Calendar, User, Shield } from 'lucide-react';

// Mock data - will be replaced with database calls
const retrospectives = [
  {
    id: 'rm-001',
    title: 'Phase III Oncology Trial - Enrollment Collapse at Community Sites',
    role: 'CRC',
    trialPhase: 'PHASE_III',
    therapeuticArea: '',
    failureType: 'ENROLLMENT_COLLAPSE',
    confidenceLevel: 'HIGH',
    whatFailed: 'Trial failed to enroll a single patient at 5 community sites over 6 months, despite promising feasibility reports.',
    earlyWarningSigns: [
      'Site feasibility overestimated patient pool by 300%',
      'Competing trials with similar criteria active at same sites',
      'Patient population already depleted by prior trials',
      'Sites lacked dedicated research staff',
      'No patient recruitment strategy provided'
    ],
    whatWouldDoDifferently: 'Would conduct real patient chart reviews during feasibility, not rely on site estimates. Would prioritize sites with proven recruitment in similar indications.',
    failureObviousAt: 'Month 3 - after zero enrollments across all sites',
    createdAt: '2024-01-20',
    status: 'APPROVED'
  },
  {
    id: 'rm-002',
    title: 'Phase II Cardiology Trial - Protocol Overload Leading to Site Withdrawal',
    role: 'PM',
    trialPhase: 'PHASE_II',
    therapeuticArea: '',
    failureType: 'PROTOCOL_OVERLOAD',
    confidenceLevel: 'HIGH',
    whatFailed: '2 of 8 sites withdrew from trial within 3 months, citing excessive protocol complexity and unmanageable workload.',
    earlyWarningSigns: [
      'Protocol document exceeded 150 pages',
      'More than 20 eligibility criteria',
      'Complex scheduling requirements conflicting with standard care',
      'Site coordinators unable to explain protocol to patients',
      'High rate of protocol deviations even before enrollment'
    ],
    whatWouldDoDifferently: 'Would involve site operators in protocol design phase. Would implement protocol complexity metrics and set clear limits.',
    failureObviousAt: 'Month 2 - first site withdrawal',
    createdAt: '2024-01-18',
    status: 'APPROVED'
  },
  {
    id: 'rm-003',
    title: 'Phase I Neurology Trial - Budget Insufficiency at Academic Site',
    role: 'SITE_DIRECTOR',
    trialPhase: 'PHASE_I',
    therapeuticArea: '',
    failureType: 'BUDGET_UNDERFUNDING',
    confidenceLevel: 'MEDIUM',
    whatFailed: 'Academic site unable to cover costs of complex procedures and dedicated staff time, leading to quality compromises and study delays.',
    earlyWarningSigns: [
      'Budget below published industry standards',
      'Multiple non-reimbursable procedures required',
      'No allowance for extra research coordinator time',
      'Site required to subsidize trial activities',
      'Multiple budget revision requests rejected'
    ],
    whatWouldDoDifferently: 'Would conduct thorough cost analysis before budgeting. Would include realistic staff time allocations and all procedure costs.',
    failureObviousAt: 'Month 4 - when site requested budget increase',
    createdAt: '2024-01-15',
    status: 'APPROVED'
  }
];

export default function RetrospectivesPage() {
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
                <div className="text-xs text-white/95 font-medium">Retrospective Library</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/patterns">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Patterns
                </Button>
              </Link>
              <Link href="/submit">
                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Retrospective
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">PRO ONLY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Retrospective Analysis Library
            </h1>
            <p className="text-xl text-white/90">
              Detailed failure reports from clinical trial operators. Search by role, phase, or failure type.
            </p>
          </div>
          <Link href="/pricing">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
              Upgrade to Pro
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search retrospectives..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500">
                <option value="">All Roles</option>
                <option value="CRC">CRC</option>
                <option value="CRA">CRA</option>
                <option value="PM">Project Manager</option>
                <option value="PI">Principal Investigator</option>
                <option value="SITE_DIRECTOR">Site Director</option>
              </select>
              <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500">
                <option value="">All Phases</option>
                <option value="PHASE_I">Phase I</option>
                <option value="PHASE_II">Phase II</option>
                <option value="PHASE_III">Phase III</option>
                <option value="PHASE_IV">Phase IV</option>
              </select>
              <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500">
                <option value="">All Failure Types</option>
                <option value="ENROLLMENT_COLLAPSE">Enrollment Collapse</option>
                <option value="PROTOCOL_OVERLOAD">Protocol Overload</option>
                <option value="BUDGET_UNDERFUNDING">Budget Underfunding</option>
                <option value="CRO_EXECUTION_FAILURE">CRO Execution Failure</option>
                <option value="SITE_SELECTION_MISMATCH">Site Selection Mismatch</option>
                <option value="AMENDMENT_CASCADE">Amendment Cascade</option>
                <option value="VENDOR_BREAKDOWN">Vendor Breakdown</option>
              </select>
            </div>
          </div>
        </div>

        {/* Retrospectives List */}
        <div className="space-y-6">
          {retrospectives.map((rm) => (
            <div key={rm.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/postmortems/${rm.id}`}>
                      <h3 className="text-xl font-bold text-white hover:text-red-400 transition-colors">
                        {rm.title}
                      </h3>
                    </Link>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs font-semibold text-blue-400">
                      {rm.role}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs font-semibold text-purple-400">
                      {rm.trialPhase.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 rounded text-xs font-semibold text-green-400">
                      {rm.therapeuticArea}
                    </span>
                    <span className="px-2 py-1 bg-red-500/20 rounded text-xs font-semibold text-red-400">
                      {rm.failureType.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Confidence Level */}
                <div className="flex items-center gap-1 text-white/70">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {rm.confidenceLevel}
                  </span>
                </div>
              </div>

              {/* Content Preview */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">What Failed:</h4>
                  <p className="text-white/90 text-sm">
                    {rm.whatFailed}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">Early Warning Signs:</h4>
                  <ul className="space-y-1">
                    {rm.earlyWarningSigns.slice(0, 3).map((sign, idx) => (
                      <li key={idx} className="text-white/80 text-sm flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                    {rm.earlyWarningSigns.length > 3 && (
                      <li className="text-white/60 text-sm italic">
                        +{rm.earlyWarningSigns.length - 3} more signs...
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white/70 mb-2">What I Would Do Differently:</h4>
                  <p className="text-white/90 text-sm">
                    {rm.whatWouldDoDifferently}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Failure obvious: {rm.failureObviousAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Submitted: {rm.createdAt}</span>
                    </div>
                  </div>

                  <Link href={`/postmortems/${rm.id}`}>
                    <Button variant="outline" size="sm" className="border-2 border-white/30 text-white hover:bg-white/10">
                      Read Full Retrospective
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (mock) */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" disabled className="border-2 border-white/30 text-white/50">
            Previous
          </Button>
          <Button variant="outline" className="border-2 border-white/30 text-white">
            Next
          </Button>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Have a failure to share?
            </h2>
            <p className="text-white/90 mb-6">
              Submit an anonymous retrospective analysis and help other operators avoid the same mistakes. All submissions are strictly anonymized.
            </p>
            <Link href="/submit">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                <FileText className="h-5 w-5 mr-2" />
                Submit Your Retrospective
              </Button>
            </Link>
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