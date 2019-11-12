import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { channelInfo, anyGeneralWallet } from "../../../../../../../Redux/reducers/UserReducer";
import TopupWallet from "./TopupWallet";
import CreateWallet from "./CreateWallet";
import { paymentActions } from "../../../../../../../Redux/actionCreators";
import LinkProvider from "./LinkProvider";
import { userProfileRoutes } from "../../../../../../UserProfile";
import { anyPendingTxn } from "../../../../../../../Redux/reducers/PaymentReducer";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

export const paymentTitles = {
  CREATE_WALLET: "Create General Account Wallet",
  TOPUP_WALLET: "Top Up General Account Wallet",
  CREATE_CHANNEL: "Link Provider to General Account Wallet",
};

const GeneralAccountWallet = props => {
  const { classes, channelInfo, handleContinue, paypalInProgress, anyGeneralWallet, anyPendingTxn } = props;

  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  const [showTopupWallet, setShowTopupWallet] = useState(false);
  const [showLinkProvider, setShowLinkProvider] = useState(false);

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
      case orderTypes.CREATE_CHANNEL: {
        setShowLinkProvider(true);
        return;
      }
    }
  }, [paypalInProgress.orderType]);

  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS.path} className={classes.routerLink}>
          <StyledButton type="transparentBlueBorder" disabled={!anyGeneralWallet} btnText="transaction history" />
        </Link>
        <StyledButton
          type="transparentBlueBorder"
          btnText="top up wallet"
          onClick={() => setShowTopupWallet(true)}
          disabled={isEmpty(channelInfo)}
        />
        <NextAction
          channel={channelInfo}
          setShowCreateWalletPopup={setShowCreateWalletPopup}
          setShowLinkProvider={setShowLinkProvider}
          handleContinue={handleContinue}
          anyPendingTxn={anyPendingTxn}
          anyGeneralWallet={anyGeneralWallet}
        />
      </div>
      <CreateWallet visible={showCreateWalletPopup} setVisibility={setShowCreateWalletPopup} />
      <TopupWallet visible={showTopupWallet} setVisibility={setShowTopupWallet} />
      <LinkProvider visible={showLinkProvider} setVisibility={setShowLinkProvider} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  channelInfo: channelInfo(state),
  paypalInProgress: state.paymentReducer.paypalInProgress,
  wallet: state.userReducer.wallet,
  anyGeneralWallet: anyGeneralWallet(state),
  anyPendingTxn: anyPendingTxn(state),
});

const mapDispatchToProps = dispatch => ({
  fetchOrderDetails: orderId => dispatch(paymentActions.fetchOrderDetails(orderId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GeneralAccountWallet));
