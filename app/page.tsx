import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, BookOpen, Shield, ArrowRight, CheckCircle2, Database, Zap, Eye, FileText, Users, Lightbulb } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">CTFI</div>
                <div className="text-xs text-white/95 font-medium">Clinical Trial Failure Intelligence</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/patterns">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Browse Patterns
                </Button>
              </Link>
              <Link href="/urgent-help">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Expert Help
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Pricing
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/pricing">
                <Button className="bg-white text-slate-900 hover:bg-white/90 font-semibold">
                  Check Your Footing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-red-500/30">
            <span className="text-base md:text-lg font-semibold text-red-400">You're not reporting a failure. You're checking your footing.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Think clearly, safely, and anonymously
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              when something feels off.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            CTFI exists to help clinical trial operators check their footing — before it becomes official, documented, or career-limiting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-8 py-6 rounded-xl shadow-2xl border-0">
                <BookOpen className="h-5 w-5 mr-2 text-white" />
                Check Your Footing
              </Button>
            </Link>
            <Link href="/urgent-help">
              <Button size="lg" variant="outline" className="border-2 border-white/70 bg-white/5 hover:bg-white/20 text-white text-lg px-8 py-6 rounded-xl">
                <Zap className="h-5 w-5 mr-2 text-white" />
                <span className="text-white font-semibold">Get Expert Help</span>
              </Button>
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/patterns">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-base px-6 py-4 rounded-xl shadow-lg border-0 font-semibold">
                <Database className="h-4 w-4 mr-2 text-white" />
                Browse 12 Patterns
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline" className="border-2 border-white/70 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 text-white text-base px-6 py-4 rounded-xl font-semibold">
                <FileText className="h-4 w-4 mr-2 text-white" />
                Share What You Know
              </Button>
            </Link>
          </div>

          {/* Feature Indicators - Anonymity Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-white text-sm">No Identification</span>
              </div>
              <p className="text-xs text-white/90">You will never be asked to identify yourself</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-white text-sm">No Sharing</span>
              </div>
              <p className="text-xs text-white/90">Nothing shared upward, outward, or in real time</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-white text-sm">Purpose</span>
              </div>
              <p className="text-xs text-white/90">This space exists only to help you decide what comes next</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-white text-sm">No Judgment</span>
              </div>
              <p className="text-xs text-white/90">We do not judge performance or assign blame</p>
            </div>
          </div>

          {/* Assist Prompts */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">When should you use CTFI?</h3>
            <div className="space-y-3 text-white/90 text-left">
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">What changed recently that made you pause?</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">What feels harder than it should right now?</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">What question are you hesitating to ask out loud?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All 12 Patterns */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">12 Official Failure Patterns</h2>
            <p className="text-white/90">Real patterns extracted from trial failures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pattern 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Protocol Overload Drift</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs font-semibold">
                  High Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enrollment Assumption Collapse</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-purple-500/20 rounded text-purple-400 text-xs font-semibold">
                  Very High Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Silent Site Strain</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs font-semibold">
                  High Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 4 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Budget Starvation Lag</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-amber-500/20 rounded text-amber-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 5 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">PI Bandwidth Failure</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 6 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CRO Translation Breakdown</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-indigo-500/20 rounded text-indigo-400 text-xs font-semibold">
                  High Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 7 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Amendment Cascade Fatigue</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-pink-500/20 rounded text-pink-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 8 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Monitoring Signal Suppression</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-teal-500/20 rounded text-teal-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 9 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Recruitment Vendor Mismatch</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 10 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Data Burden Accumulation</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-slate-500/20 rounded text-slate-400 text-xs font-semibold">
                  Low Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 11 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Decision Latency Lock</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-rose-500/20 rounded text-rose-400 text-xs font-semibold">
                  Medium Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>

            {/* Pattern 12 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Compliance-by-Workaround</h3>
              <p className="text-white/90 text-sm mb-4">
                <span className="inline-block px-2 py-1 bg-yellow-500/20 rounded text-yellow-400 text-xs font-semibold">
                  Low Frequency
                </span>
              </p>
              <p className="text-white/70 text-xs italic">
                Early strain absorbed locally until escalation becomes unsafe
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/patterns">
              <Button variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10">
                View Pattern Details <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why CTFI Exists</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Clinical trials fail repeatedly for the same reasons. Operators know what actually fails, but they can't talk about it openly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                The Problem
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Operators fear retaliation or career damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Sponsors don't want to hear about failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Lessons die with each trial that fails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Each new team repeats the same mistakes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                The Solution
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Strict anonymity protects contributors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>12 documented failure patterns with early warning signs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Patterns synthesized from multiple failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Expert-on-call for urgent situations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check your footing. Safely and anonymously.
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join clinical trial operators learning from failure intelligence.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-2xl">
              <BookOpen className="h-5 w-5 mr-2" />
              Get Pro Access for $29/month
            </Button>
          </Link>
          <p className="text-white/80 text-sm mt-4">
            Cancel anytime. Full access to all 12 patterns and retrospective analyses.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
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