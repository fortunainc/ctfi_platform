'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingDown, CheckCircle2, Lightbulb } from 'lucide-react';

interface RiskAnalysis {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  factors: Record<string, number>;
  recommendations: string[];
}

export function RiskScoreCard({ trialId }: { trialId: string }) {
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskScore();
  }, [trialId]);

  const fetchRiskScore = async () => {
    try {
      const response = await fetch(`/api/trials/${trialId}/risk-score`);
      const data = await response.json();
      setRiskAnalysis(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching risk score:', error);
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

  if (!riskAnalysis) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-gray-600">No risk data available</p>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'HIGH': return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'MEDIUM': return <TrendingDown className="h-6 w-6 text-yellow-600" />;
      case 'LOW': return <Shield className="h-6 w-6 text-green-600" />;
      default: return <CheckCircle2 className="h-6 w-6 text-gray-600" />;
    }
  };

  const getFactorLabel = (key: string): string => {
    const labels: Record<string, string> = {
      enrollmentRate: 'Enrollment Rate',
      sitePerformance: 'Site Performance',
      dataQuality: 'Data Quality',
      protocolComplexity: 'Protocol Complexity',
      staffTurnover: 'Staff Turnover',
      timelinePressure: 'Timeline Pressure',
    };
    return labels[key] || key;
  };

  return (
    <div className="space-y-6">
      {/* Main Risk Score Card */}
      <Card className={`border-2 ${getRiskColor(riskAnalysis.level)}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Risk Analysis</span>
            {getRiskIcon(riskAnalysis.level)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            {/* Risk Score */}
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{riskAnalysis.score}</div>
              <div className="text-sm text-gray-600">Risk Score</div>
            </div>
            
            {/* Risk Level Badge */}
            <div className="flex-1">
              <Badge 
                variant={
                  riskAnalysis.level === 'HIGH' ? 'destructive' :
                  riskAnalysis.level === 'MEDIUM' ? 'default' : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {riskAnalysis.level} RISK LEVEL
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(riskAnalysis.factors).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {getFactorLabel(key)}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {value.toFixed(0)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        value >= 70 ? 'bg-red-500' :
                        value >= 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(value, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span className="text-lg">Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {riskAnalysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  riskAnalysis.level === 'HIGH' ? 'bg-red-500' :
                  riskAnalysis.level === 'MEDIUM' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <span className="text-sm text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}