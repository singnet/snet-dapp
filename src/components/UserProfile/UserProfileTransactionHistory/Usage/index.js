import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const Usage = ({ classes }) => {
  return (
    <div className={classes.usageContainer}>
      <span>usage</span>
    </div>
  );
};

export default withStyles(useStyles)(Usage);
