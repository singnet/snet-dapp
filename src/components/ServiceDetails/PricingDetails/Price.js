import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Price = ({ classes, unit, value }) => {
  return (
    <div className={classes.credits}>
      <span>{unit}</span>
      <span>{value}</span>
    </div>
  );
};

export default withStyles(useStyles)(Price);
