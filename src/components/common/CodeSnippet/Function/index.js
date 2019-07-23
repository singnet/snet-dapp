import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const FunctionText = ({ classes, text }) => {
  return <span className={classes.functionTextContainer}>{text}</span>;
};

export default withStyles(useStyles)(FunctionText);
