import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CHART_MARGINS } from '@/lib/constants';

interface TestingTimelineChartProps {
  data: any[];
  startDate: string;
  endDate: string;
  minDate: string;
  maxDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
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
  const chartData = useMemo(() => {
    const testingProjects = data.filter(project => 
      project['Testing Start'] &&
      project['Testing End']
    );

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    const allDates = new Set();
    const projectDates = testingProjects.map(project => {
      const startDate = new Date(project['Testing Start']);
      const endDate = new Date(project['Testing End']);
      
      const dates = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate && currentDate.getTime() <= endDateTime) {
        if (currentDate.getTime() >= startDateTime) {
          const dateStr = currentDate.toISOString().split('T')[0];
          dates.push(dateStr);
          allDates.add(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return {
        project: project['Project Short Name'],
        dates: dates
      };
    });

    const sortedDates = Array.from(allDates).sort();
    return sortedDates.map(date => ({
      date,
      count: projectDates.filter(project => project.dates.includes(date)).length,
      projects: projectDates
        .filter(project => project.dates.includes(date))
        .map(p => p.project)
    }));
  }, [data, startDate, endDate]);

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
                interval={14}
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