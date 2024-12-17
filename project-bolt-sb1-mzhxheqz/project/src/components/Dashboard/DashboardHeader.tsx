import Papa from 'papaparse';

interface DashboardHeaderProps {
  selectedLOBs: string[];
  setSelectedLOBs: (lobs: string[]) => void;
  uniqueLOBs: string[];
  onDataUpload: (data: any[]) => void;
}

export const DashboardHeader = ({
  selectedLOBs,
  setSelectedLOBs,
  uniqueLOBs,
  onDataUpload
}: DashboardHeaderProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const result = Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
          });
          onDataUpload(result.data);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <h1 className="text-2xl font-bold">Service Delivery Queue Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            id="csvFileInput"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="csvFileInput"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Upload New CSV
          </label>
        </div>
        <div className="relative min-w-[200px]">
          <select 
            className="p-2 border rounded w-full"
            multiple
            value={selectedLOBs}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              if (selected.includes('All')) {
                setSelectedLOBs(['All']);
              } else {
                setSelectedLOBs(selected.length ? selected : ['All']);
              }
            }}
            size={Math.min(uniqueLOBs.length, 4)}
          >
            {uniqueLOBs.map(lob => (
              <option key={lob} value={lob} className="p-1">
                {lob}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple
          </div>
        </div>
      </div>
    </div>
  );
};