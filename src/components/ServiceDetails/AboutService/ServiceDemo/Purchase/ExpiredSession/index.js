import React, { useEffect } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";
import MetamaskFlow from "./MetamaskFlow";

const ExpiredSession = ({ classes, setIsLastPaidCall, handleComplete }) => {
  useEffect(() => {
    setIsLastPaidCall(false);
  }, [setIsLastPaidCall]);

  return (
    <div className={classes.mainContainer}>
      <Typography variant="body1" className={classes.description}>
        You have run out of free trial. Please select a payment method to continue
      </Typography>
      <div className={classes.paymentChannelAndDetails}>
        <MetamaskFlow handleContinue={handleComplete} setIsLastPaidCall={setIsLastPaidCall} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ExpiredSession);
