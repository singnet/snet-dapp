import { Treemap } from "recharts";
import { roundToDesimals } from "../../../../../utility/JSHelper";

const TreemapGraph = ({ data }) => {
  const dataKeys = Object.keys(data[0]);
  const labelKey = dataKeys[0];
  const valueKey = dataKeys[1];

  const getColors = () => {
    const numberOfColors = data.length;
    const transparent = 1 / numberOfColors;
    if (!transparent) {
      return [];
    }
    let colors = [];
    for (let i = 1; i <= numberOfColors; i++) {
      const colorTransparent = roundToDesimals(i * transparent, 4);
      colors.push(`rgba(68, 156, 238, ${colorTransparent})`);
    }

    return colors;
  };

  const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index } = props;
    const colors = getColors();
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
            stroke: "#449CEE",
          }}
        />
        {depth === 1 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            stroke="#000"
            fontSize={14}
            fontWeight={100}
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  return (
    <Treemap
      width={800}
      height={400}
      data={data}
      dataKey={valueKey}
      nameKey={labelKey}
      aspectRatio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
      content={<CustomizedContent />}
    />
  );
};

export default TreemapGraph;
