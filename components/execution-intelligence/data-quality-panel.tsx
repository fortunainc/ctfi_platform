'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Database, CheckCircle, AlertCircle, Clock, FileCheck, TrendingUp } from 'lucide-react';

interface DataQualityPanelProps {
  trialId: string;
}

interface QualityMetrics {
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  overall: number;
}

export default function DataQualityPanel({ trialId }: DataQualityPanelProps) {
  // Mock data - in production this would come from API
  const metrics: QualityMetrics = {
    completeness: 94.2,
    accuracy: 97.8,
    timeliness: 89.5,
    consistency: 96.3,
    overall: 94.5
  };

  const metricItems = [
    {
      name: 'Data Completeness',
      value: metrics.completeness,
      description: 'Percentage of required fields filled',
      icon: <Database className="h-5 w-5 text-blue-400" />,
      trend: '+0.5%',
      trendColor: 'text-green-400'
    },
    {
      name: 'Data Accuracy',
      value: metrics.accuracy,
      description: 'Correctness of entered data',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      trend: '+1.2%',
      trendColor: 'text-green-400'
    },
    {
      name: 'Data Timeliness',
      value: metrics.timeliness,
      description: 'Data entered within required timeframe',
      icon: <Clock className="h-5 w-5 text-yellow-400" />,
      trend: '-0.8%',
      trendColor: 'text-red-400'
    },
    {
      name: 'Data Consistency',
      value: metrics.consistency,
      description: 'Consistency across data sources',
      icon: <FileCheck className="h-5 w-5 text-purple-400" />,
      trend: '+0.3%',
      trendColor: 'text-green-400'
    }
  ];

  const getProgressColor = (value: number) => {
    if (value >= 95) return 'from-green-500 to-emerald-500';
    if (value >= 90) return 'from-blue-500 to-cyan-500';
    if (value >= 85) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Data Quality Metrics</h3>
            <p className="text-slate-400 text-sm">Overall data quality assessment</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{metrics.overall}%</div>
          <div className="flex items-center gap-1 text-sm text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span>+0.7% vs last week</span>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Overall Data Quality Score</span>
          <span className="text-sm font-medium text-white">{metrics.overall}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor(metrics.overall)} rounded-full transition-all duration-1000`}
            style={{ width: `${metrics.overall}%` }}
          />
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metricItems.map((metric, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {metric.icon}
                <div>
                  <div className="font-medium text-white text-sm">{metric.name}</div>
                  <div className="text-xs text-slate-400">{metric.description}</div>
                </div>
              </div>
              <div className={`text-sm font-medium ${metric.trendColor}`}>
                {metric.trend}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(metric.value)} rounded-full transition-all duration-1000`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <span className="text-lg font-semibold text-white w-12 text-right">
                {metric.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Status */}
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="font-medium text-green-400">Excellent Data Quality</div>
            <div className="text-sm text-slate-300">
              Data quality exceeds industry standards. All metrics are within acceptable ranges.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}