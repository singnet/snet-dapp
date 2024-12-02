import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import HistogramGraph from "./HistogramGraph";
import TreemapGraph from "./TreemapGraph";
import PieGraph from "./PieGraph";

const Graphs = ({ classes, graphs }) => {
  const graphByType = (data, type) => {
    const graphsTypes = {
      histogram: <HistogramGraph data={data} />,
      pie: <PieGraph data={data} />,
      treemap: <TreemapGraph data={data} />,
    };

    return graphsTypes[type];
  };

  return (
    <div className="graphs-container">
      <h2>Quality of the dataset</h2>
      <div className={classes.graphs}>
        {graphs.map((graph) => (
          <div key={graph.displayed_name} className={classes.graphContainer}>
            <p>{graph.displayed_name}</p>
            {graphByType(graph?.data?.children, graph.type)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Graphs);
