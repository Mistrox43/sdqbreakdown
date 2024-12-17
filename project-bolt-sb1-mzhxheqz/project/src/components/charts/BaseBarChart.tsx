import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { defaultChartProps } from './ChartDefaults';
import type { ChartData } from '@/lib/types';

interface BaseBarChartProps {
  data: ChartData[];
  xAxisKey?: string;
  yAxisKey?: string;
  height?: number;
  tooltip?: React.ReactNode;
  children?: React.ReactNode;
  isTimeline?: boolean;
}

export const BaseBarChart = ({
  data,
  xAxisKey = "name",
  yAxisKey = "count",
  height = 400,
  tooltip,
  children,
  isTimeline = false
}: BaseBarChartProps) => {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={defaultChartProps.margins}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            {...(isTimeline ? defaultChartProps.timelineXAxisProps : defaultChartProps.xAxisProps)}
          />
          <YAxis
            {...defaultChartProps.yAxisProps}
          />
          <Tooltip content={tooltip} />
          {children}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};