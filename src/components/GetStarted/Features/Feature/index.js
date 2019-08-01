import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Feature = ({ classes, icon: Icon, title, description }) => {
  return (
    <div className={classes.SingleFeatureWrapper}>
      <Icon />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Feature);
