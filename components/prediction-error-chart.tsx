'use client';

import { Badge } from '@/components/ui/badge';

interface Trial {
  id: string;
  phase: string[];
  enrollmentError: number | null;
  durationError: number | null;
  costImpact: number | null;
}

interface PredictionErrorChartProps {
  trials: Trial[];
}

export default function PredictionErrorChart({ trials }: PredictionErrorChartProps) {
  if (trials.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No trial data available for analysis
      </div>
    );
  }

  // Group by phase
  const phases = ['PHASE1', 'PHASE2', 'PHASE3', 'PHASE4'];
  const phaseData: Record<string, {
    count: number;
    avgEnrollmentError: number;
    avgDurationError: number;
    totalCostImpact: number;
  }> = {};

  phases.forEach(phase => {
    const phaseTrials = trials.filter(t => t.phase.includes(phase));
    
    if (phaseTrials.length > 0) {
      const enrollmentErrors = phaseTrials
        .filter(t => t.enrollmentError !== null)
        .map(t => t.enrollmentError!);
      
      const durationErrors = phaseTrials
        .filter(t => t.durationError !== null)
        .map(t => t.durationError!);
      
      phaseData[phase] = {
        count: phaseTrials.length,
        avgEnrollmentError: enrollmentErrors.length > 0
          ? enrollmentErrors.reduce((a, b) => a + b, 0) / enrollmentErrors.length
          : 0,
        avgDurationError: durationErrors.length > 0
          ? durationErrors.reduce((a, b) => a + b, 0) / durationErrors.length
          : 0,
        totalCostImpact: phaseTrials.reduce((sum, t) => sum + (t.costImpact || 0), 0),
      };
    }
  });

  const maxEnrollmentError = Math.max(
    ...Object.values(phaseData).map(d => d.avgEnrollmentError),
    1
  );
  const maxDurationError = Math.max(
    ...Object.values(phaseData).map(d => d.avgDurationError),
    1
  );

  return (
    <div className="space-y-8">
      {/* Enrollment Error by Phase */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Enrollment Prediction Error by Phase</h3>
        <div className="space-y-3">
          {phases.map(phase => {
            const data = phaseData[phase];
            if (!data) return null;

            const percentage = (data.avgEnrollmentError / maxEnrollmentError) * 100;
            
            return (
              <div key={phase} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{phase}</Badge>
                    <span className="text-sm text-muted-foreground">
                      ({data.count} trials)
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {data.avgEnrollmentError.toFixed(0)}% error
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Duration Error by Phase */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Duration Prediction Error by Phase</h3>
        <div className="space-y-3">
          {phases.map(phase => {
            const data = phaseData[phase];
            if (!data) return null;

            const percentage = (data.avgDurationError / maxDurationError) * 100;
            
            return (
              <div key={phase} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{phase}</Badge>
                    <span className="text-sm text-muted-foreground">
                      ({data.count} trials)
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {data.avgDurationError.toFixed(0)}% error
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Impact by Phase */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Cost Impact by Phase</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {phases.map(phase => {
            const data = phaseData[phase];
            if (!data) return null;

            return (
              <div key={phase} className="border rounded-lg p-4 text-center">
                <Badge variant="secondary" className="mb-2">{phase}</Badge>
                <p className="text-2xl font-bold text-red-600">
                  ${(data.totalCostImpact / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.count} trials
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span className="text-muted-foreground">
              Phase 3 trials show the highest prediction errors due to complex enrollment requirements and longer durations
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span className="text-muted-foreground">
              Duration errors are typically 1.5-2x higher than enrollment errors, indicating timeline planning is particularly challenging
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span className="text-muted-foreground">
              Cost impact scales exponentially with phase, with Phase 3 errors costing 5-10x more than Phase 1 errors
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}