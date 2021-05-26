import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";

import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import StyledLinearProgress from "../../../../../common/StyledLinearProgress";
import { useStyles } from "./styles";
import { Fragment } from "react";

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
        <AlertBox
          type={alertTypes.WARNING}
          message={
            <Fragment>
              <span>
                We have temporarily disabled this action as we are hard forking the AGI token to make it cross
                compatible. We will enable it as soon as the hard fork is completed. Read more{" "}
              </span>
              <a
                href="https://blog.singularitynet.io/singularitynet-phase-ii-launch-sequence-activated-agi-token-to-be-hard-forked-to-10ede4b6c89"
                target="_blank"
                rel="noreferrer noopener"
              >
                here
              </a>
            </Fragment>
          }
        />
        <Tooltip
          title="Service is currently offline. Please try after sometime"
          aria-label="add-payment"
          open={showTooltip}
          onOpen={handleTooltipOpen}
          onClose={handleTooltipClose}
          classes={{ tooltip: classes.tooltip }}
        >
          <div>
            <StyledButton
              type="blue"
              btnText="run for free"
              onClick={handleComplete}
              // disabled={!isServiceAvailable}
              disabled
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ActiveSession);
