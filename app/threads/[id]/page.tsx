"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  ArrowLeft,
  Clock,
  Users,
  MessageSquare,
  ThumbsUp,
  Star,
  Share2,
  Bell,
  BellOff,
  AlertTriangle,
  CheckCircle2,
  MoreVertical
} from "lucide-react";

// Mock data
const mockThread = {
  id: "1",
  title: "Sponsor is pushing for 20% enrollment increase month over month—is this realistic?",
  trialPhase: "Phase 3",
  therapeuticArea: "Oncology",
  siteCountRange: "50-100",
  issueCategory: "Sponsor expectations",
  urgencyLevel: "Critical",
  description: `Our sponsor just came back with revised enrollment targets. We're already hitting 85% of original targets, which we thought was solid. But now they want 20% month-over-month increase.

The sites are already stretched thin. We've got CRCs working overtime, and monitor visits have increased 2x in the past quarter. I'm getting pushback from multiple site leads about the feasibility.

Has anyone successfully negotiated these types of expectations? What data or arguments worked for you?`,
  additionalContext: "This is a global study with 87 sites across US, EU, and APAC regions. Protocol has had 3 amendments in the past 8 months.",
  sameSituationCount: 47,
  replyCount: 23,
  createdAt: "2 hours ago",
  author: "CRC_4832",
};

const mockReplies = [
  {
    id: "1",
    content: `We faced something similar on a Phase 3 diabetes study last year. Here's what worked for us:

1. **Document everything** - We created a detailed feasibility report showing actual enrollment rates vs. targets, with breakdowns by region and site type.

2. **Present alternatives** - Instead of pushing back outright, we proposed a phased approach: 10% increase for Q1 with a review checkpoint.

3. **Bring in the PI network** - Our medical director got key PIs to voice concerns directly. That carried more weight than our operational data.

The sponsor eventually agreed to a 12% increase with a quarterly review. Key was making it their decision, not our refusal.`,
    author: "SiteLead_1742",
    authorRole: "Site Lead",
    reputation: "Senior Operator",
    createdAt: "1 hour ago",
    helpfulCount: 18,
    isMostHelpful: true,
  },
  {
    id: "2",
    content: `Quick addition to what SiteLead_1742 said - we also found it helpful to bring in the data management team. They showed that the increased enrollment pressure was leading to more queries and data quality issues.

Sometimes sponsors don't see the downstream impact on data integrity. That argument can be more persuasive than operational feasibility.`,
    author: "CRA_2915",
    authorRole: "CRA",
    reputation: "Experienced Operator",
    createdAt: "45 min ago",
    helpfulCount: 8,
    isMostHelpful: false,
  },
  {
    id: "3",
    content: `We're in a similar situation right now. Same sponsor? 😅

In all seriousness, the 3 amendments in 8 months is a red flag. That level of protocol churn plus enrollment pressure suggests they're behind on their own timelines.

Might be worth understanding what's driving the urgency from their side - regulatory milestones, competitive pressure, etc. That context could help you negotiate.`,
    author: "PM_3927",
    authorRole: "Project Manager",
    reputation: "Operator",
    createdAt: "30 min ago",
    helpfulCount: 5,
    isMostHelpful: false,
  },
];

const urgencyColors: Record<string, string> = {
  Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Urgent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Needs Advice": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Normal: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const reputationColors: Record<string, string> = {
  "Trusted Contributor": "text-emerald-400",
  "Field Expert": "text-purple-400",
  "Senior Operator": "text-cyan-400",
  "Experienced Operator": "text-amber-400",
  "Operator": "text-slate-400",
};

export default function ThreadDetailPage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasSameSituation, setHasSameSituation] = useState(false);
  const [sameSituationCount, setSameSituationCount] = useState(mockThread.sameSituationCount);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSameSituation = () => {
    if (!hasSameSituation) {
      setSameSituationCount(prev => prev + 1);
      setHasSameSituation(true);
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Will be replaced with API call
    setTimeout(() => {
      setReplyContent("");
      setIsSubmitting(false);
    }, 1000);
  };

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/threads" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </Link>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Thread Card */}
            <div className="glass-card p-6">
              {/* Urgency Badge */}
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${urgencyColors[mockThread.urgencyLevel]} border`}>
                  {mockThread.urgencyLevel === "Critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
                  {mockThread.urgencyLevel}
                </Badge>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {mockThread.createdAt}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-slate-100 mb-4">
                {mockThread.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                  {mockThread.trialPhase}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                  {mockThread.therapeuticArea}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                  {mockThread.siteCountRange} sites
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{mockThread.issueCategory}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                <span className="text-cyan-400 font-medium">{mockThread.author}</span>
                <span>posted this</span>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-slate max-w-none mb-6">
                <div className="whitespace-pre-line text-slate-300">
                  {mockThread.description}
                </div>
              </div>

              {/* Additional Context */}
              {mockThread.additionalContext && (
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-6">
                  <p className="text-sm text-slate-400 font-medium mb-1">Additional Context</p>
                  <p className="text-sm text-slate-300">{mockThread.additionalContext}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                <Button
                  variant="outline"
                  className={`border-slate-700 ${hasSameSituation ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'text-slate-300'}`}
                  onClick={handleSameSituation}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {hasSameSituation ? "Experiencing This" : "Same Situation"}
                </Button>
                <Button
                  variant="outline"
                  className={`border-slate-700 ${isFollowing ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'text-slate-300'}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? <BellOff className="w-4 h-4 mr-2" /> : <Bell className="w-4 h-4 mr-2" />}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Same Situation Counter */}
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-300">
                  <span className="font-semibold text-cyan-400">{sameSituationCount}</span> operators experiencing the same issue
                </span>
              </div>
            </div>

            {/* Replies Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {mockReplies.length} Replies
              </h2>

              {mockReplies.map((reply) => (
                <div 
                  key={reply.id} 
                  className={`glass-card p-5 ${reply.isMostHelpful ? 'border-emerald-500/30 bg-emerald-500/5' : ''}`}
                >
                  {reply.isMostHelpful && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm mb-3">
                      <Star className="w-4 h-4 fill-emerald-400" />
                      <span className="font-medium">Most Helpful Answer</span>
                    </div>
                  )}
                  
                  <div className="prose prose-invert prose-slate max-w-none mb-4">
                    <div className="whitespace-pre-line text-slate-300">
                      {reply.content}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className={`font-medium ${reputationColors[reply.reputation]}`}>
                        {reply.author}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-sm text-slate-500">{reply.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {reply.helpfulCount}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Add Your Reply</h3>
              <form onSubmit={handleSubmitReply} className="space-y-4">
                <Textarea
                  placeholder="Share your experience or advice..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="input-field min-h-[120px]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Posting as <span className="text-cyan-400">Operator_XXXX</span>
                  </p>
                  <Button type="submit" className="btn-primary" disabled={isSubmitting || !replyContent.trim()}>
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thread Stats */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Thread Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Replies</span>
                  <span className="text-slate-100 font-semibold">{mockThread.replyCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Same Situation</span>
                  <span className="text-cyan-400 font-semibold">{sameSituationCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Created</span>
                  <span className="text-slate-100">{mockThread.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Trial Info */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Trial Context</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500 block">Phase</span>
                  <span className="text-slate-200">{mockThread.trialPhase}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Therapeutic Area</span>
                  <span className="text-slate-200">{mockThread.therapeuticArea}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Site Count</span>
                  <span className="text-slate-200">{mockThread.siteCountRange} sites</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Issue Category</span>
                  <span className="text-slate-200">{mockThread.issueCategory}</span>
                </div>
              </div>
            </div>

            {/* Related Rooms */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Related Rooms</h3>
              <div className="space-y-2">
                <Link href="/rooms/oncology-trials" className="block p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <span className="text-slate-200">Oncology Trials</span>
                  <span className="text-sm text-slate-500 block">847 members</span>
                </Link>
                <Link href="/rooms/phase-3-trials" className="block p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <span className="text-slate-200">Phase 3 Trials</span>
                  <span className="text-sm text-slate-500 block">523 members</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}