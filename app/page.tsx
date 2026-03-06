import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Vote, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  AlertTriangle,
  BookOpen,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">BehindTheProtocol</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/threads" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Discussions
              </Link>
              <Link href="/polls" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Reality Checks
              </Link>
              <Link href="/rooms" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Trial Rooms
              </Link>
              <Link href="/cases" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Case Drops
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="btn-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300 mb-8">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>100% Anonymous • Career-Safe • Real Answers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-100">Where Clinical Trial Operators</span>
              <br />
              <span className="text-gradient">Tell the Truth</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              The anonymous intelligence network for CRA, CRC, Site Directors, and PMs. 
              Share experiences, get real answers, and navigate the field—without risking your career.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/threads/new">
                <Button className="btn-primary text-lg px-8 py-6 h-auto">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask a Question
                </Button>
              </Link>
              <Link href="/polls/new">
                <Button variant="outline" className="btn-secondary text-lg px-8 py-6 h-auto">
                  <Vote className="w-5 h-5 mr-2" />
                  Run a Reality Check
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">2,400+</div>
                <div className="text-sm text-slate-500">Operators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">8,500+</div>
                <div className="text-sm text-slate-500">Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">1,200+</div>
                <div className="text-sm text-slate-500">Reality Checks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Built for the Reality of Clinical Trials
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Features designed around the actual challenges operators face—enrollment pressure, 
              protocol burden, sponsor expectations, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card p-6 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Assist Threads</h3>
              <p className="text-slate-400 text-sm">
                Post operational challenges with structured metadata. Get help from operators 
                who've been there—completely anonymously.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 hover:border-purple-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Vote className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Reality Check Polls</h3>
              <p className="text-slate-400 text-sm">
                Ask "Is this normal?" and get rapid, anonymous feedback. Find out if your 
                experience matches the field's reality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 hover:border-emerald-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Same Situation</h3>
              <p className="text-slate-400 text-sm">
                See how many others are facing the same issue. Know you're not alone—without 
                revealing who you are.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Urgent Help Channel</h3>
              <p className="text-slate-400 text-sm">
                Critical issues get priority visibility. Flag enrollment emergencies, 
                safety concerns, or time-sensitive problems.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-6 hover:border-rose-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Weekly Digest</h3>
              <p className="text-slate-400 text-sm">
                Curated weekly summary of emerging patterns, top discussions, and 
                field-wide trends delivered to your inbox.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-6 hover:border-slate-400/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-slate-500/10 flex items-center justify-center mb-4 group-hover:bg-slate-500/20 transition-colors">
                <BookOpen className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Lessons Learned</h3>
              <p className="text-slate-400 text-sm">
                Browse the collective knowledge base. Extract insights from thousands 
                of real-world trial experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Type Rooms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Trial Type Rooms
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Micro-communities focused on specific trial types. Connect with operators 
              facing similar challenges in your area of expertise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Oncology Trials", count: 847, color: "cyan" },
              { name: "Rare Disease", count: 342, color: "purple" },
              { name: "Device Trials", count: 529, color: "emerald" },
              { name: "Early Phase", count: 289, color: "amber" },
              { name: "Academic Trials", count: 198, color: "rose" },
              { name: "CNS/Neurology", count: 421, color: "cyan" },
              { name: "Cardiovascular", count: 356, color: "purple" },
              { name: "Pediatric", count: 234, color: "emerald" },
            ].map((room) => (
              <Link 
                key={room.name}
                href={`/rooms/${room.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="glass-card p-4 hover:border-slate-600 transition-all flex items-center justify-between group"
              >
                <span className="text-slate-200 group-hover:text-white transition-colors">
                  {room.name}
                </span>
                <span className={`text-sm text-${room.color}-400`}>
                  {room.count} members
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Complete Anonymity, Guaranteed
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Your career safety is our priority. Here's how we protect your identity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Auto-Generated Handles</h3>
              <p className="text-slate-400 text-sm">
                No real names, no employer info, no location data. You get an anonymous 
                handle like Operator_2847 or CRA_1523.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">No IP Logging</h3>
              <p className="text-slate-400 text-sm">
                We never store IP addresses or track your location. Your activity 
                cannot be traced back to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Content Protection</h3>
              <p className="text-slate-400 text-sm">
                Sponsor names, protocol IDs, and site identifiers are automatically 
                masked to prevent identification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Connect with thousands of clinical trial operators sharing real experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button className="btn-primary text-lg px-8 py-6 h-auto">
                Create Anonymous Account
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            No email verification required. Takes 10 seconds.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-300">BehindTheProtocol</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link href="/guidelines" className="hover:text-slate-300 transition-colors">Guidelines</Link>
            </nav>
          </div>
          <div className="text-center text-sm text-slate-600 mt-8">
            © 2024 BehindTheProtocol. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}