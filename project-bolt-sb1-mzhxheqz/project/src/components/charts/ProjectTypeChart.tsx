import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BaseBarChart } from './BaseBarChart';
import { CustomTooltip } from './CustomTooltip';
import { defaultChartProps } from './ChartDefaults';
import type { Project } from '@/lib/types';
import { useMemo } from 'react';
import _ from 'lodash';
import { Bar } from 'recharts';

interface ProjectTypeChartProps {
  data: Project[];
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
        <BaseBarChart
          data={chartData}
          tooltip={CustomTooltip}
        >
          <Bar 
            dataKey="count" 
            fill={defaultChartProps.colors[0]} 
          />
        </BaseBarChart>
      </CardContent>
    </Card>
  );
};