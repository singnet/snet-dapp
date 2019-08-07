import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import StyledLinearProgress from "../../../../../common/StyledLinearProgress";
import { useStyles } from "./styles";

const ActiveSession = ({ classes }) =>{
  return (
  	<div>
    	<AlertBox 
    		type = "info" 
    		message = "You are free to use 90 more API calls to tryout the service. Post the limit you have to purchase credits to continue using the service."
    		link = "Know More"
    	/>
    	<div className={classes.FreeApiCallsData}>
    		<span className={classes.FreeApiCallsText}>Free API Calls</span>
    		<span className={classes.ReaminaingCallsNo}>99</span>
    		<StyledLinearProgress value={90} />
    		<StyledButton type="blue" btnText="run for free" />
    	</div>
    </div>
  )
}

export default withStyles(useStyles)(ActiveSession);
