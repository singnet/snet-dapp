import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const HistogramGraph = ({ data }) => {
  const dataKeys = Object.keys(data[0]);
  const labelKey = dataKeys[0];
  const valueKey = dataKeys[1];

  return (
    <ComposedChart
      width={400}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey={labelKey} scale="band" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={valueKey} fill="rgba(68, 156, 238, 0.4)" />
    </ComposedChart>
  );
};

export default HistogramGraph;
