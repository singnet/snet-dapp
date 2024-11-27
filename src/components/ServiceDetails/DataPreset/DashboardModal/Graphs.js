import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Treemap } from "recharts";

const Graphs = ({ classes, name, type, data }) => {
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

  const PieGraph = () => {
    return (
      <PieChart width={300} height={400}>
        <Pie
          data={data}
          dataKey={valueKey}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          label={renderCustomizedPieLabel}
          labelLine={false}
        />
      </PieChart>
    );
  };

  const COLORS = ["#8889DD", "#9597E4", "#8DC77B", "#A5D297", "#E2CF45", "#F8C12D"];

  const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index, colors } = props;
    const label = props[labelKey];

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : "#ffffff00",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={100}>
            {label}
          </text>
        )}
      </g>
    );
  };

  const WordCloudGraph = () => {
    return (
      <Treemap
        width={400}
        height={400}
        data={data}
        dataKey={valueKey}
        nameKey={labelKey}
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      />
    );
  };

  const HistogramGraph = () => {
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
        <Bar dataKey={valueKey} barSize={20} fill="#413ea0" />
      </ComposedChart>
    );
  };

  const graphTypes = {
    histogram: <HistogramGraph />,
    pie: <PieGraph />,
    word_cloud: <WordCloudGraph />,
  };

  return (
    <div className={classes.graphContainer}>
      <p>{name}</p>
      {graphTypes[type]}
    </div>
  );
};

export default withStyles(useStyles)(Graphs);
