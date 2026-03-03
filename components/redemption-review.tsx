'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Redemption {
  id: string;
  optionId: string;
  optionName: string;
  credits: number;
  userNotes: string | null;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    credits: number;
    reputationTier: string;
    approvedCount: number;
  };
}

interface RedemptionReviewProps {
  redemption: Redemption;
  adminId: string;
}

export function RedemptionReview({ redemption, adminId }: RedemptionReviewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const canAfford = redemption.user.credits >= redemption.credits;

  const handleApprove = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/admin/redemptions/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          redemptionId: redemption.id,
          adminId,
          adminNotes,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve redemption');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!adminNotes.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/redemptions/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          redemptionId: redemption.id,
          adminId,
          adminNotes,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reject redemption');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{redemption.optionName}</h3>
            {!canAfford && (
              <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                Insufficient Credits
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <strong>User:</strong> {redemption.user.firstName} {redemption.user.lastName} ({redemption.user.email})
            </div>
            <div>
              <strong>Credits Required:</strong> {redemption.credits} | <strong>User Balance:</strong> {redemption.user.credits}
            </div>
            <div>
              <strong>Reputation:</strong> {redemption.user.reputationTier} | <strong>Approved Contributions:</strong> {redemption.user.approvedCount}
            </div>
            <div>
              <strong>Requested:</strong> {new Date(redemption.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="text-3xl font-bold text-blue-600">{redemption.credits}</div>
          <div className="text-sm text-gray-500">credits</div>
        </div>
      </div>

      {redemption.userNotes && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-semibold text-blue-900 uppercase mb-1">User Notes</div>
          <p className="text-sm text-blue-800">{redemption.userNotes}</p>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-3"
      >
        {showDetails ? '− Hide' : '+ Show'} review form
      </button>

      {showDetails && (
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Notes {!canAfford && <span className="text-red-600">(Required for rejection)</span>}
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about this redemption..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {!canAfford && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> User does not have enough credits. This redemption should be rejected.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              variant="destructive"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Processing...' : 'Reject'}
            </Button>
            <Button
              onClick={handleApprove}
              disabled={loading || !canAfford}
              className="flex-1"
            >
              {loading ? 'Processing...' : 'Approve & Deduct Credits'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}