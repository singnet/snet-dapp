import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const Tag = ({ classes, text }) => {
  return <span className={classes.tags}>{text}</span>;
};

export default withStyles(useStyles)(Tag);
