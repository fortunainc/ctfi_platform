'use client';

interface QualityTrendsChartProps {
  data: Array<{
    date: string;
    avgScore: number;
  }>;
}

export default function QualityTrendsChart({ data }: QualityTrendsChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No quality data available yet
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const maxScore = 25; // Maximum possible score
  const avgScore = sortedData.reduce((sum, d) => sum + d.avgScore, 0) / sortedData.length;

  return (
    <div className="space-y-6">
      {/* Line chart representation */}
      <div className="space-y-2">
        {sortedData.map(({ date, avgScore }) => {
          const percentage = (avgScore / maxScore) * 100;
          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          
          // Color based on score
          let color = 'bg-red-500';
          if (avgScore >= 20) color = 'bg-green-500';
          else if (avgScore >= 15) color = 'bg-yellow-500';
          else if (avgScore >= 10) color = 'bg-orange-500';
          
          return (
            <div key={date} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{formattedDate}</span>
                <span className="font-medium">{avgScore.toFixed(1)}/25</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`${color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold">{avgScore.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Day</p>
            <p className="text-2xl font-bold">
              {Math.max(...sortedData.map(d => d.avgScore)).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Worst Day</p>
            <p className="text-2xl font-bold">
              {Math.min(...sortedData.map(d => d.avgScore)).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Quality Legend */}
      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">Quality Scale:</p>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Excellent (20-25)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Good (15-19)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Fair (10-14)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Poor (&lt;10)</span>
          </div>
        </div>
      </div>
    </div>
  );
}