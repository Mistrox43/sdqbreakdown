import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { COLORS } from '@/lib/constants';
import _ from 'lodash';

interface LOBDistributionChartProps {
  data: any[];
}

export const LOBDistributionChart = ({ data }: LOBDistributionChartProps) => {
  const chartData = useMemo(() => 
    _.chain(data)
      .groupBy('LOB')
      .map((group, lob) => ({
        name: lob,
        count: group.length
      }))
      .value(),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line of Business Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};