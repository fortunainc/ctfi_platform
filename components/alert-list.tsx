'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertOctagon, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface Alert {
  type: string;
  severity: string;
  message: string;
  action: string;
  timestamp: string;
}

interface AlertData {
  alerts: Alert[];
  total: number;
  critical: number;
  warning: number;
  info: number;
}

export function AlertList({ trialId }: { trialId: string }) {
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    // Poll every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [trialId]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`/api/trials/${trialId}/alerts`);
      const data = await response.json();
      setAlertData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <AlertOctagon className="h-5 w-5 text-red-600" />;
      case 'WARNING': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'INFO': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <CheckCircle2 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 bg-red-50';
      case 'WARNING': return 'border-yellow-500 bg-yellow-50';
      case 'INFO': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'destructive';
      case 'WARNING': return 'default';
      case 'INFO': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (!alertData || alertData.alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active Alerts</span>
            <Badge variant="secondary">0 Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
            <p className="text-gray-600 font-medium">No Active Alerts</p>
            <p className="text-sm text-gray-500 mt-1">All systems operating normally</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Alerts</span>
          <div className="flex gap-2">
            {alertData.critical > 0 && (
              <Badge variant="destructive">{alertData.critical} Critical</Badge>
            )}
            {alertData.warning > 0 && (
              <Badge variant="default">{alertData.warning} Warning</Badge>
            )}
            {alertData.info > 0 && (
              <Badge variant="secondary">{alertData.info} Info</Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertData.alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getSeverityBadgeColor(alert.severity)} className="text-xs">
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{alert.message}</h4>
                  <p className="text-sm text-gray-700">{alert.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}