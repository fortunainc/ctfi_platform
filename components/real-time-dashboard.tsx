'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, TrendingUp, Users, Clock, Zap } from 'lucide-react';

interface SiteData {
  site_id: string;
  patient_count: number;
  enrollment_velocity: number;
  protocol_compliance: number;
  staff_workload: number;
}

interface TrialStatus {
  trial_id: string;
  enrollment_rate: number;
  site_performance_score: number;
  data_quality_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  sites: SiteData[];
  last_updated: string;
}

export function RealTimeDashboard({ trialId }: { trialId: string }) {
  const [status, setStatus] = useState<TrialStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    // Fetch initial data
    fetchStatus();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    
    return () => clearInterval(interval);
  }, [trialId]);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`/api/trials/${trialId}/real-time-status`);
      const data = await response.json();
      setStatus(data);
      setLastUpdate(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trial status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trial data...</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">No trial data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with last update */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trial: {status.trial_id}</h2>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Last updated: {lastUpdate}
          </p>
        </div>
        <Badge variant={
          status.risk_level === 'HIGH' ? 'destructive' :
          status.risk_level === 'MEDIUM' ? 'default' : 'secondary'
        } className="text-sm px-3 py-1">
          {status.risk_level} RISK
        </Badge>
      </div>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrollment Rate Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Enrollment Rate
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {status.enrollment_rate}%
            </div>
            <p className="text-xs text-gray-600 mt-1">Target: 80%</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${status.enrollment_rate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Site Performance Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Site Performance
            </CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {status.site_performance_score}
            </div>
            <p className="text-xs text-gray-600 mt-1">Score: 0-100</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${status.site_performance_score}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Quality Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Data Quality
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {status.data_quality_score}
            </div>
            <p className="text-xs text-gray-600 mt-1">Score: 0-100</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${status.data_quality_score}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Risk Level Card */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Risk Level
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Badge 
                variant={
                  status.risk_level === 'HIGH' ? 'destructive' :
                  status.risk_level === 'MEDIUM' ? 'default' : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {status.risk_level}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Zap className="h-3 w-3" />
                <span>Auto-updates every 30s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Site Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Site ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Patients</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Velocity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Compliance</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Workload</th>
                </tr>
              </thead>
              <tbody>
                {status.sites.map((site) => (
                  <tr key={site.site_id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{site.site_id}</td>
                    <td className="py-3 px-4 text-gray-700">{site.patient_count}</td>
                    <td className="py-3 px-4 text-gray-700">{site.enrollment_velocity.toFixed(1)}/mo</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{site.protocol_compliance.toFixed(0)}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              site.protocol_compliance >= 90 ? 'bg-green-500' :
                              site.protocol_compliance >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${site.protocol_compliance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{site.staff_workload}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              site.staff_workload <= 70 ? 'bg-green-500' :
                              site.staff_workload <= 85 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${site.staff_workload}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}