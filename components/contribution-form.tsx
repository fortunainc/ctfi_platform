'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ContributionFormProps {
  channel: {
    id: string;
    name: string;
    contextPrompt: string;
    failurePrompt: string;
    whyPrompt: string;
    changePrompt: string;
    contextLimit: number;
    failureLimit: number;
    whyLimit: number;
    changeLimit: number;
  };
  userId: string;
  userCredits: number;
}

const trialPhases = ['Phase I', 'Phase II', 'Phase III', 'Phase IV'];
const therapeuticAreas = [
  'Oncology',
  'Cardiology',
  'Neurology',
  'Immunology',
  'Infectious Disease',
  'Rare Disease',
  'Pediatrics',
  'Endocrinology',
  'Respiratory',
];
const sponsorTypes = ['Pharma', 'Biotech', 'Academic', 'CRO'];

export function ContributionForm({ channel, userId, userCredits }: ContributionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    context: '',
    whatFailed: '',
    whyFailed: '',
    whatToChange: '',
    trialPhase: '',
    therapeuticArea: '',
    sponsorType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userCredits < 10) {
      setError('Insufficient credits. You need at least 10 credits to submit.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contributions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: channel.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/contributions?success=true');
      } else {
        setError(data.error || 'Failed to submit contribution');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCharacterCount = (field: keyof typeof formData, limit: number) => {
    const count = formData[field].length;
    const remaining = limit - count;
    const isNearLimit = remaining <= 20;
    const isOverLimit = remaining < 0;
    
    return (
      <span className={`text-xs ${isOverLimit ? 'text-red-600' : isNearLimit ? 'text-amber-600' : 'text-gray-500'}`}>
        {count}/{limit} characters
      </span>
    );
  };

  const isFormValid = () => {
    return (
      formData.context.length > 0 &&
      formData.context.length <= channel.contextLimit &&
      formData.whatFailed.length > 0 &&
      formData.whatFailed.length <= channel.failureLimit &&
      formData.whyFailed.length > 0 &&
      formData.whyFailed.length <= channel.whyLimit &&
      formData.whatToChange.length > 0 &&
      formData.whatToChange.length <= channel.changeLimit &&
      formData.trialPhase &&
      formData.therapeuticArea &&
      formData.sponsorType
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trial Phase <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.trialPhase}
            onChange={(e) => setFormData({ ...formData, trialPhase: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select phase</option>
            {trialPhases.map(phase => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Therapeutic Area <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.therapeuticArea}
            onChange={(e) => setFormData({ ...formData, therapeuticArea: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select area</option>
            {therapeuticAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sponsor Type <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.sponsorType}
            onChange={(e) => setFormData({ ...formData, sponsorType: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select type</option>
            {sponsorTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Field 1: Context */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {channel.contextPrompt} <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={formData.context}
          onChange={(e) => setFormData({ ...formData, context: e.target.value })}
          placeholder="e.g., Phase III Oncology, CRC role"
          maxLength={channel.contextLimit}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xs text-gray-500">Brief context about the situation</span>
          {getCharacterCount('context', channel.contextLimit)}
        </div>
      </div>

      {/* Field 2: What Failed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {channel.failurePrompt} <span className="text-red-600">*</span>
        </label>
        <textarea
          value={formData.whatFailed}
          onChange={(e) => setFormData({ ...formData, whatFailed: e.target.value })}
          placeholder="Describe what failed in specific, concrete terms..."
          maxLength={channel.failureLimit}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xs text-gray-500">Be specific and concrete</span>
          {getCharacterCount('whatFailed', channel.failureLimit)}
        </div>
      </div>

      {/* Field 3: Why It Failed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {channel.whyPrompt} <span className="text-red-600">*</span>
        </label>
        <textarea
          value={formData.whyFailed}
          onChange={(e) => setFormData({ ...formData, whyFailed: e.target.value })}
          placeholder="Explain the root cause - what decision, incentive, or assumption led to this failure..."
          maxLength={channel.whyLimit}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xs text-gray-500">Identify root causes, not just symptoms</span>
          {getCharacterCount('whyFailed', channel.whyLimit)}
        </div>
      </div>

      {/* Field 4: What to Change */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {channel.changePrompt} <span className="text-red-600">*</span>
        </label>
        <textarea
          value={formData.whatToChange}
          onChange={(e) => setFormData({ ...formData, whatToChange: e.target.value })}
          placeholder="Suggest one actionable change that would address this issue..."
          maxLength={channel.changeLimit}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xs text-gray-500">Provide practical, implementable solutions</span>
          {getCharacterCount('whatToChange', channel.changeLimit)}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Cost:</span> 10 credits
          <span className="mx-2">•</span>
          <span className="font-medium">Potential reward:</span> 25-75 credits
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={loading || !isFormValid() || userCredits < 10}
        >
          {loading ? 'Submitting...' : 'Submit Contribution'}
        </Button>
      </div>
    </form>
  );
}