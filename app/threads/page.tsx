import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Clock,
  Filter,
  Plus,
  TrendingUp,
  Flame,
  AlertTriangle,
  ArrowUpRight,
  Shield
} from "lucide-react";

// Mock data - will be replaced with API calls
const mockThreads = [
  {
    id: "1",
    title: "Sponsor is pushing for 20% enrollment increase month over month—is this realistic?",
    trialPhase: "Phase 3",
    therapeuticArea: "Oncology",
    siteCountRange: "50-100",
    issueCategory: "Sponsor expectations",
    urgencyLevel: "Critical",
    description: "Our sponsor just came back with revised targets. We're already hitting 85% of original targets, but they want 20% MoM increase. Has anyone successfully negotiated these expectations?",
    replyCount: 23,
    sameSituationCount: 47,
    createdAt: "2 hours ago",
    author: "CRC_4832"
  },
  {
    id: "2",
    title: "Site refusing to implement new remote monitoring software",
    trialPhase: "Phase 2",
    therapeuticArea: "Cardiovascular",
    siteCountRange: "10-25",
    issueCategory: "Monitoring conflicts",
    urgencyLevel: "Urgent",
    description: "Key PI says new eTMF and remote monitoring violates their workflow. Already delayed primary endpoint data submission. How to handle?",
    replyCount: 15,
    sameSituationCount: 32,
    createdAt: "4 hours ago",
    author: "CRA_2915"
  },
  {
    id: "3",
    title: "Patient retention dropping after protocol amendment",
    trialPhase: "Phase 3",
    therapeuticArea: "Rare Disease",
    siteCountRange: "5-10",
    issueCategory: "Patient retention",
    urgencyLevel: "Normal",
    description: "Amendment added 5 more procedures per visit. Two sites reporting 40% dropout in past month. Is this normal?",
    replyCount: 31,
    sameSituationCount: 19,
    createdAt: "6 hours ago",
    author: "SiteLead_1742"
  },
  {
    id: "4",
    title: "CRO not translating sponsor expectations to sites correctly",
    trialPhase: "Phase 2",
    therapeuticArea: "CNS",
    siteCountRange: "25-50",
    issueCategory: "CRO communication",
    urgencyLevel: "Needs Advice",
    description: "Sites are confused about primary endpoint window. CRO says one thing, sponsor says another. Getting caught in middle.",
    replyCount: 8,
    sameSituationCount: 12,
    createdAt: "8 hours ago",
    author: "PM_3927"
  },
  {
    id: "5",
    title: "Budget cut from sponsor mid-study—how to prioritize?",
    trialPhase: "Phase 3",
    therapeuticArea: "Oncology",
    siteCountRange: "100+",
    issueCategory: "Budget",
    urgencyLevel: "Urgent",
    description: "Sponsor just announced 30% budget reduction for remainder of study. Need to keep critical endpoints, but which non-critical activities can we cut?",
    replyCount: 42,
    sameSituationCount: 28,
    createdAt: "12 hours ago",
    author: "CRA_8532"
  },
];

const urgencyColors: Record<string, string> = {
  Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Urgent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Needs Advice": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Normal: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function ThreadsPage() {
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
              <Link href="/threads" className="text-cyan-400">Discussions</Link>
              <Link href="/polls" className="text-slate-400 hover:text-cyan-400 transition-colors">Reality Checks</Link>
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
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Discussions</h1>
            <p className="text-slate-400">Anonymous threads from clinical trial operators</p>
          </div>
          <Link href="/threads/new">
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Sort:</span>
              <select className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-sm">
                <option>Trending</option>
                <option>Most Active</option>
                <option>Urgent</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Trial Type:</span>
              <select className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-sm">
                <option>All Rooms</option>
                <option>Oncology Trials</option>
                <option>Rare Disease</option>
                <option>Device Trials</option>
                <option>Early Phase</option>
                <option>Academic Trials</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Urgency:</span>
              <select className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-sm">
                <option>All</option>
                <option>Critical</option>
                <option>Urgent</option>
                <option>Needs Advice</option>
                <option>Normal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Threads Grid */}
        <div className="space-y-4">
          {mockThreads.map((thread) => (
            <Link 
              key={thread.id} 
              href={`/threads/${thread.id}`}
              className="glass-card p-6 hover:border-cyan-500/50 transition-all group block"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Urgency Badge */}
                <div className="flex-shrink-0">
                  <Badge className={`${urgencyColors[thread.urgencyLevel]} border`}>
                    {thread.urgencyLevel === "Critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {thread.urgencyLevel}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {thread.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                    {thread.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                      {thread.trialPhase}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                      {thread.therapeuticArea}
                    </span>
                    <span>•</span>
                    <span>{thread.issueCategory}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {thread.createdAt}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2 lg:min-w-[120px] text-sm">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{thread.sameSituationCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                    <span>{thread.replyCount}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="btn-secondary">
            Load More Discussions
          </Button>
        </div>
      </div>
    </div>
  );
}