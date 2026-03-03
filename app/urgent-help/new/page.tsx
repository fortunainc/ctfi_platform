"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Shield, Clock, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function NewUrgentHelpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    trialPhase: "",
    therapeuticArea: "",
    siteType: "",
    failureType: "",
    urgencyLevel: "",
    description: "",
    needsHelpWith: [] as string[]
  });

  const helpOptions = [
    { id: "checklist", label: "What to check immediately" },
    { id: "questions", label: "Questions to ask my team" },
    { id: "escalation", label: "Escalation script for CRO/Sponsor" },
    { id: "budget", label: "Budget language justification" },
    { id: "vendor", label: "Vendor management guidance" },
    { id: "other", label: "Other (specify in description)" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/urgent-threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      const data = await response.json();
      // Redirect to thread detail page
      window.location.href = `/urgent-help/${data.thread.id}`;
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      needsHelpWith: checked
        ? [...prev.needsHelpWith, optionId]
        : prev.needsHelpWith.filter(id => id !== optionId)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/urgent-help">
            <Button variant="ghost" className="text-white/90 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Expert-on-Call
            </Button>
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-white">
              Submit Urgent Help Request
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            Describe what's happening and get matched with vetted experts immediately
          </p>
        </div>

        {/* Anonymity Warning */}
        <Card className="bg-slate-800/50 border-orange-600 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Remember: No Identifying Information
                </h3>
                <p className="text-white/90">
                  Do NOT include site names, trial IDs, protocol numbers, sponsor names, or any details that could identify you or your trial.
                  Your request will be rejected if it contains identifying information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Trial Phase */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Trial Phase</CardTitle>
                <CardDescription className="text-white/90">
                  What phase is this trial in?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.trialPhase}
                  onValueChange={(value) => setFormData({ ...formData, trialPhase: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue placeholder="Select trial phase" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="PHASE_I">Phase I</SelectItem>
                    <SelectItem value="PHASE_II">Phase II</SelectItem>
                    <SelectItem value="PHASE_III">Phase III</SelectItem>
                    <SelectItem value="PHASE_IV">Phase IV</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Therapeutic Area */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Therapeutic Area</CardTitle>
                <CardDescription className="text-white/90">
                  Broad category only (e.g., Oncology, Cardiology)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={formData.therapeuticArea}
                  onChange={(e) => setFormData({ ...formData, therapeuticArea: e.target.value })}
                  placeholder="e.g., Oncology"
                  className="bg-slate-700 text-white border-slate-600"
                  required
                />
              </CardContent>
            </Card>

            {/* Site Type */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Site Type</CardTitle>
                <CardDescription className="text-white/90">
                  Optional: Type of research site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={formData.siteType}
                  onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
                  placeholder="e.g., Academic, Community, Private Practice"
                  className="bg-slate-700 text-white border-slate-600"
                />
              </CardContent>
            </Card>

            {/* Failure Type */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Failure Type</CardTitle>
                <CardDescription className="text-white/90">
                  What type of failure are you experiencing?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.failureType}
                  onValueChange={(value) => setFormData({ ...formData, failureType: value })}
                >
                  <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                    <SelectValue placeholder="Select failure type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="ENROLLMENT_COLLAPSE">Enrollment Collapse</SelectItem>
                    <SelectItem value="PROTOCOL_OVERLOAD">Protocol Overload</SelectItem>
                    <SelectItem value="BUDGET_UNDERFUNDING">Budget Underfunding</SelectItem>
                    <SelectItem value="CRO_EXECUTION_FAILURE">CRO Execution Failure</SelectItem>
                    <SelectItem value="SITE_SELECTION_MISMATCH">Site Selection Mismatch</SelectItem>
                    <SelectItem value="AMENDMENT_CASCADE">Amendment Cascade</SelectItem>
                    <SelectItem value="VENDOR_BREAKDOWN">Vendor Breakdown</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Urgency Level */}
            <Card className="bg-slate-800/50 border-slate-700 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Urgency Level</CardTitle>
                <CardDescription className="text-white/90">
                  How quickly do you need help?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: 'LOW', label: 'Low', time: '24-48 hours', color: 'blue' },
                    { value: 'MEDIUM', label: 'Medium', time: '12-24 hours', color: 'yellow' },
                    { value: 'HIGH', label: 'High', time: '6-12 hours', color: 'orange' },
                    { value: 'CRITICAL', label: 'Critical', time: '2-4 hours', color: 'red' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgencyLevel: level.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.urgencyLevel === level.value
                          ? `border-${level.color}-500 bg-${level.color}-900/30`
                          : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-white font-semibold mb-1">{level.label}</div>
                      <div className="text-white/90 text-sm">{level.time}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">What's Happening?</CardTitle>
              <CardDescription className="text-white/90">
                Describe the situation in detail. What's going wrong? What have you tried?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what's happening, what you've tried, and what you're most concerned about..."
                className="bg-slate-700 text-white border-slate-600 min-h-[200px]"
                required
              />
              <p className="text-white/90 text-sm mt-2">
                Minimum 100 characters recommended for the best guidance
              </p>
            </CardContent>
          </Card>

          {/* What You Need Help With */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">What Do You Need Help With?</CardTitle>
              <CardDescription className="text-white/90">
                Select all that apply (at least one required)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {helpOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={formData.needsHelpWith.includes(option.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                      className="border-slate-600"
                    />
                    <Label htmlFor={option.id} className="text-white/90 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-12 py-6"
              disabled={isLoading || !formData.trialPhase || !formData.therapeuticArea || 
                       !formData.failureType || !formData.urgencyLevel || 
                       !formData.description || formData.needsHelpWith.length === 0}
            >
              {isLoading ? (
                <>
                  <Clock className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}