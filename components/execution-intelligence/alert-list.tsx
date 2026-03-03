'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  X, 
  Filter, 
  Search, 
  Check, 
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

interface AlertListProps {
  trialId: string;
}

interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  site?: string;
  timestamp: Date;
  acknowledged: boolean;
  category: string;
}

export default function AlertList({ trialId }: AlertListProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  useEffect(() => {
    loadAlerts();
  }, [trialId]);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - in production this would be a real API
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockAlerts: Alert[] = [
        {
          id: '1',
          severity: 'critical',
          title: 'Enrollment Below Target',
          description: 'Site NY-001 has not enrolled any patients in the past 14 days, falling significantly behind the projected enrollment rate.',
          site: 'NY-001',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          acknowledged: false,
          category: 'Enrollment'
        },
        {
          id: '2',
          severity: 'high',
          title: 'Data Quality Issue Detected',
          description: 'Multiple data points missing from CRF forms at site CA-003. Missing data exceeds 15% threshold.',
          site: 'CA-003',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          acknowledged: false,
          category: 'Data Quality'
        },
        {
          id: '3',
          severity: 'medium',
          title: 'Site Performance Decline',
          description: 'Site TX-002 showing 20% decrease in patient visit completion rate compared to previous month.',
          site: 'TX-002',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          acknowledged: true,
          category: 'Site Performance'
        },
        {
          id: '4',
          severity: 'low',
          title: 'Upcoming Protocol Deviation Review',
          description: 'Scheduled review for protocol deviation at site FL-001 requires attention before next monitoring visit.',
          site: 'FL-001',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          acknowledged: false,
          category: 'Regulatory'
        },
        {
          id: '5',
          severity: 'medium',
          title: 'Staffing Changes Reported',
          description: 'Primary investigator at site IL-004 has announced upcoming departure. Transition plan needed.',
          site: 'IL-004',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          acknowledged: false,
          category: 'Site Operations'
        }
      ];
      
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    if (expandedAlert === alertId) {
      setExpandedAlert(null);
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { 
          color: 'text-red-400', 
          bg: 'bg-red-400/20', 
          border: 'border-red-400/30',
          icon: AlertTriangle 
        };
      case 'high':
        return { 
          color: 'text-orange-400', 
          bg: 'bg-orange-400/20', 
          border: 'border-orange-400/30',
          icon: AlertTriangle 
        };
      case 'medium':
        return { 
          color: 'text-yellow-400', 
          bg: 'bg-yellow-400/20', 
          border: 'border-yellow-400/30',
          icon: Clock 
        };
      case 'low':
        return { 
          color: 'text-blue-400', 
          bg: 'bg-blue-400/20', 
          border: 'border-blue-400/30',
          icon: Clock 
        };
      default:
        return { 
          color: 'text-slate-400', 
          bg: 'bg-slate-400/20', 
          border: 'border-slate-400/30',
          icon: Clock 
        };
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.severity === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  if (isLoading) {
    return <AlertListSkeleton />;
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Alerts</h3>
            {unacknowledgedCount > 0 && (
              <Badge className="bg-red-500 text-white">{unacknowledgedCount}</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
            onClick={() => setExpandedAlert(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <p className="text-slate-400">No alerts match your criteria</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const SeverityIcon = config.icon;
            const isExpanded = expandedAlert === alert.id;

            return (
              <div
                key={alert.id}
                className={`border rounded-lg transition-all duration-200 ${
                  config.border} ${config.bg} ${
                  alert.acknowledged ? 'opacity-60' : ''
                } ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Alert Header */}
                <div
                  className="p-3 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <SeverityIcon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${config.color} truncate`}>
                            {alert.title}
                          </h4>
                          {!alert.acknowledged && (
                            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {alert.site && `${alert.site} • `}
                          {alert.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 animate-in slide-in-from-top-2">
                    <p className="text-sm text-slate-300 mb-3">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span>{formatTimeAgo(alert.timestamp)}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            acknowledgeAlert(alert.id);
                          }}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissAlert(alert.id);
                        }}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

function AlertListSkeleton() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
      <div className="p-4 border-b border-white/10 space-y-4">
        <div className="h-6 bg-white/10 rounded w-1/3 animate-pulse" />
        <div className="h-10 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-white/10 rounded-lg animate-pulse" />
        ))}
      </div>
    </Card>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
}