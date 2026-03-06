"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, HelpCircle, Vote, Clock } from "lucide-react";

const trialPhases = [
  "All Phases",
  "Phase 1",
  "Phase 1/2",
  "Phase 2",
  "Phase 2/3",
  "Phase 3",
  "Phase 4",
];

const therapeuticAreas = [
  "All Areas",
  "Oncology",
  "Cardiovascular",
  "CNS/Neurology",
  "Rare Disease",
  "Immunology",
  "Infectious Disease",
  "Respiratory",
  "Gastroenterology",
  "Endocrinology",
  "Dermatology",
  "Ophthalmology",
  "Women's Health",
  "Pediatrics",
  "Other",
];

const pollDurations = [
  { value: "24h", label: "24 hours" },
  { value: "48h", label: "48 hours" },
  { value: "72h", label: "72 hours" },
  { value: "1w", label: "1 week" },
];

export default function NewPollPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    trialPhase: "",
    therapeuticArea: "",
    option1: "Yes, significant impact",
    option2: "Similar but less severe",
    option3: "No, not experiencing this",
    duration: "48h",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Will be replaced with API call
    setTimeout(() => {
      router.push("/polls");
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/polls" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Reality Checks
        </Link>

        {/* Form Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Create a Reality Check</h1>
          <p className="text-slate-400">
            Ask "Is this normal?" and get anonymous feedback from the field.
          </p>
        </div>

        {/* Anonymity Notice */}
        <div className="glass-card p-4 mb-6 border-purple-500/20 bg-purple-500/5">
          <div className="flex items-start gap-3">
            <Vote className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-300 font-medium">Anonymous Polling</p>
              <p className="text-sm text-slate-400">
                All votes are completely anonymous. No one can see how you voted—only aggregated results.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-slate-200">Poll Question *</Label>
            <Input
              id="question"
              placeholder="e.g., Has your site experienced unexpected enrollment pressure from sponsors?"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="input-field text-lg"
              required
            />
            <p className="text-xs text-slate-500">
              Frame questions to get Yes/Similar/No style responses for best results.
            </p>
          </div>

          {/* Row 1: Phase, Therapeutic Area */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Trial Phase *</Label>
              <select 
                className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.trialPhase}
                onChange={(e) => setFormData({ ...formData, trialPhase: e.target.value })}
                required
              >
                <option value="">Select phase...</option>
                {trialPhases.map((phase) => (
                  <option key={phase} value={phase}>{phase}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Therapeutic Area *</Label>
              <select 
                className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.therapeuticArea}
                onChange={(e) => setFormData({ ...formData, therapeuticArea: e.target.value })}
                required
              >
                <option value="">Select area...</option>
                {therapeuticAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Poll Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-slate-200">Response Options *</Label>
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-sm text-slate-400">
              Default options work well for most "Is this normal?" questions. Customize if needed.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-medium">1</span>
                <Input
                  value={formData.option1}
                  onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
                  className="input-field flex-1"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-medium">2</span>
                <Input
                  value={formData.option2}
                  onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
                  className="input-field flex-1"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-medium">3</span>
                <Input
                  value={formData.option3}
                  onChange={(e) => setFormData({ ...formData, option3: e.target.value })}
                  className="input-field flex-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="text-slate-200">Poll Duration *</Label>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-slate-400" />
              <select 
                className="bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              >
                {pollDurations.map((duration) => (
                  <option key={duration.value} value={duration.value}>{duration.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link href="/polls">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Poll"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}