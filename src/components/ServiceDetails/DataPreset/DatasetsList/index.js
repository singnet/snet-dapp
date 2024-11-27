import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const DatasetsList = ({ classes, setDatasetInfo, datasets }) => {
  const DatasetLine = ({ name, link, tag }) => {
    return (
      <div onClick={() => setDatasetInfo({ link, name })} className={classes.datasetLine}>
        <div className={classes.datasetName}>{name}</div>
        <div className={classes.datasetTag}>{tag}</div>
      </div>
    );
  };

  return (
    <div className={classes.datasetsContainer}>
      {datasets.map((dataset) => (
        <DatasetLine key={dataset.id} name={dataset.name} link={dataset.link} tag={dataset.tag} />
      ))}
    </div>
  );
};

export default withStyles(useStyles)(DatasetsList);
