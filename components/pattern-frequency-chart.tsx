'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PatternFrequencyChartProps {
  data: [string, number][];
}

export default function PatternFrequencyChart({ data }: PatternFrequencyChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No pattern data available yet
      </div>
    );
  }

  const maxCount = Math.max(...data.map(([, count]) => count));

  return (
    <div className="space-y-4">
      {data.map(([pattern, count], index) => {
        const percentage = (count / maxCount) * 100;
        
        return (
          <div key={pattern} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
                <span className="font-medium">{pattern}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {count} occurrence{count !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}