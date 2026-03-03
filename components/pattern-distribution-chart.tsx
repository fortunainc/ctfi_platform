'use client';

import { Badge } from '@/components/ui/badge';

interface PatternDistributionChartProps {
  data: Record<string, number>;
}

export default function PatternDistributionChart({ data }: PatternDistributionChartProps) {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No distribution data available yet
      </div>
    );
  }

  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const maxCount = Math.max(...entries.map(([, count]) => count));

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500',
  ];

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="space-y-4">
        {entries.map(([type, count], index) => {
          const percentage = (count / maxCount) * 100;
          const sharePercentage = ((count / total) * 100).toFixed(1);
          
          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {count} ({sharePercentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`${colors[index % colors.length]} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total Patterns</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Pattern Types</p>
          <p className="text-2xl font-bold">{entries.length}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Most Common</p>
          <p className="text-lg font-bold">{entries[0]?.[0] || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Least Common</p>
          <p className="text-lg font-bold">{entries[entries.length - 1]?.[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}