import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Web3 from "web3";
import { connect } from "react-redux";

import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import BulletPoint from "../../../../../../../../common/BulletPoint";
import { useStyles } from "./styles";
import AlertText from "../../../../../../../../common/AlertText";

const warningMessage = [
  "You will still be able to top up your General Account Wallet and use it with all providers that you have linked with.",
  "You won't be able to link General Account Wallet with any other new providers.",
];

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

const VerifyKey = ({ classes, handleLostPrivateKey, walletList, handleUserProvidedPrivateKey, handleNextSection }) => {
  const [keyLost, setKeyLost] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [alert, setAlert] = useState({});

  const handleConfirmNewWallet = () => {
    handleLostPrivateKey();
  };

  const validatePrivateKey = event => {
    event.preventDefault();
    try {
      handleUserProvidedPrivateKey(privateKey);
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const GenWalletMatchingAcc = walletList.find(wallet => wallet.address === account.address);
      if (!GenWalletMatchingAcc) {
        setAlert({
          type: alertTypes.ERROR,
          message: "The private key doesn't belong to any of the General Account Wallets",
        });
        return;
      }
      handleNextSection();
    } catch (error) {
      setAlert({
        type: alertTypes.ERROR,
        message: "The private key is not valid",
      });
      return;
    }
  };

  if (keyLost) {
    return (
      <div className={classes.lostKeyContainer}>
        <Typography variant="body1" className={classes.lostKeyInfo}>
          If you have lost your key for “General Account Wallet”, we can create a new wallet. Please take a note of the
          below :
        </Typography>
        <div className={classes.WarningBoxConatiner}>
          {warningMessage.map(msg => (
            <BulletPoint key={msg} type={alertTypes.WARNING} message={msg} />
          ))}
        </div>
        <Typography variant="body1" className={classes.lostKeyNotification}>
          Are you sure you want to go ahead and create a new wallet?
        </Typography>
        <div className={classes.btnContainer}>
          <StyledButton type="transparent" btnText="back" onClick={() => setKeyLost(false)} />
          <StyledButton type="blue" btnText="create new wallet" onClick={handleConfirmNewWallet} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.VerifyKeyContainer}>
      <p className={classes.VerifyKeyDesc}>
        <span>Please enter the Private key for your “General Account Wallet”.</span> We need the private key to link
        your general wallet with the new provider.
      </p>
      <form>
        <div className={`${classes.textField} ${alert.message ? classes.error : ""}`}>
          <span>Private Key</span>
          <input type="password" value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
          <AlertText type={alert.type} message={alert.message} />
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.btnContainer}>
          <StyledButton type="transparent" btnText="i lost my key" onClick={() => setKeyLost(true)} />
          <StyledButton type="blue" btnText="validate" onClick={validatePrivateKey} btnType="submit" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  walletList: state.userReducer.walletList,
});

export default connect(mapStateToProps)(withStyles(useStyles)(VerifyKey));
