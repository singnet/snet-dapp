import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import { freeCalls as getFreeCalls, groupInfo as getGroupInfo } from "../../../../Redux/reducers/ServiceDetailsReducer";
import { channelInfo as getChannelInfo } from "../../../../Redux/reducers/UserReducer";
import { anyPendingTxn as getAnyPendingTxn } from "../../../../Redux/reducers/PaymentReducer";
import { serviceDetailsActions, loaderActions, userActions, paymentActions } from "../../../../Redux/actionCreators";
import { walletTypes } from "../../../../Redux/actionCreators/UserActions";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import PurchaseToggler from "./PurchaseToggler";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import Routes from "../../../../utility/constants/Routes";
import { initPaypalSdk } from "../../../../utility/sdk";
import { progressTabStatus } from "../../../common/ProgressBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const demoProgressStatus = {
  purchasing: 1,
  executingAIservice: 2,
  displayingResponse: 3,
};

const ServiceDemo = ({ classes, service }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderId, paymentId } = useParams();

  const freeCalls = useSelector((state) => getFreeCalls(state));
  const groupInfo = useSelector((state) => getGroupInfo(state));
  const email = useSelector((state) => state.userReducer.email);
  const wallet = useSelector((state) => state.userReducer.wallet);
  const channelInfo = useSelector((state) => getChannelInfo(state));
  const anyPendingTxn = useSelector((state) => getAnyPendingTxn(state));

  const [progressText, setProgressText] = useState([
    { label: "Purchase" },
    { label: "Configure" },
    { label: "Results", status: undefined },
  ]);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isServiceExecutionComplete, setIsServiceExecutionComplete] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.INIT_SERVICE_DEMO));
      checkForPaymentsInProgress();
      dispatch(paymentActions.fetchUSDConversionRate());
      scrollToHash();
      dispatch(loaderActions.stopAppLoader());

      if (window.location.href.indexOf("#demo") > -1) {
        navigate(location.pathname);
      }
    } catch (error) {
      dispatch(loaderActions.stopAppLoader());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX || wallet.type !== walletTypes.GENERAL) {
      return;
    }
    initPaypalSdk(wallet.address, channelInfo);
  }, [channelInfo, wallet, anyPendingTxn]);

  const checkForPaymentsInProgress = async () => {
    const { paymentId: paypalPaymentId, PayerID } = queryString.parse(location);
    if (orderId && paymentId && paypalPaymentId && PayerID) {
      const { data } = await dispatch(paymentActions.fetchOrderDetails(orderId));
      const orderType = data.item_details.order_type;
      dispatch(paymentActions.updatePaypalInProgress(orderId, orderType, paymentId, paypalPaymentId, PayerID));
      return dispatch(userActions.updateWallet({ type: walletTypes.GENERAL }));
    }
  };

  const fetchFreeCallsUsage = () => {
    return dispatch(
      serviceDetailsActions.fetchMeteringData({
        orgId: service.org_id,
        serviceId: service.service_id,
        groupId: groupInfo.group_id,
        username: email,
      })
    );
  };

  // const pollWalletDetails = async () => {
  //   const {
  //     service: { org_id: orgId },
  //     groupInfo: { group_id: groupId },
  //   } = this.props;

  //   return await dispatch(userActions.startWalletDetailsPolling(orgId, groupId));
  // };

  const scrollToHash = () => {
    if (location.hash === Routes.hash.SERVICE_DEMO) {
      window.scroll({
        top: 520,
        behavior: "smooth",
      });
    }
  };

  const computeActiveSection = () => {
    const { purchasing, executingAIservice, displayingResponse } = demoProgressStatus;

    return purchaseCompleted ? (isServiceExecutionComplete ? displayingResponse : executingAIservice) : purchasing;
  };

  const serviceRequestStartHandler = () => {
    setAlert({});
    dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION(service.display_name)));
  };

  const serviceRequestCompleteHandler = () => {
    setIsServiceExecutionComplete(true);
    setProgressText(
      progressText.map((item) => {
        if (item.label === "Results") {
          item.status = progressTabStatus.SUCCESS;
        }
        return item;
      })
    );
    dispatch(loaderActions.stopAppLoader());
  };

  const handleResetAndRun = () => {
    setPurchaseCompleted(false);
    setIsServiceExecutionComplete(false);
    setAlert({});
    // setProgressText(progressText.map((item) => ({ label: item.label })));
    fetchFreeCallsUsage();
  };

  const serviceRequestErrorHandler = (error) => {
    const alert = { type: alertTypes.ERROR };
    if (error.response && error.response.data && error.response.data.error) {
      alert.message = error.response.data.error;
    } else {
      alert.message = error.message || error;
    }
    setIsServiceExecutionComplete(false);
    setAlert(alert);
    dispatch(loaderActions.stopAppLoader());
  };

  const handlePurchaseComplete = () => {
    setPurchaseCompleted(true);
  };

  const handlePurchaseError = (error) => {
    setPurchaseCompleted(false);
    setAlert({ type: alertTypes.ERROR, message: "Purchase could not be completed. Please try again" });
    dispatch(loaderActions.stopAppLoader());
  };

  return (
    <div className={classes.demoExampleContainer}>
      <ProgressBar activeSection={computeActiveSection()} progressText={progressText} />
      <PurchaseToggler
        groupInfo={groupInfo}
        purchaseCompleted={purchaseCompleted}
        purchaseProps={{
          handleComplete: handlePurchaseComplete,
          freeCallsRemaining: freeCalls.remaining,
          freeCallsAllowed: freeCalls.allowed,
          wallet,
          handlePurchaseError,
          isServiceAvailable: Boolean(service.is_available),
        }}
        thirdPartyProps={{
          service_id: service.service_id,
          org_id: service.org_id,
          freeCallsRemaining: freeCalls.remaining,
          isServiceExecutionComplete,
          handleResetAndRun,
          serviceRequestStartHandler,
          serviceRequestCompleteHandler,
          serviceRequestErrorHandler,
        }}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(ServiceDemo);
