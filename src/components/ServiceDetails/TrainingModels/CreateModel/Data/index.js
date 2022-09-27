import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import Upload from "./Upload";
import StyledButton from "../../../../common/StyledButton";
import fileDownload from "../../../../../assets/images/fileDownload.svg";
import { useStyles } from "./styles";

const Data = ({ classes, handleNextClick, onBackClick,trainingDataLink, setTrainingDataLink,
  handleNextClickCreateModel
}) => {
  
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
          <StyledButton type="blue" btnText="Download Sample" />
        </div>
      </div>
      <div className={classes.uploadDatasetContainer}>
        <span>Upload your dataset</span>
        <Upload trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink}/>
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Back" type="transparent" onClick={onBackClick} />
        {/* <StyledButton btnText="Next" type="blue" onClick={handleNextClick} /> */}
        <StyledButton btnText="Next" type="blue" onClick={handleNextClickCreateModel} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Data);
