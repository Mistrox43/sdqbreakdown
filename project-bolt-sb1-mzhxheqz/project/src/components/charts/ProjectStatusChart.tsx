import { Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BaseBarChart } from './BaseBarChart';
import { CustomTooltip } from './CustomTooltip';
import { defaultChartProps } from './ChartDefaults';
import type { Project } from '@/lib/types';
import { useMemo } from 'react';
import _ from 'lodash';

interface ProjectStatusChartProps {
  data: Project[];
}

export const ProjectStatusChart = ({ data }: ProjectStatusChartProps) => {
  const { chartData, uniqueProjectTypes } = useMemo(() => {
    const types = Array.from(new Set(data.map(item => item['Project Type']))).filter(Boolean);
    const statusData = _.chain(data)
      .groupBy('Project Status')
      .map((group, status) => ({
        name: status,
        sortOrder: parseInt(status.split('-')[0]),
        ..._.mapValues(_.groupBy(group, 'Project Type'), items => items.length)
      }))
      .sortBy('sortOrder')
      .value();

    return {
      chartData: statusData,
      uniqueProjectTypes: types
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <BaseBarChart
          data={chartData}
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
      </CardContent>
    </Card>
  );
};