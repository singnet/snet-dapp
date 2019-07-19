import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const FunctionText = ({ classes, text }) => {
  return (
    <div className={classes.functionTextContainer}>
      <p>{text}</p>
    </div>
  );
};

export default withStyles(useStyles)(FunctionText);
