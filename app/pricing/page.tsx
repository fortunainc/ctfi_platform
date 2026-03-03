import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Lock, Zap, BookOpen, Database, Shield } from 'lucide-react';

export default function PricingPage() {
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
                <div className="text-xs text-white/95 font-medium">Pricing</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/patterns">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Browse Patterns
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple Pricing. Real Value.
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Avoid the failures that quietly kill trials. Access the failure intelligence library.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Free Tier */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 text-sm">
                Explore failure patterns and summaries
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Browse all failure patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Read pattern summaries (2-3 sentences)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Submit anonymous retrospective analyses</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>1 urgent help thread</strong> /month (24-48hr)</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 line-through">Full pattern deep-dives</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 line-through">Retrospective library access</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 line-through">New patterns monthly</span>
              </li>
            </ul>

            <Link href="/sign-up">
              <Button variant="outline" className="w-full border-2 border-white/50 bg-white/5 hover:bg-white/20 text-white font-semibold hover:text-white h-14 text-lg">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-8 hover:scale-105 transition-all relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-white">$29</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 text-sm">
                Full access to all failure intelligence
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 font-semibold">Everything in Free, plus:</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Full retrospective library</strong> access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Full pattern deep-dives</strong> with all sections</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Search by role, phase, failure type</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>5 urgent help threads</strong> /month (12-24hr)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Emergency help included</strong> (2-4hr critical)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>New patterns monthly</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Early access to new features</span>
              </li>
            </ul>

            <Link href="/sign-up">
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-14 text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Get Pro Access
              </Button>
            </Link>
            <p className="text-white/70 text-xs text-center mt-3">
              Cancel anytime. No commitment.
            </p>
          </div>

          {/* Premium Tier */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Premium</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-white">$59</span>
                <span className="text-white/70">/month</span>
              </div>
              <p className="text-white/70 text-sm">
                For teams with urgent needs
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 font-semibold">Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Unlimited urgent help threads</strong> /month</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Faster response times</strong> (6-12hr high)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90"><strong>Emergency help included</strong> (2-4hr critical)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Priority matching with top experts</span>
              </li>
            </ul>

            <Link href="/sign-up">
              <Button variant="outline" className="w-full border-2 border-white/50 bg-white/5 hover:bg-white/20 text-white font-semibold hover:text-white h-14 text-lg">
                Get Premium
              </Button>
            </Link>
            <p className="text-white/70 text-xs text-center mt-3">
              For teams and sites
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Pro Is Worth It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Avoid Costly Failures
              </h3>
              <p className="text-white/70 text-sm">
                One avoided failure saves more than a year of Pro subscriptions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Real Intelligence
              </h3>
              <p className="text-white/70 text-sm">
                Learn from actual trial failures, not theoretical best practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Stay Anonymous
              </h3>
              <p className="text-white/70 text-sm">
                Contributors protected by strict anonymization
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-white/80">
                Yes, you can cancel your Pro subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                How often is new content added?
              </h3>
              <p className="text-white/80">
                New patterns are added monthly. Retrospectives are added as they're reviewed and approved, typically 3-5 per week.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Can I submit retrospectives with Free tier?
              </h3>
              <p className="text-white/80">
                Yes! Anyone can submit anonymous retrospective analyses. Contributors with approved submissions get special recognition.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                What if I'm not satisfied?
              </h3>
              <p className="text-white/80">
                If you don't find value in the first 30 days, contact us for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Avoid Trial Failures?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Join 50+ clinical trial operators using failure intelligence.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-2xl">
                <Zap className="h-5 w-5 mr-2" />
                Get Started Free
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