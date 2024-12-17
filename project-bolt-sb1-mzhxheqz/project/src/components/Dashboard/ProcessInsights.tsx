interface ProcessInsightsProps {
  data: any[];
}

export const ProcessInsights = ({ data }: ProcessInsightsProps) => {
  const planningWithoutLead = data.filter(project => 
    project['Project Status'] === '03 - Planning' && 
    (!project['OH Project Lead'] || project['OH Project Lead'].trim() === '')
  ).length;

  const inInitiation = data.filter(project => 
    project['Project Status'] === '01 - Initiation'
  ).length;

  const completed = data.filter(project => 
    project['Project Status'] === '05 - Post Go-Live'
  ).length;

  const inExecution = data.filter(project => 
    project['Project Status'] === '04 - Execution'
  ).length;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Process Insights</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <InsightCard
          value={planningWithoutLead}
          label="Planning Status without OH Project Lead"
          color="red"
        />
        <InsightCard
          value={inInitiation}
          label="Projects in Initiation"
          color="blue"
        />
        <InsightCard
          value={completed}
          label="Completed Projects"
          color="green"
        />
        <InsightCard
          value={inExecution}
          label="Projects in Execution"
          color="yellow"
        />
      </div>
    </div>
  );
};

interface InsightCardProps {
  value: number;
  label: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
}

const InsightCard = ({ value, label, color }: InsightCardProps) => {
  const colorClasses = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>
        {value}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};