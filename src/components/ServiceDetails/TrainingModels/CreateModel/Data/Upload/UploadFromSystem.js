import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

const UploadFromSystem = ({ classes }) => {

  return (
    <div className={classes.uploadFromSystemContainer}>
        <span>upload from system</span>
    </div>
  );
};

export default withStyles(useStyles)(UploadFromSystem);
