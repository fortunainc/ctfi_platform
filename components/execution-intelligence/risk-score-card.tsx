'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Shield, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskScoreCardProps {
  trialId: string;
}

interface RiskData {
  overallScore: number;
  trend: 'improving' | 'stable' | 'worsening';
  breakdown: {
    category: string;
    score: number;
    trend: number;
    status: 'good' | 'warning' | 'critical';
  }[];
  historicalData: number[];
}

export default function RiskScoreCard({ trialId }: RiskScoreCardProps) {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadRiskData();
  }, [trialId]);

  const loadRiskData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - in production this would be a real API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setRiskData({
        overallScore: 72,
        trend: 'improving',
        breakdown: [
          { category: 'Enrollment', score: 85, trend: 5, status: 'good' },
          { category: 'Data Quality', score: 78, trend: -2, status: 'good' },
          { category: 'Site Performance', score: 65, trend: 8, status: 'warning' },
          { category: 'Regulatory', score: 90, trend: 0, status: 'good' },
          { category: 'Safety', score: 88, trend: 3, status: 'good' },
        ],
        historicalData: [65, 68, 70, 69, 72, 71, 72]
      });
    } catch (error) {
      console.error('Error loading risk data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !riskData) {
    return <RiskScoreSkeleton />;
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle };
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: AlertCircle };
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-400/20', icon: AlertCircle };
  };

  const riskLevel = getRiskLevel(riskData.overallScore);
  const RiskIcon = riskLevel.icon;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${riskLevel.bg}`}>
              <Shield className={`h-6 w-6 ${riskLevel.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Risk Score</h3>
              <p className="text-slate-400 text-sm">Overall trial risk assessment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {riskData.trend === 'improving' && (
              <TrendingUp className="h-5 w-5 text-green-400" />
            )}
            {riskData.trend === 'worsening' && (
              <TrendingDown className="h-5 w-5 text-red-400" />
            )}
            <span className={`text-sm font-medium ${riskLevel.color}`}>
              {riskData.trend === 'improving' ? 'Improving' : riskData.trend === 'worsening' ? 'Worsening' : 'Stable'}
            </span>
          </div>
        </div>

        {/* Main Score Display */}
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-bold text-white">{riskData.overallScore}</span>
              <span className="text-xl text-slate-400">/ 100</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${riskLevel.bg}`}>
              <RiskIcon className={`h-4 w-4 ${riskLevel.color}`} />
              <span className={`text-sm font-medium ${riskLevel.color}`}>{riskLevel.level} Risk</span>
            </div>
          </div>

          {/* Historical Trend */}
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-2">7-Day Trend</p>
            <div className="flex items-end gap-1 h-16">
              {riskData.historicalData.map((score, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-500/60 hover:bg-blue-500 rounded-t transition-all duration-300"
                  style={{ height: `${(score / 100) * 100}%` }}
                  title={`Day ${index + 1}: ${score}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-slate-300 mb-4">Risk Breakdown</h4>
        <div className="space-y-4">
          {riskData.breakdown.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === item.category ? null : item.category)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'good' ? 'bg-green-400' : 
                      item.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                  />
                  <span className="text-sm font-medium text-white">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.trend !== 0 && (
                    <span className={`text-xs flex items-center gap-1 ${
                      item.trend > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(item.trend)}%
                    </span>
                  )}
                  <span className="text-lg font-semibold text-white">{item.score}</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.score >= 80 ? 'bg-green-500' : 
                    item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              {/* Expandable Details */}
              {selectedCategory === item.category && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <span className={`ml-2 font-medium ${
                        item.status === 'good' ? 'text-green-400' : 
                        item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Trend:</span>
                      <span className={`ml-2 font-medium ${item.trend > 0 ? 'text-green-400' : item.trend < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        {item.trend > 0 ? '+' : ''}{item.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function RiskScoreSkeleton() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded w-1/3 mb-2 animate-pulse" />
            <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
          </div>
        </div>
        <div className="h-24 bg-white/10 rounded-lg animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </Card>
  );
}