import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Web3 from "web3";
import { connect } from "react-redux";

import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import BulletPoint from "../../../../../../../../common/BulletPoint";
import { useStyles } from "./styles";
import AlertText from "../../../../../../../../common/AlertText";

const warningMessage = [
  "You wil still be able to topup your General Account Wallet and use it with all providers that you have linked with.",
  "You wont be able to link General Account Wallet with any new providers.",
  "Lorem ipsum dolor sit amet, simul vivendo vim ea, ut possim torquatos definiebas eam. Feugiat maiorum urbanitas ei quo.",
  "Lorem ipsum dolor sit amet, simul vivendo vim ea, ut possim torquatos definiebas eam. Feugiat maiorum urbanitas ei quo.",
];

let web3;

const VerifyKey = ({ classes, handleLostPrivateKey, walletList, handleUserProvidedPrivateKey, handleNextSection }) => {
  const [keyLost, setKeyLost] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (!web3) {
      web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
    }
  });

  const handleConfirmNewWallet = () => {
    handleLostPrivateKey();
  };

  const validatePrivateKey = () => {
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

    // web3.eth.accounts.wallet.add(account);
    // web3.eth.defaultAccount = account.address;
    // const sha3Message = web3.utils.soliditySha3(
    //   { t: "string", v: "__openChannelByThirdParty" },
    //   { t: "address", v: "mpe_address" },
    //   { t: "address", v: "executor_wallet_address" },
    //   { t: "address", v: "SIGNER_ADDRESS" },
    //   { t: "address", v: "recipient" },
    //   { t: "bytes32", v: "group_id" },
    //   { t: "uint256", v: "amount_in_cogs" },
    //   { t: "uint256", v: "expiration" },
    //   { t: "uint256", v: "message_nonce" }
    // );

    // const signature = await web3.eth.accounts.sign(sha3Message, privateKey);

    // const base64Signature = parseSignature(signature);
    // return base64Signature;
  };

  if (keyLost) {
    return (
      <div className={classes.lostKeyContainer}>
        <Typography variant="body1" className={classes.lostKeyInfo}>
          If you lost your key for “General Account Wallet”, we can create a new wallet for you. Please keep in mind
          that:
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
        your general wallet with the new provider. Lorem ipsum dolor sit amet, malis integre menandri at sed, essent
        facete albu ci us ut has. <Link to="">Click here </Link>if you want to know more.
      </p>
      <div className={`${classes.textField} ${alert.message ? classes.error : ""}`}>
        <span>Private Key</span>
        <input type="password" value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
        <AlertText type={alert.type} message={alert.message} />
      </div>
      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="i lost my key" onClick={() => setKeyLost(true)} />
        <StyledButton type="blue" btnText="validate" onClick={validatePrivateKey} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  walletList: state.userReducer.walletList,
});

export default connect(mapStateToProps)(withStyles(useStyles)(VerifyKey));
