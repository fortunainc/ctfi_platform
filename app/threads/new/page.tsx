"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, ArrowLeft, HelpCircle } from "lucide-react";

const trialPhases = [
  "Phase 1",
  "Phase 1/2",
  "Phase 2",
  "Phase 2/3",
  "Phase 3",
  "Phase 4",
];

const therapeuticAreas = [
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

const siteCountRanges = [
  "1-5",
  "5-10",
  "10-25",
  "25-50",
  "50-100",
  "100+",
];

const issueCategories = [
  "Enrollment",
  "Protocol burden",
  "Sponsor expectations",
  "CRO communication",
  "Site staffing",
  "Budget",
  "Patient retention",
  "Monitoring conflicts",
  "Data/query backlog",
  "Regulatory delays",
  "Vendor management",
  "Supply chain",
  "Other",
];

const urgencyLevels = [
  { value: "Normal", label: "Normal", description: "General question or discussion" },
  { value: "Needs Advice", label: "Needs Advice", description: "Looking for guidance from peers" },
  { value: "Urgent", label: "Urgent", description: "Time-sensitive issue requiring quick response" },
  { value: "Critical", label: "Critical", description: "Emergency situation (enrollment, safety, etc.)" },
];

export default function NewThreadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    trialPhase: "",
    therapeuticArea: "",
    siteCountRange: "",
    issueCategory: "",
    urgencyLevel: "Normal",
    description: "",
    additionalContext: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Will be replaced with API call
    setTimeout(() => {
      router.push("/threads");
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
        <Link href="/threads" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </Link>

        {/* Form Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Start a Discussion</h1>
          <p className="text-slate-400">
            Post your challenge anonymously. Get real advice from operators who've been there.
          </p>
        </div>

        {/* Anonymity Notice */}
        <div className="glass-card p-4 mb-6 border-cyan-500/20 bg-cyan-500/5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-300 font-medium">Your identity is protected</p>
              <p className="text-sm text-slate-400">
                You'll post as <span className="text-cyan-400">Operator_XXXX</span>. 
                No names, sponsors, or site identifiers will be stored.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-200">Title *</Label>
            <Input
              id="title"
              placeholder="What's your question or challenge?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field text-lg"
              required
            />
          </div>

          {/* Row 1: Phase, Therapeutic Area, Site Count */}
          <div className="grid md:grid-cols-3 gap-4">
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

            <div className="space-y-2">
              <Label className="text-slate-200">Site Count *</Label>
              <select 
                className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.siteCountRange}
                onChange={(e) => setFormData({ ...formData, siteCountRange: e.target.value })}
                required
              >
                <option value="">Select range...</option>
                {siteCountRanges.map((range) => (
                  <option key={range} value={range}>{range} sites</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Issue Category, Urgency */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Issue Category *</Label>
              <select 
                className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.issueCategory}
                onChange={(e) => setFormData({ ...formData, issueCategory: e.target.value })}
                required
              >
                <option value="">Select category...</option>
                {issueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Urgency Level *</Label>
              <select 
                className="w-full bg-slate-800 border-slate-700 text-slate-200 rounded-lg px-4 py-2.5"
                value={formData.urgencyLevel}
                onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                required
              >
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-slate-200">Description *</Label>
            <Textarea
              placeholder="Describe your situation in detail. What's happening? What have you tried? What do you need help with?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[150px]"
              required
            />
          </div>

          {/* Additional Context */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-slate-200">Additional Context (Optional)</Label>
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </div>
            <Textarea
              placeholder="Any relevant background info: protocol amendments, timeline constraints, team size, etc."
              value={formData.additionalContext}
              onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
              className="input-field min-h-[80px]"
            />
          </div>

          {/* Urgency Warning */}
          {formData.urgencyLevel === "Critical" && (
            <div className="glass-card p-4 border-rose-500/20 bg-rose-500/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300 font-medium">Critical posts get priority visibility</p>
                  <p className="text-sm text-slate-400">
                    Your post will be highlighted in the urgent help channel and shown to experienced operators first.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link href="/threads">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Anonymously"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}