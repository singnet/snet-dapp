import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import { serviceDetailsActions, loaderActions, userActions, paymentActions } from "../../../../Redux/actionCreators";
import PurchaseToggler from "./PurchaseToggler";
import { freeCalls, groupInfo } from "../../../../Redux/reducers/ServiceDetailsReducer";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import Routes from "../../../../utility/constants/Routes";
import { initSdk, initPaypalSdk } from "../../../../utility/sdk";
import { walletTypes } from "../../../../Redux/actionCreators/UserActions";
import { channelInfo } from "../../../../Redux/reducers/UserReducer";
import { anyPendingTxn } from "../../../../Redux/reducers/PaymentReducer";

const demoProgressStatus = {
  purchasing: 1,
  executingAIservice: 2,
  displayingResponse: 3,
};

class ServiceDemo extends Component {
  state = {
    progressText: ["Purchase", "Configure", "Results"],
    purchaseCompleted: false,
    isServiceExecutionComplete: false,
    alert: {},
  };

  componentDidMount = async () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    try {
      this.props.startInitServiceDemoLoader();
      const asyncCalls = [
        this.checkForPaymentsInProgress(),
        this.pollWalletDetails(),
        this.props.fetchUSDConversionRate(),
      ];
      if (this.props.freeCalls.allowed > 0) {
        asyncCalls.push(this.fetchFreeCallsUsage());
      }
      await Promise.all(asyncCalls);
      this.scrollToHash();
      this.props.stopLoader();
    } catch (error) {
      this.props.stopLoader();
    }
  };

  componentDidUpdate = async prevProps => {
    const { wallet, channelInfo, anyPendingTxn, stopWalletDetailsPolling } = this.props;
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    if (wallet.type === walletTypes.METAMASK) {
      await initSdk();
    }
    if (wallet.type === walletTypes.GENERAL) {
      if (prevProps.channelInfo.id !== channelInfo.id || prevProps.wallet.type !== wallet.type) {
        initPaypalSdk(wallet.address, channelInfo);
      }
      if (anyPendingTxn) {
        this.pollWalletDetails();
      }
    }
    if (!anyPendingTxn) {
      stopWalletDetailsPolling();
    }
  };

  componentWillUnmount = () => {
    this.props.stopWalletDetailsPolling();
  };

  checkForPaymentsInProgress = async () => {
    const {
      location: { search },
      match: {
        params: { orderId, paymentId },
      },
      updatePaypalInProgress,
      fetchOrderDetails,
      updateWallet,
    } = this.props;
    const { paymentId: paypalPaymentId, PayerID } = queryString.parse(search);
    if (orderId && paymentId && paypalPaymentId && PayerID) {
      const { data } = await fetchOrderDetails(orderId);
      const orderType = data.item_details.order_type;
      updatePaypalInProgress(orderId, orderType, paymentId, paypalPaymentId, PayerID);
      return updateWallet({ type: walletTypes.GENERAL });
    }
  };

  fetchFreeCallsUsage = () => {
    const { service, fetchMeteringData, email, groupInfo } = this.props;
    return fetchMeteringData({
      orgId: service.org_id,
      serviceId: service.service_id,
      groupId: groupInfo.group_id,
      username: email,
    });
  };

  pollWalletDetails = async () => {
    const {
      service: { org_id: orgId },
      groupInfo: { group_id: groupId },
      startWalletDetailsPolling,
    } = this.props;
    return await startWalletDetailsPolling(orgId, groupId);
  };

  scrollToHash = () => {
    if (this.props.history.location.hash === Routes.hash.SERVICE_DEMO) {
      window.scroll({
        top: 520,
        behavior: "smooth",
      });
    }
  };

  computeActiveSection = () => {
    const { purchaseCompleted, isServiceExecutionComplete } = this.state;
    const { purchasing, executingAIservice, displayingResponse } = demoProgressStatus;

    return purchaseCompleted ? (isServiceExecutionComplete ? displayingResponse : executingAIservice) : purchasing;
  };

  serviceRequestStartHandler = () => {
    this.setState({ alert: {} });
    this.props.startLoader();
  };

  serviceRequestCompleteHandler = () => {
    this.setState({ isServiceExecutionComplete: true });
    this.props.stopLoader();
  };

  handleResetAndRun = () => {
    this.setState({ purchaseCompleted: false, isServiceExecutionComplete: false, alert: {} });
    this.fetchFreeCallsUsage();
  };

  serviceRequestErrorHandler = error => {
    const alert = { type: alertTypes.ERROR };
    if (error.response && error.response.data && error.response.data.error) {
      alert.message = error.response.data.error;
    } else {
      alert.message = error.message;
    }
    this.setState({
      isServiceExecutionComplete: false,
      alert,
    });
    this.props.stopLoader();
  };

  handlePurchaseComplete = () => {
    this.setState({ purchaseCompleted: true });
  };

  handlePurchaseError = error => {
    this.setState({
      purchaseCompleted: false,
      alert: { type: alertTypes.ERROR, message: "Purchase could not be completed. Please try again" },
    });
    this.props.stopLoader();
  };

  render() {
    const {
      classes,
      service,
      freeCalls: { remaining: freeCallsRemaining, allowed: freeCallsAllowed },
      groupInfo,
      wallet,
    } = this.props;

    const { progressText, purchaseCompleted, isServiceExecutionComplete, alert } = this.state;

    const {
      handleResetAndRun,
      serviceRequestStartHandler,
      serviceRequestCompleteHandler,
      serviceRequestErrorHandler,
      handlePurchaseError,
    } = this;

    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={this.computeActiveSection()} progressText={progressText} />
        <PurchaseToggler
          groupInfo={groupInfo}
          purchaseCompleted={purchaseCompleted}
          purchaseProps={{
            handleComplete: this.handlePurchaseComplete,
            freeCallsRemaining,
            freeCallsAllowed,
            wallet,
            handlePurchaseError,
            isServiceAvailable: Boolean(service.is_available),
          }}
          thirdPartyProps={{
            service_id: service.service_id,
            org_id: service.org_id,
            freeCallsRemaining,
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
  }
}

const mapStateToProps = state => ({
  freeCalls: freeCalls(state),
  groupInfo: groupInfo(state),
  email: state.userReducer.email,
  wallet: state.userReducer.wallet,
  firstTimeFetchWallet: state.userReducer.firstTimeFetchWallet,
  channelInfo: channelInfo(state),
  anyPendingTxn: anyPendingTxn(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startLoader: () =>
    dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION(ownProps.service.display_name))),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
  fetchMeteringData: args => dispatch(serviceDetailsActions.fetchMeteringData(args)),
  startWalletDetailsPolling: (orgId, groupId) => dispatch(userActions.startWalletDetailsPolling(orgId, groupId)),
  stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),

  fetchOrderDetails: orderId => dispatch(paymentActions.fetchOrderDetails(orderId)),
  updateWallet: walletDetails => dispatch(userActions.updateWallet(walletDetails)),
  updatePaypalInProgress: (orderId, orderType, paymentId, paypalPaymentId, PayerID) =>
    dispatch(paymentActions.updatePaypalInProgress(orderId, orderType, paymentId, paypalPaymentId, PayerID)),
  startInitServiceDemoLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.INIT_SERVICE_DEMO)),
  fetchUSDConversionRate: () => dispatch(paymentActions.fetchUSDConversionRate),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(ServiceDemo)));
