import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CHART_MARGINS } from '@/lib/constants';
import _ from 'lodash';

interface ProjectTypeChartProps {
  data: any[];
}

export const ProjectTypeChart = ({ data }: ProjectTypeChartProps) => {
  const chartData = useMemo(() => 
    _.chain(data)
      .groupBy('Project Type')
      .map((group, type) => ({
        name: type,
        count: group.length
      }))
      .value(),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Type Distribution</CardTitle>
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
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};