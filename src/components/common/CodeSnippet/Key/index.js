import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Key = ({ classes, text }) => {
  return (
    <div className={classes.keyContainer}>
      <p>{text}</p>
    </div>
  );
};

export default withStyles(useStyles)(Key);
