import React from "react";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

const Card = ({ classes, header, children }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardHeaderContainer}>
        <h2>{header}</h2>
      </div>
      <div className={classes.cardContentContainer}>{children}</div>
    </div>
  );
};

export default withStyles(useStyles)(Card);
