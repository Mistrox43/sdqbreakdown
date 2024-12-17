import { useState, useMemo } from 'react';

export const useFilteredData = (data: any[]) => {
  const [selectedLOBs, setSelectedLOBs] = useState(['All']);

  const filteredData = useMemo(() => 
    selectedLOBs.includes('All')
      ? data
      : data.filter(item => selectedLOBs.includes(item.LOB)),
    [data, selectedLOBs]
  );

  const uniqueLOBs = useMemo(() => 
    ['All', ...new Set(data.map(item => item.LOB))].filter(Boolean),
    [data]
  );

  return {
    selectedLOBs,
    setSelectedLOBs,
    filteredData,
    uniqueLOBs
  };
};