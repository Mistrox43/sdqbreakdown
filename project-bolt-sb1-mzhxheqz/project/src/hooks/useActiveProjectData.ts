import { useMemo } from 'react';
import { Project } from '@/lib/types';
import { getDateRange, generateDateArray, isDateInRange } from '@/lib/utils/dateUtils';

export const useActiveProjectData = (data: Project[], startDate?: string, endDate?: string) => {
  return useMemo(() => {
    const validProjects = data.filter(
      project => project['Kick-Off Date'] && project['OH Go-Live Date']
    );

    const { minDate, maxDate } = getDateRange(validProjects);
    const dateRange = generateDateArray(
      startDate ? new Date(startDate) : minDate,
      endDate ? new Date(endDate) : maxDate
    );

    const dailyCount = dateRange.map(date => {
      const activeProjects = validProjects.filter(project => 
        isDateInRange(
          date,
          new Date(project['Kick-Off Date']),
          new Date(project['OH Go-Live Date'])
        )
      );

      return {
        date: date.toISOString().split('T')[0],
        count: activeProjects.length,
        projects: activeProjects.map(p => p['Project Short Name'])
      };
    });

    return dailyCount;
  }, [data, startDate, endDate]);
};