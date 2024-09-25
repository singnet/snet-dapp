import React from "react";
import { withStyles } from "@mui/styles";
import StyledButton from "snet-dapp-components/components/StyledButton";
import MetamaskImg from "../../../assets/images/Metamask.png";
import { useStyles } from "./styles";

const ConnectMetamask = ({ classes, handleConnectMM }) => {
  return (
    <div className={classes.connectMMContainer}>
      <img src={MetamaskImg} alt="Metamask" />
      <span>Metamask</span>
      <p>Connect to your Metamask Wallet</p>
      <StyledButton btnText="Connect" onClick={handleConnectMM} />
    </div>
  );
};

export default withStyles(useStyles)(ConnectMetamask);
