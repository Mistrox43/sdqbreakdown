import { Project } from '@/lib/types';

export const getDateRange = (data: Project[]) => {
  const dates = data
    .filter(project => project['Kick-Off Date'] && project['OH Go-Live Date'])
    .flatMap(project => [new Date(project['Kick-Off Date']), new Date(project['OH Go-Live Date'])]);
  
  return {
    minDate: new Date(Math.min(...dates.map(d => d.getTime()))),
    maxDate: new Date(Math.max(...dates.map(d => d.getTime())))
  };
};

export const generateDateArray = (startDate: Date, endDate: Date) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
  return date >= startDate && date <= endDate;
};