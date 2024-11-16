import React from "react";
import { withStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";

import { useStyles } from "./styles";

const StyledLinearProgress = ({ classes, value }) => {
  return <LinearProgress className={classes.styledProgressBar} variant="determinate" value={value} />;
};

export default withStyles(useStyles)(StyledLinearProgress);
