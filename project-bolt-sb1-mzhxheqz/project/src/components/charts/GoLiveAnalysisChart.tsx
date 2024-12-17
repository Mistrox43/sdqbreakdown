import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BaseBarChart } from './BaseBarChart';
import { CustomTooltip } from './CustomTooltip';
import { defaultChartProps } from './ChartDefaults';
import type { Project } from '@/lib/types';
import { useMemo } from 'react';
import { Bar } from 'recharts';
import _ from 'lodash';

interface GoLiveAnalysisChartProps {
  data: Project[];
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export const GoLiveAnalysisChart = ({
  data,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: GoLiveAnalysisChartProps) => {
  const { chartData, uniqueProjectTypes, totalGoLives } = useMemo(() => {
   const goLiveProjects = data.filter(project =>
  (project['Project Status'] === '05 - Post Go-Live' || project['Project Status'] === '06 - Complete') &&
  project['OH Go-Live Date'] &&
  new Date(project['OH Go-Live Date']) >= new Date(startDate) &&
  new Date(project['OH Go-Live Date']) <= new Date(endDate)
    );

    const types = Array.from(new Set(data.map(item => item['Project Type']))).filter(Boolean);

    const monthlyData = {};
    goLiveProjects.forEach(project => {
      const date = new Date(project['OH Go-Live Date']);
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {};
      }
      
      const projectType = project['Project Type'];
      monthlyData[monthKey][projectType] = (monthlyData[monthKey][projectType] || 0) + 1;
    });

    return {
      chartData: Object.entries(monthlyData)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([month, types]) => ({
          month,
          ...types as Record<string, number>
        })),
      uniqueProjectTypes: types,
      totalGoLives: goLiveProjects.length
    };
  }, [data, startDate, endDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Go-Live Analysis</CardTitle>
        <div className="flex gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <BaseBarChart
          data={chartData}
          xAxisKey="month"
          tooltip={CustomTooltip}
        >
          {uniqueProjectTypes.map((type, index) => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              name={type}
              fill={defaultChartProps.colors[index % defaultChartProps.colors.length]}
            />
          ))}
        </BaseBarChart>
        <div className="mt-4">
          <p className="font-medium">Total Go-Lives in Period: {totalGoLives}</p>
        </div>
      </CardContent>
    </Card>
  );
};