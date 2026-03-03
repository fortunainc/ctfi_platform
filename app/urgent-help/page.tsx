import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, Clock, Shield, Users, Zap } from "lucide-react";

export default function UrgentHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Expert-on-Call
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          When your trial is actively failing, you can't wait 48 hours. Get immediate guidance from vetted clinical trial operators who've been there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/urgent-help/new">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
              <Zap className="mr-2 h-5 w-5" />
              Get Urgent Help Now
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="border-2 border-white/70 bg-white/5 hover:bg-white/20 text-white font-semibold hover:text-white text-lg px-8 py-6">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="bg-red-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-white">1. Describe Your Crisis</CardTitle>
              <CardDescription className="text-white/90">
                Fill out a structured form about what's happening - trial phase, failure type, urgency level
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">2. Get Matched Instantly</CardTitle>
              <CardDescription className="text-white/90">
                Our system matches you with vetted experts who have experience with your exact failure type
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white">3. Receive Actionable Guidance</CardTitle>
              <CardDescription className="text-white/90">
                Get structured advice: what to check, questions to ask, escalation scripts
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          What You'll Receive
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    What to Check Immediately
                  </h3>
                  <p className="text-white/90">
                    Actionable checklist of items to verify right now - no fluff, no theory, just what works
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Questions to Ask Your Team
                  </h3>
                  <p className="text-white/90">
                    Specific questions that will reveal the root cause - drawn from real failure patterns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Zap className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Escalation Scripts
                  </h3>
                  <p className="text-white/90">
                    Proven language for escalating to CROs, sponsors, or leadership when things go wrong
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    SLA-Based Response Times
                  </h3>
                  <p className="text-white/90">
                    Guaranteed response windows based on urgency - 2-4 hours for critical, 6-12 hours for high
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Response Time Tiers */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Response Time Tiers
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-red-900/30 border-red-700">
            <CardHeader>
              <div className="text-3xl font-bold text-red-500 mb-2">CRITICAL</div>
              <CardDescription className="text-white/90">
                Trial actively failing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                2-4 hours
              </div>
              <p className="text-white/90 text-sm">
                Emergency response
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/30 border-orange-700">
            <CardHeader>
              <div className="text-3xl font-bold text-orange-500 mb-2">HIGH</div>
              <CardDescription className="text-white/90">
                Need help soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                6-12 hours
              </div>
              <p className="text-white/90 text-sm">
                Priority response
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/30 border-yellow-700">
            <CardHeader>
              <div className="text-3xl font-bold text-yellow-500 mb-2">MEDIUM</div>
              <CardDescription className="text-white/90">
                Within 12-24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                12-24 hours
              </div>
              <p className="text-white/90 text-sm">
                Standard response
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-700">
            <CardHeader>
              <div className="text-3xl font-bold text-blue-500 mb-2">LOW</div>
              <CardDescription className="text-white/90">
                Can wait 24-48 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                24-48 hours
              </div>
              <p className="text-white/90 text-sm">
                Best effort
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Anonymity Guarantee */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-8 w-8 text-green-500" />
              <CardTitle className="text-white text-2xl">
                100% Anonymous
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Your urgent help requests are completely anonymous. No site names, no trial IDs, no identifying information. 
              Only therapeutic area, trial phase, and the failure you're experiencing.
            </p>
            <p className="text-white/90 mt-4">
              Experts see only what's necessary to help you. Your career is safe.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Don't Let Your Trial Fail Alone
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get guidance from operators who've survived exactly what you're facing.
        </p>
        <Link href="/urgent-help/new">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Submit Urgent Help Request
          </Button>
        </Link>
        <p className="text-white/90 mt-4 text-sm">
          Free tier: 1 request/month (24-48hr, best effort) • Professional/Premium: Emergency help included
        </p>
      </section>
    </div>
  );
}