import React from "react";
import { withStyles } from "@material-ui/styles";
import StyledButton from "../../../common/StyledButton";
import MetamaskImg from "../../../../assets/images/Metamask.png";
import { useStyles } from "./styles";

const ConnectMetamask = ({ classes }) => {
  return (    
		<div className={classes.connectMMContainer}>
			<img src={MetamaskImg} alt="Metamask" />
			<span>Metamask</span>
			<p>Connect to your Metamask Wallet</p>
			<StyledButton btnText="Connect" />
		</div>
	)       
};

export default withStyles(useStyles)(ConnectMetamask);
