import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, 
  Clock,
  Shield,
  Users,
  TrendingUp,
  Plus,
  CheckCircle2
} from "lucide-react";

// Mock data
const mockPolls = [
  {
    id: "1",
    question: "Has your site experienced unexpected enrollment pressure from sponsors this quarter?",
    trialPhase: "Phase 3",
    therapeuticArea: "Oncology",
    options: [
      { label: "Yes, significant pressure", votes: 234, percentage: 47 },
      { label: "Similar but less severe", votes: 156, percentage: 31 },
      { label: "No, targets are reasonable", votes: 108, percentage: 22 },
    ],
    totalVotes: 498,
    endsIn: "18 hours",
    createdAt: "6 hours ago",
    author: "CRA_2915"
  },
  {
    id: "2",
    question: "Are you seeing an increase in protocol amendments mid-study?",
    trialPhase: "Phase 2",
    therapeuticArea: "All Areas",
    options: [
      { label: "Yes, more than 3 amendments", votes: 189, percentage: 38 },
      { label: "Similar, 1-2 amendments", votes: 203, percentage: 41 },
      { label: "No, protocols are stable", votes: 105, percentage: 21 },
    ],
    totalVotes: 497,
    endsIn: "2 days",
    createdAt: "1 day ago",
    author: "PM_3927"
  },
  {
    id: "3",
    question: "Is your CRO adequately translating sponsor expectations to sites?",
    trialPhase: "All Phases",
    therapeuticArea: "All Areas",
    options: [
      { label: "Yes, communication is clear", votes: 87, percentage: 17 },
      { label: "Similar issues, manageable", votes: 178, percentage: 36 },
      { label: "No, significant gaps", votes: 234, percentage: 47 },
    ],
    totalVotes: 499,
    endsIn: "3 days",
    createdAt: "2 days ago",
    author: "SiteLead_1742"
  },
  {
    id: "4",
    question: "Has patient retention dropped after recent protocol changes?",
    trialPhase: "Phase 3",
    therapeuticArea: "Rare Disease",
    options: [
      { label: "Yes, significant drop", votes: 145, percentage: 29 },
      { label: "Similar, slight decrease", votes: 198, percentage: 40 },
      { label: "No, retention is stable", votes: 156, percentage: 31 },
    ],
    totalVotes: 499,
    endsIn: "5 days",
    createdAt: "3 days ago",
    author: "CRC_4832"
  },
];

export default function PollsPage() {
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
              <Link href="/polls" className="text-cyan-400">Reality Checks</Link>
              <Link href="/rooms" className="text-slate-400 hover:text-cyan-400 transition-colors">Trial Rooms</Link>
              <Link href="/cases" className="text-slate-400 hover:text-cyan-400 transition-colors">Case Drops</Link>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Reality Check Polls</h1>
            <p className="text-slate-400">Anonymous polls to understand what's really happening in the field</p>
          </div>
          <Link href="/polls/new">
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-4 mb-6 border-purple-500/20 bg-purple-500/5">
          <div className="flex items-start gap-3">
            <Vote className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-300 font-medium">How Reality Checks Work</p>
              <p className="text-sm text-slate-400">
                Ask "Is this normal?" and get rapid, anonymous feedback. See if your experience matches the field's reality.
                All votes are anonymous and aggregated.
              </p>
            </div>
          </div>
        </div>

        {/* Polls Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockPolls.map((poll) => (
            <div key={poll.id} className="glass-card p-6 hover:border-purple-500/50 transition-all">
              {/* Metadata */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {poll.trialPhase}
                  </span>
                  <span>•</span>
                  <span>{poll.therapeuticArea}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{poll.endsIn} left</span>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                {poll.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {poll.options.map((option, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{option.label}</span>
                      <span className="text-slate-400">{option.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="w-4 h-4" />
                  <span>{poll.totalVotes} votes</span>
                </div>
                <Link href={`/polls/${poll.id}`}>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    Vote Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="btn-secondary">
            Load More Polls
          </Button>
        </div>
      </div>
    </div>
  );
}