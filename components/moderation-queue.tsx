'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Contribution {
  id: string;
  context: string;
  whatFailed: string;
  whyFailed: string;
  whatToChange: string;
  trialPhase: string | null;
  therapeuticArea: string | null;
  sponsorType: string | null;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  channel: {
    id: string;
    name: string;
    color: string;
  };
  patterns: Array<{
    id: string;
    category: {
      id: string;
      name: string;
    };
  }>;
}

interface PatternCategory {
  id: string;
  name: string;
  slug: string;
  type: string;
  color: string;
}

interface ModerationQueueProps {
  contributions: Contribution[];
  patternCategories: PatternCategory[];
  moderatorId: string;
}

export function ModerationQueue({ contributions, patternCategories, moderatorId }: ModerationQueueProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [scores, setScores] = useState({
    relevance: 3,
    specificity: 3,
    actionability: 3,
    novelty: 3,
    evidence: 3,
  });
  const [rejectionReason, setRejectionReason] = useState('');
  const [notes, setNotes] = useState('');

  if (contributions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
        <p className="text-gray-600">No contributions pending review at this time.</p>
      </div>
    );
  }

  const currentContribution = contributions[currentIndex];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  // Calculate credit award based on total score
  const getCreditAward = (score: number) => {
    if (score <= 10) return 25;
    if (score <= 15) return 40;
    if (score <= 20) return 55;
    return 75;
  };

  const creditAward = getCreditAward(totalScore);

  const togglePattern = (patternId: string) => {
    setSelectedPatterns(prev =>
      prev.includes(patternId)
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
    );
  };

  const handleApprove = async () => {
    if (selectedPatterns.length === 0) {
      setError('Please select at least one pattern category');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/moderation/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contributionId: currentContribution.id,
          moderatorId,
          patternIds: selectedPatterns,
          scores,
          notes,
        }),
      });

      if (response.ok) {
        // Move to next contribution or refresh
        if (currentIndex < contributions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          resetForm();
        } else {
          router.refresh();
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to approve contribution');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/moderation/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contributionId: currentContribution.id,
          moderatorId,
          rejectionReason,
          notes,
        }),
      });

      if (response.ok) {
        // Move to next contribution or refresh
        if (currentIndex < contributions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          resetForm();
        } else {
          router.refresh();
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to reject contribution');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedPatterns([]);
    setScores({
      relevance: 3,
      specificity: 3,
      actionability: 3,
      novelty: 3,
      evidence: 3,
    });
    setRejectionReason('');
    setNotes('');
    setError('');
  };

  // Group patterns by type
  const patternsByType = patternCategories.reduce((acc, pattern) => {
    if (!acc[pattern.type]) {
      acc[pattern.type] = [];
    }
    acc[pattern.type].push(pattern);
    return acc;
  }, {} as Record<string, PatternCategory[]>);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Contribution {currentIndex + 1} of {contributions.length}
          </span>
          <span className="text-sm text-gray-500">
            {contributions.length - currentIndex - 1} remaining
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / contributions.length) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Contribution Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {currentContribution.channel.name}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>{currentContribution.trialPhase}</span>
              <span>•</span>
              <span>{currentContribution.therapeuticArea}</span>
              <span>•</span>
              <span>{currentContribution.sponsorType}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Submitted by</div>
            <div className="font-medium text-gray-900">
              {currentContribution.user.firstName} {currentContribution.user.lastName}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(currentContribution.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Context</div>
            <p className="text-gray-900">{currentContribution.context}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">What Failed</div>
            <p className="text-gray-900">{currentContribution.whatFailed}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Why It Failed</div>
            <p className="text-gray-900">{currentContribution.whyFailed}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">What to Change</div>
            <p className="text-gray-900">{currentContribution.whatToChange}</p>
          </div>
        </div>
      </div>

      {/* Pattern Tagging */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Pattern Tagging (Select all that apply)</h3>
        <div className="space-y-4">
          {Object.entries(patternsByType).map(([type, patterns]) => (
            <div key={type}>
              <div className="text-sm font-semibold text-gray-700 mb-2">{type} Patterns</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => togglePattern(pattern.id)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      selectedPatterns.includes(pattern.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{pattern.name}</span>
                      {selectedPatterns.includes(pattern.id) && (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Scoring */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quality Scoring (1-5 each)</h3>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Score</div>
            <div className="text-3xl font-bold text-blue-600">{totalScore}/25</div>
            <div className="text-sm text-green-600 font-medium">+{creditAward} credits</div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(scores).map(([dimension, score]) => (
            <div key={dimension}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {dimension}
                </label>
                <span className="text-sm font-semibold text-gray-900">{score}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={score}
                onChange={(e) => setScores({ ...scores, [dimension]: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Internal Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any internal notes about this contribution..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Rejection Reason (shown when rejecting) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rejection Reason (Required if rejecting)
        </label>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Explain why this contribution is being rejected..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handleReject}
          variant="destructive"
          size="lg"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Processing...' : 'Reject'}
        </Button>
        <Button
          onClick={handleApprove}
          size="lg"
          disabled={loading || selectedPatterns.length === 0}
          className="flex-1"
        >
          {loading ? 'Processing...' : `Approve & Award ${creditAward} Credits`}
        </Button>
      </div>
    </div>
  );
}