import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const DatasetsList = ({ classes, setDatasetInfo, datasets }) => {
  const DatasetLine = ({dataset}) => {
    return (
      <div onClick={() => setDatasetInfo(dataset)} className={classes.datasetLine}>
        <div className={classes.datasetName}>{dataset?.name}</div>
        <div className={classes.datasetTag}>{dataset?.tag}</div>
      </div>
    );
  };

  return (
    <div className={classes.datasetsContainer}>
      {datasets.map((dataset, index) => (
        <DatasetLine key={dataset.datasetKey + index} dataset={dataset} />
      ))}
    </div>
  );
};

export default withStyles(useStyles)(DatasetsList);
