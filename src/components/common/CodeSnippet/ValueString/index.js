import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ValueString = ({ classes, text }) => {
  return <p className={classes.valueStringContainer}>{text}</p>;
};

export default withStyles(useStyles)(ValueString);
