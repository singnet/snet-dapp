import React, { Component } from "react";
import { connect } from "react-redux";

import StyledButton from "../../../../../common/StyledButton";
import PaymentInfoCard from "../PaymentInfoCard";
import PurchaseDialog from "../PurchaseDialog";
import ChannelSelectionBox from "../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { initSdk } from "../../../../../../utility/sdk";
import { cogsToAgi } from "../../../../../../utility/PricingStrategy";
import { currentServiceDetails, pricing } from "../../../../../../Redux/reducers/ServiceDetailsReducer";
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

  serviceClient;

  paymentChannelManagement;

  componentDidMount = () => {
    this.initializePaymentChannel();
  };

  initializePaymentChannel = async () => {
    const {
      serviceDetails: { org_id, service_id },
      groupInfo,
    } = this.props;
    const sdk = await initSdk();
    this.serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    this.paymentChannelManagement = new PaymentChannelManagement(sdk, this.serviceClient);
  };

  PaymentInfoCardData = [
    {
      title: "Payment Channel",
      value: "Metamask",
    },
    {
      title: "Escrow Balance",
      value: "",
      unit: "AGI",
    },
    {
      title: "Channel Balance",
      value: "",
      unit: "AGI",
    },
  ];

  handleDisabledPaytypes = ({ channelBalance }) => {
    const { disabledPayTypes } = this.state;
    if (channelBalance <= 0 && !disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)) {
      disabledPayTypes.push(payTypes.CHANNEL_BALANCE);
    }
    this.setState({ disabledPayTypes, selectedPayType: payTypes.SINGLE_CALL });
  };

  handleConnectMM = async () => {
    const { startMMconnectLoader, stopLoader } = this.props;
    try {
      startMMconnectLoader();
      const sdk = await initSdk();
      let mpeBal = await sdk.account.escrowBalance();
      await this.paymentChannelManagement.updateChannelInfo();
      if (!this.paymentChannelManagement.channel) {
        await this.paymentChannelManagement.openChannel();
        mpeBal = await sdk.account.escrowBalance();
      }

      this.PaymentInfoCardData.map(el => {
        if (el.title === "Escrow Balance") {
          el.value = cogsToAgi(mpeBal);
        }
        if (el.title === "Channel Balance") {
          el.value = cogsToAgi(this.paymentChannelManagement.channel.state.availableAmount);
        }
        return el;
      });

      this.handleDisabledPaytypes({ channelBalance: this.paymentChannelManagement.channel.state.availableAmount });

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
    let { noOfServiceCalls, selectedPayType } = this.state;
    try {
      if (selectedPayType === payTypes.SINGLE_CALL) {
        noOfServiceCalls = 1;
      }
      await this.paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      this.props.handleContinue();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to execute the call: ${error}` } });
    }
  };

  parseChannelBalFromPaymentCard = () => {
    return this.PaymentInfoCardData.find(el => el.title === "Channel Balance")[0].value;
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
              description={`You have 1 AGI in you channel. This can be used for running demos across all the services from this vendor.`}
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
  serviceDetails: currentServiceDetails(state),
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
