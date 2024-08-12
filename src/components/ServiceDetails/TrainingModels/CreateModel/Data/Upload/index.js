import React from "react";
import { withStyles } from "@mui/styles";
import UploadFromLink from "./UploadFromLink";
import { useStyles } from "./styles";

const Data = ({ trainingDataLink, setTrainingDataLink }) => {
  return <UploadFromLink trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink} />;
};

export default withStyles(useStyles)(Data);
