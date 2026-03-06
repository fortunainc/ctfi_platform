import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  BookOpen,
  Clock,
  MessageSquare,
  TrendingUp,
  Hash,
  ArrowRight
} from "lucide-react";

// Mock data
const caseDrops = [
  {
    id: "1",
    caseNumber: "#487",
    title: "Silent Site Strain: When 80% of Sites Drop Below Enrollment Baseline",
    phase: "Phase 3",
    protocolIssue: "Unexpected enrollment collapse across global sites after sponsor-mandated protocol amendment",
    outcome: "Sites unionized and collectively paused enrollment. Study delayed 8 months. Sponsor renegotiated budget with 15% increase for additional resources.",
    discussionThread: "Thread with 87 responses",
    discussionLink: "/threads/487",
    droppedAt: "2 days ago",
    impact: "High",
    therapeuticArea: "Oncology",
  },
  {
    id: "2",
    caseNumber: "#486",
    title: "Amendment Cascade: 7 Protocol Changes in 6 Months Paralyze Site Operations",
    phase: "Phase 2",
    protocolIssue: "Sponsor requested sequential amendments based on interim data without assessing operational impact",
    outcome: "Top 3 sites left the study. CRO stepped in as independent mediator. Protocol was reset to original version with 6-month freeze on amendments.",
    discussionThread: "Thread with 62 responses",
    discussionLink: "/threads/486",
    droppedAt: "5 days ago",
    impact: "Critical",
    therapeuticArea: "Rare Disease",
  },
  {
    id: "3",
    caseNumber: "#485",
    title: "Budget Pressure Redux: 25% Mid-Study Cut Threatens Data Quality",
    phase: "Phase 3",
    protocolIssue: "Corporate budget reallocation resulted in sudden funding reduction for ongoing studies",
    outcome: "Sites threatened to pause patient visits. Sponsor approved partial restoration of budget with requirement to demonstrate operational efficiency improvements first.",
    discussionThread: "Thread with 103 responses",
    discussionLink: "/threads/485",
    droppedAt: "1 week ago",
    impact: "High",
    therapeuticArea: "Cardiovascular",
  },
  {
    id: "4",
    caseNumber: "#484",
    title: "Enrollment Assumption Failure: Site Selection Based on Flawed Feasibility Data",
    phase: "Phase 1/2",
    protocolIssue: "Feasibility study sites claimed patient pools that didn't exist. 60% of sites failed to enroll first patient within 6 months.",
    outcome: "Study terminated early. Sponsor lost $18M. Major overhaul of feasibility process. Now requires site audit before activation.",
    discussionThread: "Thread with 45 responses",
    discussionLink: "/threads/484",
    droppedAt: "2 weeks ago",
    impact: "Critical",
    therapeuticArea: "CNS/Neurology",
  },
  {
    id: "5",
    caseNumber: "#483",
    title: "CRO Translation Breakdown: Critical Safety Information Lost in Handoff",
    phase: "Phase 3",
    protocolIssue: "CRO failed to communicate urgent safety concern from sponsor to sites for 3 weeks. Multiple SAEs occurred during gap.",
    outcome: "Regulatory investigation opened. CRO contract terminated. Direct sponsor-to-site communication channel established for safety issues.",
    discussionThread: "Thread with 156 responses",
    discussionLink: "/threads/483",
    droppedAt: "2 weeks ago",
    impact: "Critical",
    therapeuticArea: "Immunology",
  },
  {
    id: "6",
    caseNumber: "#482",
    title: "Monitoring Signal Suppression: CRA Discrepancies Flagged but Not Escalated",
    phase: "Phase 2",
    protocolIssue: "Multiple CRAs flagged data quality issues. CRO management filtered reports to avoid raising concerns with sponsor.",
    outcome: "FDA inspection found significant GCP violations. Study placed on partial clinical hold. Complete audit and remediation required.",
    discussionThread: "Thread with 89 responses",
    discussionLink: "/threads/482",
    droppedAt: "3 weeks ago",
    impact: "Critical",
    therapeuticArea: "Device Trials",
  },
];

const impactColors: Record<string, string> = {
  Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  High: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Medium: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">BehindTheProtocol</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/threads" className="text-slate-400 hover:text-cyan-400 transition-colors">Discussions</Link>
              <Link href="/polls" className="text-slate-400 hover:text-cyan-400 transition-colors">Reality Checks</Link>
              <Link href="/rooms" className="text-slate-400 hover:text-cyan-400 transition-colors">Trial Rooms</Link>
              <Link href="/cases" className="text-cyan-400">Case Drops</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="btn-primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-slate-100">Case Drops</h1>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Weekly anonymous case studies from the field. Real stories about what really happens in clinical trials—the good, the bad, and the ugly.
          </p>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-4 mb-6 border-cyan-500/20 bg-cyan-500/5">
          <div className="flex items-start gap-3">
            <Hash className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-300 font-medium">What Are Case Drops?</p>
              <p className="text-sm text-slate-400">
                Detailed case studies submitted anonymously. Each includes the phase, protocol issue, what happened (the outcome), and links to full discussions.
                Learn from others' experiences without revealing identities.
              </p>
            </div>
          </div>
        </div>

        {/* Case Drops Grid */}
        <div className="space-y-6">
          {caseDrops.map((caseDrop) => (
            <div key={caseDrop.id} className="glass-card p-6 hover:border-cyan-500/30 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <Badge className={impactColors[caseDrop.impact as keyof typeof impactColors] + " border"}>
                    {caseDrop.impact} Impact
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                    {caseDrop.caseNumber}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{caseDrop.droppedAt}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-100 mb-4">
                {caseDrop.title}
              </h3>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                {/* Phase & TA */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Phase:</span>
                    <span className="text-slate-200 font-medium">{caseDrop.phase}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Therapeutic Area:</span>
                    <span className="text-slate-200 font-medium">{caseDrop.therapeuticArea}</span>
                  </div>
                </div>

                {/* Protocol Issue */}
                <div>
                  <span className="text-sm text-slate-500 block mb-1">Protocol Issue</span>
                  <p className="text-sm text-slate-300 line-clamp-2">
                    {caseDrop.protocolIssue}
                  </p>
                </div>
              </div>

              {/* Outcome */}
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-4">
                <span className="text-sm text-slate-500 block mb-1">Outcome</span>
                <p className="text-sm text-slate-300">
                  {caseDrop.outcome}
                </p>
              </div>

              {/* Discussion Link */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-400">{caseDrop.discussionThread}</span>
                </div>
                <Link href={caseDrop.discussionLink}>
                  <Button variant="outline" className="btn-secondary">
                    Read Discussion
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="btn-secondary">
            Load More Cases
          </Button>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Have a Case to Share?
            </h3>
            <p className="text-slate-400 mb-4">
              Submit your anonymous case study and help others learn from your experience.
              All cases are vetted and anonymized before publication.
            </p>
            <Button className="btn-primary">
              Submit a Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}