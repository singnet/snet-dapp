import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { channelInfo } from "../../../../../../../Redux/reducers/UserReducer";
import TopupWallet from "./TopupWallet";
import CreateWallet from "./CreateWallet";
import { paymentActions } from "../../../../../../../Redux/actionCreators";
import { userProfileRoutes } from "../../../../../../UserProfile";

export const orderTypes = {
  CREATE_WALLET: "CREATE_WALLET_AND_CHANNEL",
  TOPUP_WALLET: "FUND_CHANNEL",
};

export const paymentTitles = {
  CREATE_WALLET: "Create General Account Wallet",
  TOPUP_WALLET: "Topup General Account Wallet",
};

const GeneralAccountWallet = props => {
  const { classes, channelInfo, handleContinue, paypalInProgress } = props;

  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  const [showTopupWallet, setShowTopupWallet] = useState(false);

  useEffect(() => {
    switch (paypalInProgress.orderType) {
      case orderTypes.CREATE_WALLET: {
        setShowCreateWalletPopup(true);
        return;
      }
      case orderTypes.TOPUP_WALLET: {
        setShowTopupWallet(true);
        return;
      }
    }
  }, [paypalInProgress.orderType]);

  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS.path} className={classes.routerLink}>
          <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        </Link>
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
  paypalInProgress: state.paymentReducer.paypalInProgress,
});

const mapDispatchToProps = dispatch => ({
  fetchOrderDetails: orderId => dispatch(paymentActions.fetchOrderDetails(orderId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GeneralAccountWallet));
