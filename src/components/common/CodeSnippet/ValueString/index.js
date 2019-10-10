import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ValueString = ({ classes, text }) => {
  return <span className={classes.valueStringContainer}>{text}</span>;
};

export default withStyles(useStyles)(ValueString);
