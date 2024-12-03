import { Pie, PieChart } from "recharts";

const PieGraph = ({ data }) => {
  const dataKeys = Object.keys(data[0]);
  const labelKey = dataKeys[0];
  const valueKey = dataKeys[1];

  const RADIAN = Math.PI / 180;
  const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(midAngle * RADIAN) - percent;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {data[index][labelKey]}
      </text>
    );
  };

  return (
    <PieChart width={300} height={400}>
      <Pie
        data={data}
        dataKey={valueKey}
        cx="50%"
        cy="50%"
        fill="rgba(68, 156, 238, 0.4)"
        label={renderCustomizedPieLabel}
        labelLine={false}
      />
    </PieChart>
  );
};

export default PieGraph;
