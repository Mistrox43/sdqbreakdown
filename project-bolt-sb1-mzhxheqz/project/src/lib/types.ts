export interface Project {
  'Project Short Name': string;
  'Project Status': string;
  'LOB': string;
  'Project Type': string;
  'Testing Start': string;
  'Testing End': string;
  'OH Go-Live Date': string;
  'OH Project Lead': string;
  'Kick-Off Date': string;
}

export type ChartData = {
  name: string;
  count: number;
  date?: string;
  projects?: string[];
  [key: string]: any;
};

export interface DateRangeProps {
  startDate: string;
  endDate: string;
  minDate: string;
  maxDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}