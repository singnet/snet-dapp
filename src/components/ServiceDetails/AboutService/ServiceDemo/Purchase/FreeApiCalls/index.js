import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../common/AlertBox";
import { useStyles } from "./styles";

const FreeApiCalls = ({ classes }) =>{
  return (
    <AlertBox 
    	type = "info" 
    	message = "You are free to use 90 more API calls to tryout the service. Post the limit you have to purchase credits to continue using the service."
    	link = "Know More"
    />
  )
}

export default withStyles(useStyles)(FreeApiCalls);
