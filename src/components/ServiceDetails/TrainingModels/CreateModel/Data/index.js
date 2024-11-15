import React from "react";
import { withStyles } from "@mui/styles";
import Upload from "./Upload";
import { useStyles } from "./styles";

const Dataset = ({ classes, trainingDataLink, setTrainingDataLink }) => {
  return (
    <div className={classes.modelDataContaienr}>
      <div className={classes.createDatasetContainer}>
        <h3>Creating your dataset</h3>
        <p>
          Your dataset should in <span>.ZIP</span> format, weighing less than <span>50MB</span> contain two text files:{" "}
          <span>train.txt</span> and <span>val.txt</span>
        </p>
      </div>
      <div className={classes.uploadDatasetContainer}>
        <p>Upload your dataset</p>
        <Upload trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Dataset);
