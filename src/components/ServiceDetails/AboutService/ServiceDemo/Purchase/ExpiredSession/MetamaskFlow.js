import React, { Component } from "react";
import { connect } from "react-redux";

import StyledButton from "../../../../../common/StyledButton";
import PaymentInfoCard from "../PaymentInfoCard";
import PurchaseDialog from "../PurchaseDialog";
import ChannelSelectionBox from "../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { initSdk } from "../../../../../../utility/sdk";
import { cogsToAgi } from "../../../../../../utility/PricingStrategy";
import { pricing } from "../../../../../../Redux/reducers/ServiceDetailsReducer";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import PaymentChannelManagement from "../../../../../../utility/PaymentChannelManagement";
import { loaderActions } from "../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../utility/constants/LoaderContent";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

const connectMMinfo = {
  type: alertTypes.WARNING,
  message: `Please Login or Install to your Metamask wallet account and connect to SingularityNet. 
Click here to install and learn more about how to use Metamask and your AGI credits with SinguarlityNet AI Marketplace.`,
};

class MetamaskFlow extends Component {
  state = {
    MMconnected: false,
    selectedPayType: payTypes.CHANNEL_BALANCE,
    disabledPayTypes: [],
    showPurchaseDialog: false,
    noOfServiceCalls: 1,
    totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),

    alert: {},
  };

  PaymentInfoCardData = [
    {
      title: "Payment Channel",
      value: "Metamask",
    },
    {
      title: "Escrow Balance",
      value: "1.065627",
      unit: "AGI",
    },
    {
      title: "Channel Balance",
      value: "0.065627",
      unit: "AGI",
    },
  ];

  handleConnectMM = async () => {
    const { groupInfo, startMMconnectLoader, stopLoader } = this.props;
    try {
      startMMconnectLoader();
      const sdk = await initSdk();
      let mpeBal = await sdk.account.escrowBalance();
      const serviceClientOptions = { endpoint: "https://example-service-a.singularitynet.io:8088" };
      const serviceClient = new ServiceClient(
        sdk,
        "snet",
        "example-service",
        sdk._mpeContract,
        {},
        groupInfo,
        undefined,
        serviceClientOptions
      );
      const paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
      await paymentChannelManagement.updateChannelInfo();
      if (!paymentChannelManagement.channel) {
        await paymentChannelManagement.openChannel();
        mpeBal = await sdk.account.escrowBalance();
      }
      this.PaymentInfoCardData.map(el => {
        if (el.title === "Escrow Balance") {
          el.value = cogsToAgi(mpeBal);
        }
        if (el.title === "Channel Balance") {
          el.value = cogsToAgi(paymentChannelManagement.channel.state.availableAmount);
        }
        return el;
      });
      this.setState({ MMconnected: true });
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to connect to metamask ${error}` } });
    }
    stopLoader();
  };

  handlePayTypeChange = value => {
    const { disabledPayTypes, selectedPayType } = this.state;
    if (disabledPayTypes.includes(value) || selectedPayType === value) {
      return;
    }
    this.setState({ selectedPayType: value });
  };

  handlePurchaseDialogOpen = () => {
    this.setState({ showPurchaseDialog: true });
  };

  handlePurchaseDialogClose = () => {
    this.setState({ showPurchaseDialog: false });
  };

  handleNoOfCallsChange = event => {
    const noOfServiceCalls = event.target.value;
    const totalPrice = String(((noOfServiceCalls * 2) / 100000000).toFixed(8));
    this.setState({ noOfServiceCalls, totalPrice });
  };

  handleSubmit = async () => {
    try {
      const { groupInfo } = this.props;
      let { noOfServiceCalls, selectedPayType } = this.state;
      const sdk = await initSdk();
      const serviceClientOptions = { endpoint: "https://example-service-a.singularitynet.io:8088" };
      const serviceClient = new ServiceClient(
        sdk,
        "snet",
        "example-service",
        sdk._mpeContract,
        {},
        groupInfo,
        undefined,
        serviceClientOptions
      );
      const paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
      if (selectedPayType === payTypes.SINGLE_CALL) {
        noOfServiceCalls = 1;
      }
      await paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      this.props.handleContinue();
    } catch (error) {
      console.log("Error", error);
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to execute the call: ${error}` } });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      MMconnected,
      showPurchaseDialog,
      selectedPayType,
      disabledPayTypes,
      noOfServiceCalls,
      totalPrice,
      alert,
    } = this.state;
    if (!MMconnected) {
      return (
        <div className={classes.ExpiredSessionContainer}>
          <AlertBox type={connectMMinfo.type} message={connectMMinfo.message} />
          <AlertBox type={alert.type} message={alert.message} />
          <StyledButton type="blue" btnText="connect metamask" onClick={this.handleConnectMM} />
        </div>
      );
    }
    return (
      <div className={classes.PurchaseFlowContainer}>
        <PurchaseDialog
          show={showPurchaseDialog}
          onClose={this.handlePurchaseDialogClose}
          refetchAccBalance={this.handleConnectMM}
        />
        <p className={classes.PurchaseFlowDescription}>
          Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload
          a a file from your computer, URL, or select image from the gallery. You can specify additional parameters in
          the panel below. “Mouse over” for tool tips.
        </p>
        <div className={classes.paymentInfoCard}>
          {this.PaymentInfoCardData.map(item => (
            <PaymentInfoCard key={item.title} title={item.title} value={item.value} unit={item.unit} />
          ))}
        </div>
        <div className={classes.ChannelSelectionBoxMainContainer}>
          <div>
            <span className={classes.channelSelectionTitle}>Recommended</span>
            <ChannelSelectionBox
              title="Channel Balance"
              description="You have 0.065627 tokens in you channel. This can be used for running demos across all the services from this vendor."
              checked={selectedPayType === payTypes.CHANNEL_BALANCE}
              value={payTypes.CHANNEL_BALANCE}
              onClick={() => this.handlePayTypeChange(payTypes.CHANNEL_BALANCE)}
              disabled={disabledPayTypes.includes(payTypes.CHANNEL_BALANCEx)}
            />
          </div>
          <div>
            <span className={classes.channelSelectionTitle}>Best Value</span>
            <ChannelSelectionBox
              title="Multiple Calls"
              description="Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost."
              checked={selectedPayType === payTypes.MULTIPLE_CALLS}
              value={payTypes.MULTIPLE_CALLS}
              onClick={() => this.handlePayTypeChange(payTypes.MULTIPLE_CALLS)}
              inputProps={{
                noOfServiceCalls,
                onChange: this.handleNoOfCallsChange,
                totalPrice,
                unit: "AGI",
              }}
              disabled={disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)}
            />
            <ChannelSelectionBox
              title="Single Call"
              description="Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance."
              checked={selectedPayType === payTypes.SINGLE_CALL}
              value={payTypes.SINGLE_CALL}
              onClick={() => this.handlePayTypeChange(payTypes.SINGLE_CALL)}
              inputProps={{
                noOfServiceCalls: 1,
                totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
                unit: "AGI",
                disabled: true,
              }}
              disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
            />
          </div>
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonContainer}>
          <StyledButton type="transparent" btnText="Deposit into Escrow" onClick={this.handlePurchaseDialogOpen} />
          <StyledButton type="blue" btnText="Continue" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pricing: pricing(state),
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskFlow);
