import { useMemo } from 'react';
import _ from 'lodash';
import type { Project } from '@/lib/types';

export const useChartData = (data: Project[]) => {
  return useMemo(() => {
    const uniqueProjectTypes = Array.from(new Set(data.map(item => item['Project Type']))).filter(Boolean);
    
    const statusData = _.chain(data)
      .groupBy('Project Status')
      .map((group, status) => ({
        name: status,
        sortOrder: parseInt(status.split('-')[0]),
        ..._.mapValues(_.groupBy(group, 'Project Type'), items => items.length)
      }))
      .sortBy('sortOrder')
      .value();

    const lobData = _.chain(data)
      .groupBy('LOB')
      .map((group, lob) => ({
        name: lob,
        count: group.length
      }))
      .value();

    return {
      uniqueProjectTypes,
      statusData,
      lobData
    };
  }, [data]);
};