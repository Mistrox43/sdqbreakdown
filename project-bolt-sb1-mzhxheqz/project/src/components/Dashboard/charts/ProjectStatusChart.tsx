import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartTooltip } from './ChartTooltip';
import { COLORS, CHART_MARGINS } from '@/lib/constants';
import _ from 'lodash';

interface ProjectStatusChartProps {
  data: any[];
}

export const ProjectStatusChart = ({ data }: ProjectStatusChartProps) => {
  const uniqueProjectTypes = useMemo(() => 
    Array.from(new Set(data.map(item => item['Project Type']))).filter(Boolean),
    [data]
  );

  const chartData = useMemo(() => 
    _.chain(data)
      .groupBy('Project Status')
      .map((group, status) => {
        const byType = _.groupBy(group, 'Project Type');
        return {
          name: status,
          sortOrder: parseInt(status.split('-')[0]),
          ..._.mapValues(byType, items => items.length)
        };
      })
      .sortBy('sortOrder')
      .value(),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Distribution</CardTitle>
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
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                interval={0}
                tick={{dy: 10}}
              />
              <YAxis />
              <Tooltip content={ChartTooltip} />
              {uniqueProjectTypes.map((type, index) => (
                <Bar 
                  key={type}
                  dataKey={type}
                  stackId="a"
                  name={type}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};