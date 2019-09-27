import React from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import BulletPoint from "../../../../../../../../common/BulletPoint";
import { useStyles } from "./styles";

const warningMessage = [
  "You wil still be able to topup your General Account Wallet and use it with all providers that you have linked with.",
  "You wont be able to link General Account Wallet with any new providers.",
  "Lorem ipsum dolor sit amet, simul vivendo vim ea, ut possim torquatos definiebas eam. Feugiat maiorum urbanitas ei quo.",
  "Lorem ipsum dolor sit amet, simul vivendo vim ea, ut possim torquatos definiebas eam. Feugiat maiorum urbanitas ei quo.",
];

const VerifyKey = ({ classes, wrongKey, keyLost }) => {
  if (keyLost) {
    return (
      <div className={classes.lostKeyContainer}>
        <Typography variant="body1" className={classes.lostKeyInfo}>
          If you lost your key for “General Account Wallet”, we can create a new wallet for you. Please keep in mind
          that:
        </Typography>
        <div className={classes.WarningBoxConatiner}>
          {warningMessage.map(msg => (
            <BulletPoint key={msg} type="warning" message={msg} />
          ))}
        </div>
        <Typography variant="body1" className={classes.lostKeyNotification}>
          Are you sure you want to go ahead and create a new wallet?
        </Typography>
        <div className={classes.btnContainer}>
          <StyledButton type="transparent" btnText="back" />
          <StyledButton type="blue" btnText="create new wallet" />
        </div>
      </div>
    );
  }

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
