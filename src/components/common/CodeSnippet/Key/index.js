import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const Key = ({ classes, text }) => {
  return <span className={classes.keyContainer}>{text}</span>;
};

export default withStyles(useStyles)(Key);
