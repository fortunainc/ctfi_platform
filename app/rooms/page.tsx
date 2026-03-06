import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Users,
  Search,
  Filter,
  TrendingUp,
  Activity
} from "lucide-react";

// Mock data
const trialTypeRooms = [
  {
    id: "oncology",
    name: "Oncology Trials",
    description: "Discuss oncology study challenges: enrollment criteria, biomarker testing, protocol complexity, and more.",
    memberCount: 847,
    threadCount: 1234,
    recentActivity: "15 min ago",
    color: "cyan",
    tags: ["Phase 1", "Phase 2", "Phase 3", "Solid Tumor", "Hematology"],
  },
  {
    id: "rare-disease",
    name: "Rare Disease Trials",
    description: "Rare disease research challenges: small patient pools, global site coordination, regulatory hurdles.",
    memberCount: 342,
    threadCount: 567,
    recentActivity: "32 min ago",
    color: "purple",
    tags: ["Orphan Drugs", "Global Sites", "Patient Advocacy", "Natural History"],
  },
  {
    id: "device-trials",
    name: "Device Trials",
    description: "Medical device research: IDE studies, FDA requirements, unique monitoring approaches, site training.",
    memberCount: 529,
    threadCount: 892,
    recentActivity: "8 min ago",
    color: "emerald",
    tags: ["IDE", "510(k)", "FDA", "Site Certification", "Training"],
  },
  {
    id: "early-phase",
    name: "Early Phase Trials",
    description: "Phase 1 and Phase 1/2 studies: first-in-human safety, dose escalation, PK/PD studies.",
    memberCount: 289,
    threadCount: 423,
    recentActivity: "45 min ago",
    color: "amber",
    tags: ["Phase 1", "First-in-Human", "Dose Escalation", "PK/PD", "Safety"],
  },
  {
    id: "academic",
    name: "Academic Trials",
    description: "Academic medical center challenges: competing priorities, IRB processes, faculty coordination.",
    memberCount: 198,
    threadCount: 312,
    recentActivity: "1 hour ago",
    color: "rose",
    tags: ["AMC", "IRB", "Faculty", "Grant-funded", "NIH"],
  },
  {
    id: "cns",
    name: "CNS/Neurology Trials",
    description: "Central nervous system studies: neuropsych testing, compliance challenges, specialized endpoints.",
    memberCount: 421,
    threadCount: 678,
    recentActivity: "23 min ago",
    color: "cyan",
    tags: ["Alzheimer's", "Parkinson's", "Neuropsych Testing", "Compliance"],
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular Trials",
    description: "Cardiac and vascular studies: imaging requirements, procedure coordination, safety monitoring.",
    memberCount: 356,
    threadCount: 534,
    recentActivity: "52 min ago",
    color: "purple",
    tags: ["Imaging", "ECG", "Safety", "Procedure Coordination"],
  },
  {
    id: "pediatric",
    name: "Pediatric Trials",
    description: "Pediatric research challenges: consent processes, age-appropriate assessments, parent engagement.",
    memberCount: 234,
    threadCount: 389,
    recentActivity: "2 hours ago",
    color: "emerald",
    tags: ["Pediatrics", "Consent", "Assent", "Age-appropriate", "Parent Engagement"],
  },
];

const colorMap = {
  cyan: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20",
  purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
  emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
  amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
  rose: "from-rose-500/10 to-rose-600/5 border-rose-500/20",
};

export default function RoomsPage() {
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
              <Link href="/rooms" className="text-cyan-400">Trial Rooms</Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Trial Type Rooms</h1>
          <p className="text-slate-400">
            Micro-communities focused on specific trial types. Connect with operators facing similar challenges.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-2.5"
                />
              </div>
            </div>
            <select className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5">
              <option>All Categories</option>
              <option>Oncology</option>
              <option>Rare Disease</option>
              <option>Device Trials</option>
              <option>Early Phase</option>
              <option>Academic</option>
            </select>
            <select className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5">
              <option>Most Members</option>
              <option>Most Active</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">8</div>
            <div className="text-sm text-slate-500">Active Rooms</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">3,216</div>
            <div className="text-sm text-slate-500">Members</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">5,029</div>
            <div className="text-sm text-slate-500">Discussions</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">142</div>
            <div className="text-sm text-slate-500">Active Today</div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {trialTypeRooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className={`glass-card p-6 hover:border-cyan-500/50 transition-all bg-gradient-to-br ${colorMap[room.color as keyof typeof colorMap]}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {room.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-4">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">{room.recentActivity}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>{room.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{room.threadCount} threads</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {room.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-800/50 text-slate-400 text-xs">
                    {tag}
                  </Badge>
                ))}
                {room.tags.length > 4 && (
                  <Badge variant="secondary" className="bg-slate-800/50 text-slate-400 text-xs">
                    +{room.tags.length - 4}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Don't see your trial type?
            </h3>
            <p className="text-slate-400 mb-4">
              Suggest a new trial type room and we'll create it if there's enough interest.
            </p>
            <Button variant="outline" className="btn-secondary">
              Suggest a Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}