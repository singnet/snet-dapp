import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Tag = ({ classes, text }) => {
  return <span className={classes.tags}>{text}</span>;
};

export default withStyles(useStyles)(Tag);
