import React, { Fragment, useState } from "react";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { userProfileRoutes } from "../../../../../../UserProfile";
import { anyPendingTxn as getAnyPendingTxn } from "../../../../../../../Redux/reducers/PaymentReducer";
import {
  channelInfo as getChannelInfo,
  anyGeneralWallet as getAnyGeneralWallet,
} from "../../../../../../../Redux/reducers/UserReducer";
import PaymentPopup from "./PaymentPopup";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

const GeneralAccountWallet = ({ classes, handleContinue }) => {
  const anyGeneralWallet = useSelector((state) => getAnyGeneralWallet(state));
  const anyPendingTxn = useSelector((state) => getAnyPendingTxn(state));
  const channelInfo = getChannelInfo();

  const [paymentPopupVisibile, setPaymentPopupVisibile] = useState();

  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS} className={classes.routerLink}>
          <StyledButton type="transparentBlueBorder" btnText="transaction history" />
        </Link>
        <StyledButton
          type="transparentBlueBorder"
          btnText="top up wallet"
          onClick={() => setPaymentPopupVisibile(orderTypes.TOPUP_WALLET)}
          // disabled={isEmpty(channelInfo)} TODO
        />
        <NextAction
          channel={channelInfo}
          setShowCreateWalletPopup={() => setPaymentPopupVisibile(orderTypes.CREATE_WALLET)}
          setShowLinkProvider={() => setPaymentPopupVisibile(orderTypes.CREATE_CHANNEL)}
          handleContinue={handleContinue}
          anyPendingTxn={anyPendingTxn}
          anyGeneralWallet={anyGeneralWallet}
        />
      </div>
      <PaymentPopup
        paymentModalType={paymentPopupVisibile}
        isVisible={Boolean(paymentPopupVisibile)}
        handleClose={() => setPaymentPopupVisibile(false)}
      />
    </Fragment>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
