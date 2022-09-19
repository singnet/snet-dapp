import React from "react";
import { withStyles } from "@material-ui/styles";
import UploadFromLink from "./UploadFromLink";
import { useStyles } from "./styles";

const Data = () => {
  return <UploadFromLink />;
};

export default withStyles(useStyles)(Data);
