import { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { ProjectStatusChart } from '../charts/ProjectStatusChart';
import { LOBDistributionChart } from '../charts/LOBDistributionChart';
import { ProjectTypeChart } from '../charts/ProjectTypeChart';
import { TestingTimelineChart } from '../charts/TestingTimelineChart';
import { GoLiveAnalysisChart } from '../charts/GoLiveAnalysisChart';
import { ActiveProjectDurationChart } from '../charts/ActiveProjectDurationChart';
import { ProcessInsights } from './ProcessInsights';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDateRange } from '@/hooks/useDateRange';
import { useFilteredData } from '@/hooks/useFilteredData';
import { useActiveProjectData } from '@/hooks/useActiveProjectData';

const Dashboard = () => {
  const { data, setData } = useDashboardData();
  const { startDate, endDate, minDate, maxDate, setStartDate, setEndDate } = useDateRange();
  const { selectedLOBs, setSelectedLOBs, filteredData, uniqueLOBs } = useFilteredData(data);
  const activeProjectData = useActiveProjectData(filteredData, startDate, endDate);

  return (
    <div className="flex flex-col gap-8 p-4">
      <DashboardHeader 
        selectedLOBs={selectedLOBs}
        setSelectedLOBs={setSelectedLOBs}
        uniqueLOBs={uniqueLOBs}
        onDataUpload={setData}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectStatusChart data={filteredData} />
        <LOBDistributionChart data={filteredData} />
        <TestingTimelineChart 
          data={filteredData}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <ActiveProjectDurationChart 
          data={activeProjectData}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>

      <GoLiveAnalysisChart 
        data={filteredData}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <ProcessInsights data={filteredData} />
    </div>
  );
};

export default Dashboard;