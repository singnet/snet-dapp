import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ValueString = ({ classes, text }) => {
  return (
    <div className={classes.valueStringContainer}>
      <p>{text}</p>
    </div>
  );
};

export default withStyles(useStyles)(ValueString);
