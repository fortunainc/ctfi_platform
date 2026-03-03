'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Shield, Info } from 'lucide-react';
import { useState } from 'react';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    role: 'CRC',
    trialPhase: 'PHASE_III',
    therapeuticArea: '',
    failureType: 'ENROLLMENT_COLLAPSE',
    whatFailed: '',
    earlyWarningSigns: '',
    leadershipMisunderstanding: '',
    whatWouldDoDifferently: '',
    failureObviousAt: '',
    confidenceLevel: 'MEDIUM'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // API call will be added here
    console.log('Submitting:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Post-mortem submitted for moderation. It will be reviewed before publication.');
    }, 1500);
  };

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
                <div className="text-xs text-white/95 font-medium">Submit Retrospective Analysis</div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/postmortems">
            <Button variant="ghost" className="text-white/90 hover:bg-white/10 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Submit a Retrospective Analysis
          </h1>
          
          <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Your Identity is Protected
                </h3>
                <p className="text-white/80 text-sm">
                  All retrospective analyses are strictly anonymized. No sponsor names, site names, drug names, or protocol titles are allowed. 
                  Your submission will be reviewed by an editor before publication to ensure quality and complete anonymization.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl text-white/90">
            Share what failed, the early warning signs, and what you would do differently. Help other operators avoid the same mistakes.
          </p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
            
            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="CRC">CRC - Clinical Research Coordinator</option>
                <option value="CRA">CRA - Clinical Research Associate</option>
                <option value="PM">PM - Project Manager</option>
                <option value="PI">PI - Principal Investigator</option>
                <option value="SITE_DIRECTOR">Site Director</option>
                <option value="SPONSOR_OPS">Sponsor Operations</option>
              </select>
            </div>

            {/* Trial Phase */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Trial Phase *
              </label>
              <select
                required
                value={formData.trialPhase}
                onChange={(e) => setFormData({ ...formData, trialPhase: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="PHASE_I">Phase I</option>
                <option value="PHASE_II">Phase II</option>
                <option value="PHASE_III">Phase III</option>
                <option value="PHASE_IV">Phase IV</option>
              </select>
            </div>

            {/* Therapeutic Area */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Therapeutic Area (broad category only) *
              </label>
              <input
                required
                type="text"
                value={formData.therapeuticArea}
                onChange={(e) => setFormData({ ...formData, therapeuticArea: e.target.value })}
                placeholder="e.g., Oncology, Cardiology, Neurology"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500"
              />
              <p className="text-white/60 text-xs mt-2">
                Use broad categories only. No specific drug names or indications.
              </p>
            </div>

            {/* Failure Type */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Failure Type *
              </label>
              <select
                required
                value={formData.failureType}
                onChange={(e) => setFormData({ ...formData, failureType: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
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

          {/* What Failed */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h2 className="text-2xl font-bold text-white">What Failed *</h2>
            </div>
            <p className="text-white/70 text-sm">
              Describe the failure in 200-500 words. What actually happened?
            </p>
            <textarea
              required
              rows={6}
              value={formData.whatFailed}
              onChange={(e) => setFormData({ ...formData, whatFailed: e.target.value })}
              placeholder="Describe the failure clearly and concisely. Focus on what happened, not why you think it happened."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* Early Warning Signs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Early Warning Signs *</h2>
            <p className="text-white/70 text-sm mb-4">
              List 3-7 early warning signs that appeared <strong>before</strong> the failure became obvious.
            </p>
            <textarea
              required
              rows={8}
              value={formData.earlyWarningSigns}
              onChange={(e) => setFormData({ ...formData, earlyWarningSigns: e.target.value })}
              placeholder="- Site feasibility overestimated patient pool by 300%&#10;- Competing trials with similar criteria&#10;- Sites lacked dedicated research staff&#10;- No patient recruitment strategy provided"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
            />
            <p className="text-white/60 text-xs">
              Use bullet points (one per line). Each sign should be specific and actionable.
            </p>
          </div>

          {/* What Leadership Misunderstood */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">What Leadership Misunderstood *</h2>
            <p className="text-white/70 text-sm mb-4">
              What did leadership miss or misunderstand? What assumptions were incorrect?
            </p>
            <textarea
              required
              rows={5}
              value={formData.leadershipMisunderstanding}
              onChange={(e) => setFormData({ ...formData, leadershipMisunderstanding: e.target.value })}
              placeholder="Leadership believed site feasibility reports without verification. Assumed sites would handle recruitment independently..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* What Would Do Differently */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-400" />
              <h2 className="text-2xl font-bold text-white">What I Would Do Differently *</h2>
            </div>
            <p className="text-white/70 text-sm mb-4">
              What would you do differently next time? Be specific and actionable.
            </p>
            <textarea
              required
              rows={6}
              value={formData.whatWouldDoDifferently}
              onChange={(e) => setFormData({ ...formData, whatWouldDoDifferently: e.target.value })}
              placeholder="Would conduct real patient chart reviews during feasibility. Would track competitive landscape. Would require dedicated research coordinator allocation..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* When Failure Became Obvious */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">When Did the Failure Become Obvious? *</h2>
            <p className="text-white/70 text-sm mb-4">
              At what point in the trial did you realize something was seriously wrong?
            </p>
            <input
              required
              type="text"
              value={formData.failureObviousAt}
              onChange={(e) => setFormData({ ...formData, failureObviousAt: e.target.value })}
              placeholder="e.g., Month 3 - after zero enrollments across all sites"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Confidence Level */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Confidence Level *</h2>
            <p className="text-white/70 text-sm mb-4">
              How confident are you in your understanding of this failure?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors border-2 border-transparent hover:border-red-500">
                <input
                  type="radio"
                  name="confidenceLevel"
                  value="LOW"
                  checked={formData.confidenceLevel === 'LOW'}
                  onChange={(e) => setFormData({ ...formData, confidenceLevel: e.target.value })}
                  className="w-5 h-5 text-red-500"
                />
                <div>
                  <div className="font-semibold text-white">Low</div>
                  <div className="text-xs text-white/60">Limited experience</div>
                </div>
              </label>
              <label className="flex items-center gap-3 bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors border-2 border-transparent hover:border-red-500">
                <input
                  type="radio"
                  name="confidenceLevel"
                  value="MEDIUM"
                  checked={formData.confidenceLevel === 'MEDIUM'}
                  onChange={(e) => setFormData({ ...formData, confidenceLevel: e.target.value })}
                  className="w-5 h-5 text-red-500"
                />
                <div>
                  <div className="font-semibold text-white">Medium</div>
                  <div className="text-xs text-white/60">Confident, some uncertainty</div>
                </div>
              </label>
              <label className="flex items-center gap-3 bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors border-2 border-transparent hover:border-red-500">
                <input
                  type="radio"
                  name="confidenceLevel"
                  value="HIGH"
                  checked={formData.confidenceLevel === 'HIGH'}
                  onChange={(e) => setFormData({ ...formData, confidenceLevel: e.target.value })}
                  className="w-5 h-5 text-red-500"
                />
                <div>
                  <div className="font-semibold text-white">High</div>
                  <div className="text-xs text-white/60">Direct involvement</div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 h-14">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-14 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </div>
        </form>

        {/* Anonymization Reminder */}
        <div className="mt-8 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Important: No Identifying Information
              </h3>
              <p className="text-white/80 text-sm">
                Do NOT include sponsor names, site names, drug names, protocol titles, or any information that could identify the trial or organization. 
                Submissions containing identifying information will be rejected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/90 text-sm">
            © 2026 CTFI. Clinical Trial Failure Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}