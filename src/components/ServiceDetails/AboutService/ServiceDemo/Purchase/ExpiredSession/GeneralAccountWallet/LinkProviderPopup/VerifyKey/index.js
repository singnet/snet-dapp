import React from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const VerifyKey = ({ classes, wrongKey }) => {
  return (
    <div className={classes.VerifyKeyContainer}>
      <p className={classes.VerifyKeyDesc}>
        <span>Please enter the Private key for your “General Account Wallet”.</span> We need the private key to link
        your general wallet with the new provider. Lorem ipsum dolor sit amet, malis integre menandri at sed, essent
        facete albu ci us ut has. <Link to="">Click here </Link>if you want to know more.
      </p>
      <div className={`${classes.textField} ${wrongKey ? classes.error : ""}`}>
        <span>Private Key</span>
        <input type="text" />
        {wrongKey ? (
          <Typography variant="body2" className={classes.errorMsg}>
            Invalid Private Key
          </Typography>
        ) : null}
      </div>
      {wrongKey ? <AlertBox type="error" message="some server error message" /> : null}
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="i lost my key" />
        <StyledButton type="blue" btnText="validate" />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(VerifyKey);
