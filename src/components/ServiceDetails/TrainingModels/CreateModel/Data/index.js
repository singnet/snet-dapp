import React from "react";
import { withStyles } from "@mui/styles";
import Upload from "./Upload";
import { useStyles } from "./styles";

const Dataset = ({ classes, trainingDataset, setTrainingDataset }) => {
  return (
    <div className={classes.modelDataContaienr}>
      <div className={classes.createDatasetContainer}>
        <h3>Creating your dataset</h3>
        {/* <p>
          Your dataset in <span>.ZIP</span> format, weighing less than <span>1.5MB</span> contain two text files:{" "}
          <span>train.txt</span> (2-10k lines) and <span>val.txt</span> (100-500 lines). Each line equals to one
          paragraph of text.
        </p> */}
      </div>
      <div className={classes.uploadDatasetContainer}>
        {/* <p>Upload your dataset</p> */}
        <Upload trainingDataset={trainingDataset} setTrainingDataset={setTrainingDataset} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Dataset);
