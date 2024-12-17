interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-4 border rounded shadow">
      <p className="font-bold">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.fill }}>
          {entry.name}: {entry.value} projects
        </p>
      ))}
    </div>
  );
};