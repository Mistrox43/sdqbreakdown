import { COLORS, CHART_MARGINS } from '@/lib/constants';

export const defaultChartProps = {
  margins: CHART_MARGINS,
  colors: COLORS,
  xAxisProps: {
    angle: -45,
    textAnchor: "end",
    height: 60,
    interval: 0, // Show every 14th tick by default
    tick: { dy: 10 }
  },
  yAxisProps: {
    width: 60,
    tickCount: 5, // Limit to 5 ticks on Y axis
    domain: ['dataMin', 'dataMax + 1'], // Ensure proper range
    allowDecimals: false // Only show whole numbers
  },
  timelineXAxisProps: {
    angle: -45,
    textAnchor: "end",
    height: 60,
    interval: 0, // Show date every 30 days for timelines
    tick: { dy: 10 }
  }
} as const;