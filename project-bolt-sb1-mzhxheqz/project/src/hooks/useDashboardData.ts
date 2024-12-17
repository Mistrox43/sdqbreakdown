import { useState, useEffect } from 'react';
import { generateSampleData } from '@/lib/sampleData';

export const useDashboardData = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateSampleData());
  }, []);

  return { data, setData };
};