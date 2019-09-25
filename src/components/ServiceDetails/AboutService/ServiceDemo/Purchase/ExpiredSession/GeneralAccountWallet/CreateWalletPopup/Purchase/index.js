import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";

import { useStyles } from "./styles";

const Purchase = ({ classes, error }) => {
  if (error) {
    return (
      <div className={classes.purchaseErrorContainer}>
        <AlertBox type="error" message="Paypal returned some error. Please Retry or contact support." />
        <div className={classes.btnContainer}>
          <StyledButton type="transparent" btnText="cancel" />
          <StyledButton type="transparent" btnText="support" />
          <StyledButton type="blue" btnText="retry" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.purchaseContainer}>
      <div className={classes.circularProgressContainer}>
        <CircularProgress className={classes.circularProgress} />
      </div>
      <Typography variant="body1" className={classes.purchaseDesc}>
        Please wait while your transaction is being recorded into the block chain. The execution will proceed once its
        done. Please don’t close or refresh the window.
      </Typography>
    </div>
  );
};

export default withStyles(useStyles)(Purchase);
