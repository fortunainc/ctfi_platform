'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  credits: number;
  value: string;
  icon: string;
  color: string;
  benefits: string[];
}

interface RedemptionFormProps {
  option: RedemptionOption;
  userId: string;
  userCredits: number;
}

const colorClasses = {
  blue: 'border-blue-600 bg-blue-50',
  purple: 'border-purple-600 bg-purple-50',
  green: 'border-green-600 bg-green-50',
  yellow: 'border-yellow-600 bg-yellow-50',
  indigo: 'border-indigo-600 bg-indigo-50',
  pink: 'border-pink-600 bg-pink-50',
};

export function RedemptionForm({ option, userId, userCredits }: RedemptionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [notes, setNotes] = useState('');

  const canAfford = userCredits >= option.credits;

  const handleRedeem = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/credits/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          optionId: option.id,
          optionName: option.name,
          credits: option.credits,
          notes,
        }),
      });

      if (response.ok) {
        router.push('/credits?redeemed=true');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit redemption request');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{option.icon}</div>
          {!canAfford && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Insufficient Credits
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{option.description}</p>

        {/* Pricing */}
        <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900">{option.credits}</div>
            <div className="text-sm text-gray-500">credits</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-600">{option.value}</div>
            <div className="text-xs text-gray-500">value</div>
          </div>
        </div>

        {/* Benefits Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700 mb-3"
        >
          {showDetails ? '− Hide' : '+ Show'} benefits
        </button>

        {/* Benefits List */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <ul className="space-y-2 text-sm text-gray-700">
              {option.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes (when redeeming) */}
        {showDetails && canAfford && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or information..."
              rows={2}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        )}

        {/* Redeem Button */}
        <Button
          onClick={handleRedeem}
          disabled={!canAfford || loading}
          className="w-full"
          size="lg"
        >
          {loading ? 'Processing...' : canAfford ? `Redeem for ${option.credits} Credits` : 'Not Enough Credits'}
        </Button>

        {!canAfford && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Need {option.credits - userCredits} more credits
          </p>
        )}
      </div>
    </div>
  );
}