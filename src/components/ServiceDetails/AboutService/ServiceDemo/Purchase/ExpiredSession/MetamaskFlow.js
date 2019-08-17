import React, { Component } from "react";
import { connect } from "react-redux";

import StyledButton from "../../../../../common/StyledButton";
import PaymentInfoCard from "../PaymentInfoCard";
import PurchaseDialog from "../PurchaseDialog";
import ChannelSelectionBox from "../ChannelSelectionBox";
import AlertBox from "../../../../../common/AlertBox";
import { initSdk } from "../../../../../../utility/sdk";
import { cogsToAgi } from "../../../../../../utility/PricingStrategy";
import { pricing } from "../../../../../../Redux/reducers/ServiceDetailsReducer";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import PaymentChannelManagement from '../../../../../../utility/PaymentChannelManagement';

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

class MetamaskFlow extends Component {
  state = {
    MMconnected: false,
    selectedPayType: payTypes.CHANNEL_BALANCE,
    disabledPayTypes: [payTypes.SINGLE_CALL],
    showPurchaseDialog: false,
    noOfCalls: 1,
    totalPrice: "0.00000002",
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
    const { groupInfo } = this.props;
    const sdk = await initSdk();
    let mpeBal = await sdk.account.escrowBalance();
    const serviceClient = new ServiceClient(
      sdk,
      'snet',
      'example-service',
      sdk._mpeContract,
      {},
      groupInfo,
      undefined
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
  };

  handlePayTypeChange = value => {
    if (this.state.disabledPayTypes.includes(value)) {
      return;
    }
    this.setState({ disabledPayTypes: value });
  };

  handlePurchaseDialogOpen = () => {
    this.setState({ showPurchaseDialog: true });
  };

  handlePurchaseDialogClose = () => {
    this.setState({ showPurchaseDialog: false });
  };

  handleNoOfCallsChange = event => {
    const noOfCalls = event.target.value;
    const totalPrice = String(((noOfCalls * 2) / 100000000).toFixed(8));
    this.setState({ noOfCalls, totalPrice });
  };

  render() {
    const { classes, handleContinue } = this.props;
    const { MMconnected, showPurchaseDialog, selectedPayType, disabledPayTypes, noOfCalls, totalPrice } = this.state;
    if (!MMconnected) {
      return (
        <div className={classes.ExpiredSessionContainer}>
          <AlertBox
            type="warning"
            message={`Please Login or Install to your Metamask wallet account and connect to SingularityNet. 
Click here to install and learn more about how to use Metamask and your AGI credits with SinguarlityNet AI Marketplace.`}
          />
          <StyledButton type="blue" btnText="connect metamsask" onClick={this.handleConnectMM} />
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
                noOfCalls,
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
                noOfCalls: 1,
                totalPrice: 0.000002,
                unit: "AGI",
              }}
              disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <StyledButton type="transparent" btnText="Deposit into Escrow" onClick={this.handlePurchaseDialogOpen} />
          <StyledButton type="blue" btnText="Continue" onClick={handleContinue} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pricing: pricing(state),
});

export default connect(mapStateToProps)(MetamaskFlow);
