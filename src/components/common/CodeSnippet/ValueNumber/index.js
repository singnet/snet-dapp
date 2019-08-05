import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ValueNumber = ({ classes, number }) => {
  return <span className={classes.valueNumbergContainer}>{number}</span>;
};

export default withStyles(useStyles)(ValueNumber);
