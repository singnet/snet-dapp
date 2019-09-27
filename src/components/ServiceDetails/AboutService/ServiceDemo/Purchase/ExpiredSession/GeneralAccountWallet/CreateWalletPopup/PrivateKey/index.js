import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const PrivateKey = ({ classes }) => {
  return (
    <div className={classes.privateKeyContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        Successfully Created Wallet for : Service Provider 1
      </Typography>
      <p className={classes.description}>
        <span>Information about the wallet and key. </span>Lorem ipsum dolor sit amet, vim natum dolore cu. It will take
        some time for the tokens to reflect on your channel. Please go ahead.
      </p>
      <div className={classes.downloadKeyBtn}>
        <StyledButton type="transparent" btnText="download private key" />
      </div>
      <AlertBox
        type="warning"
        message="Please keep the private key secured. Once the private key is lost, it can not be recovered."
      />
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="cancel" />
        <StyledButton type="blue" disabled btnText="continue" />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PrivateKey);
