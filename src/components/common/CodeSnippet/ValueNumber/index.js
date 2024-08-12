import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const ValueNumber = ({ classes, number }) => {
  return <span className={classes.valueNumbergContainer}>{number}</span>;
};

export default withStyles(useStyles)(ValueNumber);
