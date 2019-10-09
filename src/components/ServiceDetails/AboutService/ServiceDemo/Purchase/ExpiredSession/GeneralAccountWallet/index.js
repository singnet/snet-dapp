import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { channelInfo } from "../../../../../../../Redux/reducers/UserReducer";
import TopupWallet from "./TopupWallet";
import CreateWallet from "./CreateWallet";

export const orderTypes = {
  CREATE_WALLET: "CREATE_WALLET_AND_CHANNEL",
  TOPUP_WALLET: "FUND_CHANNEL",
};

const GeneralAccountWallet = ({ classes, channelInfo, handleContinue }) => {
  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  const [showTopupWallet, setShowTopupWallet] = useState(false);

  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        <StyledButton
          type="transparentBlueBorderDisable"
          btnText="top up wallet"
          onClick={() => setShowTopupWallet(true)}
        />
        <NextAction
          channel={channelInfo}
          setShowCreateWalletPopup={setShowCreateWalletPopup}
          handleContinue={handleContinue}
        />
      </div>
      <CreateWallet visible={showCreateWalletPopup} setVisibility={setShowCreateWalletPopup} />
      <TopupWallet visible={showTopupWallet} setVisibility={setShowTopupWallet} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  channelInfo: channelInfo(state),
});

export default connect(mapStateToProps)(withStyles(useStyles)(GeneralAccountWallet));
