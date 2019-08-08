import React from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import StyledLinearProgress from "../../../../../common/StyledLinearProgress";
import { useStyles } from "./styles";

const ActiveSession = ({ classes, freeCallsRemaining, handleComplete }) => {
  return (
    <div>
      <AlertBox
        type="info"
        message={`You are free to use ${freeCallsRemaining} more API calls to tryout the service.
		 Post the limit you have to purchase credits to continue using the service.`}
        link="Know More"
      />
      <div className={classes.FreeApiCallsData}>
        <span className={classes.FreeApiCallsText}>Free API Calls</span>
        <span className={classes.ReaminaingCallsNo}>{freeCallsRemaining}</span>
        <StyledLinearProgress value={freeCallsRemaining} />
        <StyledButton type="blue" btnText="run for free" onClick={handleComplete} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ActiveSession);
