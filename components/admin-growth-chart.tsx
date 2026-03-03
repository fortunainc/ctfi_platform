'use client';

interface AdminGrowthChartProps {
  data: Record<string, number>;
}

export default function AdminGrowthChart({ data }: AdminGrowthChartProps) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
  
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No growth data available yet
      </div>
    );
  }

  const maxValue = Math.max(...entries.map(([, value]) => value));
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="space-y-6">
      {/* Simple bar chart */}
      <div className="space-y-2">
        {entries.map(([date, count]) => {
          const percentage = maxValue > 0 ? (count / maxValue) * 100 : 0;
          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          
          return (
            <div key={date} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{formattedDate}</span>
                <span className="font-medium">{count} users</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Total New Users</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg per Day</p>
            <p className="text-2xl font-bold">
              {entries.length > 0 ? (total / entries.length).toFixed(1) : '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}