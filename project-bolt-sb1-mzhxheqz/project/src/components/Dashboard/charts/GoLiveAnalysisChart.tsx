import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartTooltip } from './ChartTooltip';
import { COLORS, CHART_MARGINS } from '@/lib/constants';
import _ from 'lodash';

interface GoLiveAnalysisChartProps {
  data: any[];
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
  const uniqueProjectTypes = useMemo(() => 
    Array.from(new Set(data.map(item => item['Project Type']))).filter(Boolean),
    [data]
  );

  const chartData = useMemo(() => {
    const goLiveProjects = data.filter(project => 
      project['Project Status'] === '05 - Post Go-Live' &&
      project['OH Go-Live Date'] &&
      new Date(project['OH Go-Live Date']) >= new Date(startDate) &&
      new Date(project['OH Go-Live Date']) <= new Date(endDate)
    );

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

    return Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([month, types]) => ({
        month,
        ...types as Record<string, number>
      }));
  }, [data, startDate, endDate]);

  const totalGoLives = useMemo(() => 
    data.filter(project => 
      project['Project Status'] === '05 - Post Go-Live' &&
      project['OH Go-Live Date'] &&
      new Date(project['OH Go-Live Date']) >= new Date(startDate) &&
      new Date(project['OH Go-Live Date']) <= new Date(endDate)
    ).length,
    [data, startDate, endDate]
  );

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
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                ...CHART_MARGINS,
                top: 40
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                interval={0}
              />
              <YAxis 
                label={{ 
                  value: 'Number of Go-Lives', 
                  angle: -90, 
                  position: 'insideLeft', 
                  dy: 50
                }} 
              />
              <Tooltip content={ChartTooltip} />
              {uniqueProjectTypes.map((type, index) => (
                <Bar 
                  key={type} 
                  dataKey={type} 
                  stackId="a" 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p className="font-medium">Total Go-Lives in Period: {totalGoLives}</p>
        </div>
      </CardContent>
    </Card>
  );
};