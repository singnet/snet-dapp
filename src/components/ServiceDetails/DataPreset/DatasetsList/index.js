import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const DatasetsList = ({ classes, setDatasetInfo, datasets }) => {
  const DatasetLine = ({ name, size, link, tag }) => {
    return (
      <div onClick={() => setDatasetInfo({ link, name, size })} className={classes.datasetLine}>
        <div className={classes.datasetName}>{name}</div>
        <div className={classes.datasetTag}>{tag}</div>
      </div>
    );
  };

  return (
    <div className={classes.datasetsContainer}>
      {datasets.map((dataset) => (
        <DatasetLine key={dataset.id} name={dataset.name} size={dataset.size} link={dataset.link} tag={dataset.tag} />
      ))}
    </div>
  );
};

export default withStyles(useStyles)(DatasetsList);
