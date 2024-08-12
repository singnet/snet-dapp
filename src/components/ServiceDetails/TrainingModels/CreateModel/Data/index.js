import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Upload from "./Upload";
import StyledButton from "../../../../common/StyledButton";
import fileDownload from "../../../../../assets/images/fileDownload.svg";
import { useStyles } from "./styles";

const Data = ({ classes, handleNextClick, onBackClick, modelData, setModelData }) => {
  const [trainingDataLink, setTrainingDataLink] = useState("");
  const onNextPress = () => {
    setModelData({ ...modelData, dataLink: trainingDataLink });
    handleNextClick();
  };

  const onDownloadSample = () => {
    const url =
      "https://marketplace-service-assets.s3.amazonaws.com/assets/snet/example-service/Calculator/add/TrainingSample.zip";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "training_sample_add.txt");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className={classes.modelDataContaienr}>
      <div className={classes.createDatasetContainer}>
        <span>Creating your dataset</span>
        <p>
          This AI requires a certain type of data set for Model trainng. Download sample data from following and submit.
        </p>
        <div>
          <img src={fileDownload} alt="File Download" />
          <span>filename.zip</span>
          <StyledButton type="blue" btnText="Download Sample" onClick={onDownloadSample} />
        </div>
      </div>
      <div className={classes.uploadDatasetContainer}>
        <span>Upload your dataset</span>
        <Upload trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink} />
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Back" type="transparent" onClick={onBackClick} />
        <StyledButton btnText="Next" type="blue" onClick={onNextPress} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Data);
