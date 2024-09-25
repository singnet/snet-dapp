import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

import AlertBox from "snet-dapp-components/components/AlertBox";
import StyledButton from "snet-dapp-components/components/StyledButton";
import StyledLinearProgress from "snet-dapp-components/components/StyledLinearProgress";
import { useStyles } from "./styles";

const ActiveSession = ({ classes, freeCallsRemaining, handleComplete, freeCallsAllowed, isServiceAvailable }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const progressValue = () => (freeCallsRemaining / freeCallsAllowed) * 100;

  const handleTooltipOpen = () => {
    if (!isServiceAvailable) {
      setShowTooltip(true);
    }
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <div className={classes.activeSessionContainer}>
      <AlertBox
        type="info"
        message={`You are free to use ${freeCallsRemaining} more API calls to tryout the service.
		 Post the limit you have to purchase to continue using the service.`}
      />
      <div className={classes.freeCallsInfo}>
        <span className={classes.FreeApiCallsText}>Free API Calls</span>
        <span className={classes.ReaminaingCallsNo}>{freeCallsRemaining}</span>
        <StyledLinearProgress value={progressValue()} />
      </div>
      <Tooltip
        title="Service is currently offline. Please try after sometime"
        aria-label="add-payment"
        open={showTooltip}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        classes={{ tooltip: classes.tooltip }}
      >
        <div>
          <StyledButton type="blue" btnText="run for free" onClick={handleComplete} disabled={!isServiceAvailable} />
        </div>
      </Tooltip>
    </div>
  );
};

export default withStyles(useStyles)(ActiveSession);
