import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import TopupWallet from "./TopupWallet";
import CreateWallet from "./CreateWallet";
import LinkProvider from "./LinkProvider";
import { userProfileRoutes } from "../../../../../../UserProfile";
import { anyPendingTxn as getAnyPendingTxn } from "../../../../../../../Redux/reducers/PaymentReducer";
import {
  channelInfo as getChannelInfo,
  anyGeneralWallet as getAnyGeneralWallet,
} from "../../../../../../../Redux/reducers/UserReducer";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

export const paymentTitles = {
  CREATE_WALLET: "Create General Account Wallet",
  TOPUP_WALLET: "Top Up General Account Wallet",
  CREATE_CHANNEL: "Link Provider to General Account Wallet",
};

const GeneralAccountWallet = ({ classes, handleContinue }) => {
  const paypalInProgress = useSelector((state) => state.paymentReducer.paypalInProgress);
  const anyGeneralWallet = useSelector((state) => getAnyGeneralWallet(state));
  const anyPendingTxn = useSelector((state) => getAnyPendingTxn(state));
  const channelInfo = getChannelInfo();

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
      default: {
        return;
      }
    }
  }, [paypalInProgress.orderType]);

  return (
    <div>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS} className={classes.routerLink}>
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
    </div>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
