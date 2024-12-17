import { useState } from 'react';

export const useDateRange = () => {
  const defaultStartDate = new Date();
  defaultStartDate.setDate(1);
  const defaultEndDate = new Date(defaultStartDate);
  defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 2);
  
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(defaultEndDate.toISOString().split('T')[0]);
  const [minDate] = useState('2024-01-01');
  const [maxDate] = useState('2026-12-31');

  return {
    startDate,
    endDate,
    minDate,
    maxDate,
    setStartDate,
    setEndDate
  };
};