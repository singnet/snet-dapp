import React, { Fragment, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { userProfileRoutes } from "../../../../../../UserProfile";
import { channelInfo as getChannelInfo } from "../../../../../../../Redux/reducers/UserReducer";
import PaymentPopup from "./PaymentPopup";
import { orderPayloadTypes, orderTypes } from "../../../../../../../utility/constants/PaymentConstants";
import { isEmpty } from "lodash";
import PaymentInfoCard from "../../PaymentInfoCard";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import {
  anyPendingTxn as getAnyPendingTxn,
  anyFailedTxn as getAnyFailedTxn,
} from "../../../../../../../Redux/reducers/PaymentReducer";
import { userActions } from "../../../../../../../Redux/actionCreators";
import { groupInfo } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { initPaypalSdk } from "../../../../../../../utility/sdk";

const TransactionAlert = {
  PENDING: { type: alertTypes.WARNING, message: "Transaction Confirmed. Pending token allocation" },
  FAILED: { type: alertTypes.ERROR, message: "Transaction Failed. See history for more details" },
};

const GeneralAccountWallet = ({ classes, handleContinue }) => {
  const dispatch = useDispatch();
  const { orgId } = useParams();

  const channelInfo = useSelector((state) => getChannelInfo(state));
  const anyPendingTxn = useSelector((state) => getAnyPendingTxn(state));
  const anyFailedTxn = useSelector((state) => getAnyFailedTxn(state));
  const groupId = useSelector((state) => groupInfo(state).group_id);
  const inProgressOrderType = useSelector((state) => state.paymentReducer.paypalInProgress.orderType);

  const progressTransaction = Object.keys(orderPayloadTypes).find(
    (key) => orderPayloadTypes[key] === inProgressOrderType
  );
  const [paymentPopupVisibile, setPaymentPopupVisibile] = useState(progressTransaction);
  const [alert, setAlert] = useState({});
  const [isLoadingChannelInfo, setLoadingChannelInfo] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    initPaypalSdk(channelInfo.address, channelInfo.id); // TODO get address
  }, [channelInfo]);

  useEffect(() => {
    if (anyPendingTxn) {
      setAlert(TransactionAlert.PENDING);
    }
    if (anyFailedTxn) {
      setAlert(TransactionAlert.FAILED);
    }
    setAlert({});
  }, [anyPendingTxn, anyFailedTxn]);

  useEffect(() => {
    const getWalletInfo = async () => {
      try {
        setLoadingChannelInfo(true);
        await dispatch(userActions.fetchWallet(orgId, groupId));
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setLoadingChannelInfo(false);
      }
    };
    getWalletInfo();
  }, [dispatch, orgId, groupId]);

  return (
    <Fragment>
      <div className={classes.channelBalance}>
        <PaymentInfoCard
          show={!isEmpty(channelInfo)}
          title="Channel Balance"
          value={!isEmpty(channelInfo) && channelInfo.balanceInAgi}
          unit="AGIX"
        />
      </div>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS} target="_blank" className={classes.routerLink}>
          <StyledButton type="transparentBlueBorder" btnText="transaction history" />
        </Link>
        {isLoadingChannelInfo ? (
          <CircularProgress size="40px" />
        ) : (
          <NextAction
            channel={channelInfo}
            setShowCreateWalletPopup={() => setPaymentPopupVisibile(orderTypes.CREATE_WALLET)}
            setShowLinkProvider={() => setPaymentPopupVisibile(orderTypes.CREATE_CHANNEL)}
            setShowTopUpWallet={() => setPaymentPopupVisibile(orderTypes.TOPUP_WALLET)}
            handleContinue={handleContinue}
          />
        )}
        <AlertBox {...alert} />
      </div>
      <PaymentPopup
        paymentModalType={paymentPopupVisibile}
        isVisible={Boolean(paymentPopupVisibile)}
        isPaypalInProgress={Boolean(progressTransaction)}
        handleClose={() => setPaymentPopupVisibile(false)}
      />
    </Fragment>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
