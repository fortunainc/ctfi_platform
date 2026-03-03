'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, TrendingDown, Activity, ArrowUpDown } from 'lucide-react';

interface SitePerformanceHeatmapProps {
  trialId: string;
}

interface SiteData {
  id: string;
  name: string;
  location: string;
  enrollmentRate: number;
  dataQuality: number;
  visitCompletion: number;
  overallScore: number;
  trend: 'up' | 'down' | 'stable';
}

export default function SitePerformanceHeatmap({ trialId }: SitePerformanceHeatmapProps) {
  const [sortBy, setSortBy] = useState<'overallScore' | 'enrollmentRate' | 'dataQuality' | 'visitCompletion'>('overallScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data - in production this would come from API
  const sites: SiteData[] = [
    { id: 'NY-001', name: 'Manhattan Medical Center', location: 'New York, NY', enrollmentRate: 95, dataQuality: 92, visitCompletion: 88, overallScore: 92, trend: 'up' },
    { id: 'CA-003', name: 'Sunset Research Institute', location: 'Los Angeles, CA', enrollmentRate: 88, dataQuality: 78, visitCompletion: 85, overallScore: 84, trend: 'stable' },
    { id: 'TX-002', name: 'Lone Star Clinical Trials', location: 'Houston, TX', enrollmentRate: 72, dataQuality: 85, visitCompletion: 80, overallScore: 79, trend: 'down' },
    { id: 'FL-001', name: 'Miami Research Center', location: 'Miami, FL', enrollmentRate: 85, dataQuality: 90, visitCompletion: 82, overallScore: 86, trend: 'up' },
    { id: 'IL-004', name: 'Chicago Medical Institute', location: 'Chicago, IL', enrollmentRate: 78, dataQuality: 82, visitCompletion: 75, overallScore: 78, trend: 'stable' },
    { id: 'WA-005', name: 'Pacific Northwest Research', location: 'Seattle, WA', enrollmentRate: 90, dataQuality: 88, visitCompletion: 92, overallScore: 90, trend: 'up' },
    { id: 'MA-006', name: 'Boston Clinical Studies', location: 'Boston, MA', enrollmentRate: 82, dataQuality: 94, visitCompletion: 78, overallScore: 85, trend: 'stable' },
    { id: 'CO-007', name: 'Rocky Mountain Trials', location: 'Denver, CO', enrollmentRate: 68, dataQuality: 75, visitCompletion: 70, overallScore: 71, trend: 'down' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/30 text-green-400 border-green-500/50';
    if (score >= 80) return 'bg-blue-500/30 text-blue-400 border-blue-500/50';
    if (score >= 70) return 'bg-yellow-500/30 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/30 text-red-400 border-red-500/50';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-slate-400" />;
    }
  };

  const sortedSites = [...sites].sort((a, b) => {
    const comparison = a[sortBy] - b[sortBy];
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <MapPin className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Site Performance</h3>
            <p className="text-slate-400 text-sm">Comparative analysis across sites</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-white"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Heatmap Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                Site
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('enrollmentRate')}>
                <div className="flex items-center justify-center gap-1">
                  Enrollment
                  {sortBy === 'enrollmentRate' && (
                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('dataQuality')}>
                <div className="flex items-center justify-center gap-1">
                  Data Quality
                  {sortBy === 'dataQuality' && (
                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('visitCompletion')}>
                <div className="flex items-center justify-center gap-1">
                  Visit Completion
                  {sortBy === 'visitCompletion' && (
                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('overallScore')}>
                <div className="flex items-center justify-center gap-1">
                  Overall Score
                  {sortBy === 'overallScore' && (
                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSites.map((site) => (
              <tr key={site.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-white">{site.name}</div>
                    <div className="text-sm text-slate-400">{site.location}</div>
                  </div>
                </td>
                <td className="py-4 px-2 text-center">
                  <HeatmapCell value={site.enrollmentRate} />
                </td>
                <td className="py-4 px-2 text-center">
                  <HeatmapCell value={site.dataQuality} />
                </td>
                <td className="py-4 px-2 text-center">
                  <HeatmapCell value={site.visitCompletion} />
                </td>
                <td className="py-4 px-2 text-center">
                  <Badge className={`border ${getScoreColor(site.overallScore)}`}>
                    {site.overallScore}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  {getTrendIcon(site.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-sm text-slate-400">Excellent (90+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-sm text-slate-400">Good (80-89)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-sm text-slate-400">Fair (70-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-sm text-slate-400">Poor (&lt;70)</span>
        </div>
      </div>
    </Card>
  );
}

function HeatmapCell({ value }: { value: number }) {
  const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'bg-green-500/80';
    if (value >= 80) return 'bg-blue-500/80';
    if (value >= 70) return 'bg-yellow-500/80';
    return 'bg-red-500/80';
  };

  const getTextColor = (value: number) => {
    if (value >= 70) return 'text-white';
    return 'text-white';
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`w-16 h-8 rounded ${getHeatmapColor(value)} ${getTextColor(value)} flex items-center justify-center text-sm font-medium`}>
        {value}%
      </div>
    </div>
  );
}