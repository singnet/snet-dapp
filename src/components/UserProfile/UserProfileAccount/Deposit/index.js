import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Deposit = ({ classes }) => {
  return (
    <div className={classes.depositAmtContainer}>
      <span>AGI Token Amount</span>
    </div>
  );
};

export default withStyles(useStyles)(Deposit);
