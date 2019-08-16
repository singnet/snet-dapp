import React from "react";
import { withStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useStyles } from "./styles";

const StyledLinearProgress = ({ classes, value }) => {
  return <LinearProgress className={classes.styledProgressBar} variant="determinate" value={value} />;
};

export default withStyles(useStyles)(StyledLinearProgress);
