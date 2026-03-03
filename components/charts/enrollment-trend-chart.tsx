'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface EnrollmentTrendChartProps {
  trialId: string;
}

interface EnrollmentData {
  month: string;
  actual: number;
  projected: number;
  target: number;
}

export default function EnrollmentTrendChart({ trialId }: EnrollmentTrendChartProps) {
  // Mock data - in production this would come from API
  const data: EnrollmentData[] = [
    { month: 'Jan', actual: 45, projected: 50, target: 60 },
    { month: 'Feb', actual: 62, projected: 65, target: 80 },
    { month: 'Mar', actual: 78, projected: 80, target: 100 },
    { month: 'Apr', actual: 95, projected: 95, target: 120 },
    { month: 'May', actual: 112, projected: 110, target: 140 },
    { month: 'Jun', actual: 128, projected: 125, target: 160 },
    { month: 'Jul', actual: 145, projected: 140, target: 180 },
    { month: 'Aug', actual: 162, projected: 155, target: 200 },
    { month: 'Sep', actual: 178, projected: 170, target: 220 },
    { month: 'Oct', actual: 195, projected: 185, target: 240 },
    { month: 'Nov', actual: 210, projected: 200, target: 260 },
    { month: 'Dec', actual: 225, projected: 215, target: 280 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} patients
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/20">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Enrollment Trends</h3>
            <p className="text-slate-400 text-sm">Patient enrollment over time</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Actual"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Projected"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Target"
              dot={false}
            />
            <Brush
              dataKey="month"
              height={30}
              stroke="#94a3b8"
              fill="rgba(255,255,255,0.1)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">225</p>
          <p className="text-sm text-slate-400">Current Patients</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">+180</p>
          <p className="text-sm text-slate-400">vs. Last Year</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">92%</p>
          <p className="text-sm text-slate-400">of Target</p>
        </div>
      </div>
    </Card>
  );
}