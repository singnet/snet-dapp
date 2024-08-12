import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const ValueString = ({ classes, text }) => {
  return <span className={classes.valueStringContainer}>{text}</span>;
};

export default withStyles(useStyles)(ValueString);
