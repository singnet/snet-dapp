import React from "react";
import { withStyles } from "@material-ui/styles";
import UploadFromLink from "./UploadFromLink";
import { useStyles } from "./styles";

const Data = ({trainingDataLink,setTrainingDataLink}) => {
  return <UploadFromLink  trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink}/>;
};

export default withStyles(useStyles)(Data);
