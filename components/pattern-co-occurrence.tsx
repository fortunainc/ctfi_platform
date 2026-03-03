'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PatternCoOccurrenceProps {
  data: Record<string, Record<string, number>>;
}

export default function PatternCoOccurrence({ data }: PatternCoOccurrenceProps) {
  // Convert to array and sort by total co-occurrences
  const coOccurrencePairs: Array<{
    pattern1: string;
    pattern2: string;
    count: number;
  }> = [];

  Object.entries(data).forEach(([pattern1, patterns]) => {
    Object.entries(patterns).forEach(([pattern2, count]) => {
      coOccurrencePairs.push({ pattern1, pattern2, count });
    });
  });

  coOccurrencePairs.sort((a, b) => b.count - a.count);
  const topPairs = coOccurrencePairs.slice(0, 20);

  if (topPairs.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No co-occurrence data available yet. Patterns need to appear together in contributions.
      </div>
    );
  }

  const maxCount = Math.max(...topPairs.map(p => p.count));

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Showing top {topPairs.length} pattern pairs that appear together most frequently
      </div>

      <div className="space-y-3">
        {topPairs.map(({ pattern1, pattern2, count }, index) => {
          const percentage = (count / maxCount) * 100;
          
          return (
            <Card key={`${pattern1}-${pattern2}`} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm font-medium">{pattern1}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                      <span className="text-muted-foreground">+</span>
                      <span className="text-sm font-medium">{pattern2}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">times together</p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Insights */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold mb-2">💡 What This Means</h4>
        <p className="text-sm text-muted-foreground">
          Patterns that frequently appear together indicate systemic issues. For example, 
          if "Unrealistic Enrollment Timelines" and "Site Burnout" often co-occur, it suggests 
          that aggressive enrollment targets are driving site staff exhaustion.
        </p>
      </Card>
    </div>
  );
}