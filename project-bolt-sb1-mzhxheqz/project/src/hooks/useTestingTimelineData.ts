import { useMemo } from 'react';
import type { Project } from '@/lib/types';
import { getDateRange, generateDateArray, isDateInRange } from '@/lib/utils/dateUtils';

export const useTestingTimelineData = (data: Project[], startDate?: string, endDate?: string) => {
  return useMemo(() => {
    const testingProjects = data.filter(project => 
      project['Testing Start'] &&
      project['Testing End']
    );

    const { minDate, maxDate } = getDateRange(testingProjects);
    const dateRange = generateDateArray(
      startDate ? new Date(startDate) : minDate,
      endDate ? new Date(endDate) : maxDate
    );

    const dailyCount = dateRange.map(date => {
      const activeProjects = testingProjects.filter(project => 
        isDateInRange(
          date,
          new Date(project['Testing Start']),
          new Date(project['Testing End'])
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