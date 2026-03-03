'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Users, Database, Clock, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface RealTimeStatusProps {
  trialId: string;
}

interface StatusData {
  activeSites: number;
  totalPatients: number;
  enrolledPatients: number;
  dataCompleteness: number;
  avgQueryResponseTime: number;
  lastDataUpdate: Date;
  systemHealth: 'healthy' | 'degraded' | 'unhealthy';
}

export default function RealTimeStatus({ trialId }: RealTimeStatusProps) {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>('');

  useEffect(() => {
    loadStatusData();
    const interval = setInterval(() => {
      if (statusData) {
        updateTimeSinceLastUpdate(statusData.lastDataUpdate);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [trialId]);

  useEffect(() => {
    if (statusData) {
      updateTimeSinceLastUpdate(statusData.lastDataUpdate);
    }
  }, [statusData]);

  const loadStatusData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - in production this would be a real API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setStatusData({
        activeSites: 24,
        totalPatients: 1200,
        enrolledPatients: 847,
        dataCompleteness: 94.2,
        avgQueryResponseTime: 2.3,
        lastDataUpdate: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        systemHealth: 'healthy'
      });
    } catch (error) {
      console.error('Error loading status data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTimeSinceLastUpdate = (lastUpdate: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      setTimeSinceUpdate('Just now');
    } else if (diffInMinutes < 60) {
      setTimeSinceUpdate(`${diffInMinutes}m ago`);
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      setTimeSinceUpdate(`${hours}h ago`);
    }
  };

  if (isLoading || !statusData) {
    return <RealTimeStatusSkeleton />;
  }

  const enrollmentRate = ((statusData.enrolledPatients / statusData.totalPatients) * 100).toFixed(1);
  const systemHealthConfig = {
    healthy: { color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle2, label: 'All Systems Operational' },
    degraded: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: AlertCircle, label: 'Some Systems Degraded' },
    unhealthy: { color: 'text-red-400', bg: 'bg-red-400/20', icon: AlertCircle, label: 'Critical Issues Detected' }
  };

  const healthConfig = systemHealthConfig[statusData.systemHealth];
  const HealthIcon = healthConfig.icon;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${healthConfig.bg}`}>
              <Activity className={`h-6 w-6 ${healthConfig.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Real-Time Status</h3>
              <p className="text-slate-400 text-sm">Live trial monitoring</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${healthConfig.bg}`}>
            <HealthIcon className={`h-4 w-4 ${healthConfig.color}`} />
            <span className={`text-xs font-medium ${healthConfig.color}`}>
              {healthConfig.label}
            </span>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4" />
          <span>Last data update: {timeSinceUpdate}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Active Sites */}
          <MetricCard
            icon={<Users className="h-5 w-5 text-blue-400" />}
            label="Active Sites"
            value={statusData.activeSites.toString()}
            trend="+2 this week"
            trendColor="text-green-400"
          />

          {/* Enrollment */}
          <MetricCard
            icon={<TrendingUp className="h-5 w-5 text-green-400" />}
            label="Enrollment Rate"
            value={`${enrollmentRate}%`}
            trend="On target"
            trendColor="text-green-400"
          />

          {/* Data Completeness */}
          <MetricCard
            icon={<Database className="h-5 w-5 text-purple-400" />}
            label="Data Completeness"
            value={`${statusData.dataCompleteness}%`}
            trend="-0.3% vs last week"
            trendColor="text-red-400"
          />
        </div>

        {/* Detailed Metrics */}
        <div className="mt-6 space-y-4">
          {/* Enrollment Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Enrollment Progress</span>
              <span className="text-sm font-medium text-white">
                {statusData.enrolledPatients} / {statusData.totalPatients} patients
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(statusData.enrolledPatients / statusData.totalPatients) * 100}%` }}
              />
            </div>
          </div>

          {/* Query Response Time */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-slate-300">Average Query Response Time</span>
                <p className="text-2xl font-bold text-white mt-1">
                  {statusData.avgQueryResponseTime}s
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Target: &lt;3s</span>
                <p className="text-sm font-medium text-green-400 mt-1">Within target</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Metric Card Component
function MetricCard({
  icon,
  label,
  value,
  trend,
  trendColor
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendColor: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="text-slate-400 text-sm font-medium">{label}</div>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className={`text-xs ${trendColor}`}>{trend}</div>
    </div>
  );
}

// Skeleton Component
function RealTimeStatusSkeleton() {
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
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-16 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-16 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </Card>
  );
}