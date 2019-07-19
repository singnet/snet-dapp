import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ValueNumber = ({ classes, number }) => {
  return (
    <div className={classes.valueNumbergContainer}>
      <p>{number}</p>
    </div>
  );
};

export default withStyles(useStyles)(ValueNumber);
