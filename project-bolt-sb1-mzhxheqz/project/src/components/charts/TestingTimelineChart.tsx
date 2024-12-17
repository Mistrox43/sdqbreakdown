import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CHART_MARGINS } from '@/lib/constants';
import type { Project, DateRangeProps } from '@/lib/types';
import { useTestingTimelineData } from '@/hooks/useTestingTimelineData';

interface TestingTimelineChartProps extends DateRangeProps {
  data: Project[];
}

export const TestingTimelineChart = ({
  data,
  startDate,
  endDate,
  minDate,
  maxDate,
  setStartDate,
  setEndDate
}: TestingTimelineChartProps) => {
  const chartData = useTestingTimelineData(data, startDate, endDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testing Activity Timeline</CardTitle>
        <div className="flex gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded"
              min={minDate}
              max={maxDate}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded"
              min={minDate}
              max={maxDate}
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
              margin={CHART_MARGINS}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                interval={28}
                tick={{dy: 10}}
              />
              <YAxis 
                label={{ 
                  value: 'Concurrent Testing Projects', 
                  angle: -90, 
                  position: 'insideLeft', 
                  dy: 50 
                }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 border rounded shadow">
                        <p className="font-bold">{payload[0].payload.date}</p>
                        <p className="text-sm">Projects in testing: {payload[0].value}</p>
                        <div className="text-xs mt-2">
                          {payload[0].payload.projects.map((project: string, i: number) => (
                            <div key={i}>{project}</div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};