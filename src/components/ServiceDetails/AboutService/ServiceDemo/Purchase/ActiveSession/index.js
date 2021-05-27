import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import StyledLinearProgress from "../../../../../common/StyledLinearProgress";
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
    <div>
      <AlertBox
        type="info"
        message={`You are free to use ${freeCallsRemaining} more API calls to tryout the service.
		 Post the limit you have to purchase to continue using the service.`}
      />
      <div className={classes.FreeApiCallsData}>
        <span className={classes.FreeApiCallsText}>Free API Calls</span>
        <span className={classes.ReaminaingCallsNo}>{freeCallsRemaining}</span>
        <StyledLinearProgress value={progressValue()} />
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
    </div>
  );
};

export default withStyles(useStyles)(ActiveSession);
