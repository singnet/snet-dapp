import React, { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import StyledButton from "../../../../../../common/StyledButton";
import PaymentInfoCard from "../../PaymentInfoCard";
import PurchaseDialog from "../../PurchaseDialog";
import ChannelSelectionBox from "../../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import { cogsToAgi } from "../../../../../../../utility/PricingStrategy";
import { pricing } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import PaymentChannelManagement from "../../../../../../../utility/PaymentChannelManagement";
import { loaderActions, userActions, sdkActions } from "../../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../../utility/constants/LoaderContent";
import { useStyles } from "./style";
import { isUndefined } from "lodash";

import { currentServiceDetails } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

const connectMMinfo = {
  type: alertTypes.ERROR,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to install and learn more about how to use Metamask and your AGIX credits with SinguarlityNet AI Marketplace.`,
};

const MIN_CALLS_NUMBER = 1;

const paymentInfoCardData = {
  mpeBal: {
    title: "Escrow Balance",
    id: "mpeBal",
    unit: "AGIX",
  },
  channelBalance: {
    title: "Channel Balance",
    id: "channelBalance",
    unit: "AGIX",
  },
};

class MetamaskFlow extends Component {
  state = {
    mpeBal: "0",
    selectedPayType: payTypes.CHANNEL_BALANCE,
    disabledPayTypes: [],
    showPurchaseDialog: false,
    noOfServiceCalls: 1,
    totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
    alert: {},
    showTooltip: false,
    channelBalanceFromBack: 0,
    isStartServiceDisable: false,
  };

  sdk;

  serviceClient;

  componentDidMount = async () => {
    this.sdk = await this.props.getSdk();
    await this.initializedPaymentChannel();
    // await this.getChannelBalanceFromBack();
  };

  handleDisabledPaytypes = (channelBalance, mpeBal) => {
    const disabledPayTypes = [];
    let { selectedPayType } = this.state;

    if (channelBalance <= 0 && !disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)) {
      disabledPayTypes.push(payTypes.CHANNEL_BALANCE);
      selectedPayType = "";
    }
    if (mpeBal <= 0) {
      if (!disabledPayTypes.includes(payTypes.SINGLE_CALL)) {
        disabledPayTypes.push(payTypes.SINGLE_CALL);
      }
      if (!disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)) {
        disabledPayTypes.push(payTypes.MULTIPLE_CALLS);
      }
    }
    this.setState({ disabledPayTypes, selectedPayType });
  };

  initializedPaymentChannel = async () => {
    const {
      startChannelSetupLoader,
      stopLoader,
      getSdk,
      serviceDetails: { org_id, service_id },
      groupInfo,
    } = this.props;
    this.setState({ alert: {} });
    try {
      startChannelSetupLoader();
      const sdk = await getSdk();
      const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
      this.paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
      this.setState({ isStartServiceDisable: false });
    } catch (error) {
      console.log("initializedPaymentChannel error: ", error);
      this.setState({ isStartServiceDisable: true });
      this.setState({ alert: connectMMinfo });
    }
    stopLoader();
  };

  getPaymentChannelData = async () => {
    const { startChannelSetupLoader, stopLoader } = this.props;
    this.setState({ alert: {} });
    try {
      startChannelSetupLoader();
      await this.paymentChannelManagement.updateChannelInfo();
      await this.getBalanceData();
    } catch (error) {
      this.setState({ alert: connectMMinfo });
    }
    stopLoader();
  };

  // updateChannelBalanceAPI = async () => {
  //   const { updateChannelBalanceAPI, serviceDetails } = this.props;
  //   console.log("this.paymentChannelManagement: ", this.paymentChannelManagement);
  //   const channel = this.paymentChannelManagement._channel;
  //   await updateChannelBalanceAPI(
  //     serviceDetails.org_id,
  //     serviceDetails.service_id,
  //     serviceDetails.groups[0].group_id,
  //     Number(channel._state.availableAmount),
  //     Number(channel._state.amountDeposited),
  //     Number(channel._channelId),
  //     Number(channel._state.nonce)
  //   );
  // };

  getBalanceData = async () => {
    const { updateMetamaskWallet, startChannelSetupLoader, stopLoader } = this.props;
    this.setState({ alert: {} });
    startChannelSetupLoader();
    try {
      await updateMetamaskWallet();
      const mpeBal = await this.sdk.account.escrowBalance();
      const channelBalance = this.paymentChannelManagement.availableBalance();
      const channelBalanceInCogs = cogsToAgi(channelBalance);
      console.log(channelBalanceInCogs);

      if (channelBalanceInCogs > this.state.totalPrice) {
        await this.handleSubmit();
      }
      // await this.updateChannelBalanceAPI();
      this.handleDisabledPaytypes(channelBalance, mpeBal);
      this.setState({
        mpeBal: cogsToAgi(mpeBal),
        channelBalance: channelBalanceInCogs,
      });
    } catch (error) {
      console.log("getBalanceData error");
      this.setState({ alert: connectMMinfo });
    }
    stopLoader();
  };

  handlePayTypeChange = (value) => {
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

  isValidCallsNumber = (numberOfCalls) => {
    const isInteger = numberOfCalls % 1 === 0;
    const isNumber = !isNaN(Number(numberOfCalls));
    return isInteger && isNumber;
  };

  isCallsMoreOrEqualThanMinimum = () => {
    const numberOfCalls = this.state.noOfServiceCalls;
    return numberOfCalls >= MIN_CALLS_NUMBER;
  };

  formatValue = (value) => {
    let stringValue = String(value);
    if (stringValue[0] === "0" && stringValue.length > 1) {
      stringValue = stringValue.slice(1);
      return stringValue;
    }
    return value;
  };

  handleNoOfCallsChange = (event) => {
    let noOfServiceCalls = event.target.value;
    if (!noOfServiceCalls || noOfServiceCalls === 0) {
      noOfServiceCalls = 0;
    }
    noOfServiceCalls = this.formatValue(noOfServiceCalls);
    if (!this.isValidCallsNumber(noOfServiceCalls)) {
      return;
    }
    const totalPrice = String(cogsToAgi(this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)));
    this.setState({ noOfServiceCalls, totalPrice });
  };

  handleSubmit = async () => {
    const { startChannelSetupLoader, stopLoader, handleContinue } = this.props;
    startChannelSetupLoader();
    this.setState({ alert: {} });

    let { noOfServiceCalls, selectedPayType } = this.state;
    if (selectedPayType === payTypes.CHANNEL_BALANCE) {
      try {
        const isChannelNearToExpiry = await this.paymentChannelManagement.isChannelNearToExpiry();
        if (isChannelNearToExpiry) {
          await this.paymentChannelManagement.extendChannel();
        }
        handleContinue();
      } catch (e) {
        this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      stopLoader();
      return;
    }
    if (selectedPayType === payTypes.SINGLE_CALL) {
      noOfServiceCalls = 1;
    }
    try {
      const mpeBal = await this.sdk.account.escrowBalance();
      if (mpeBal < this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)) {
        this.setState({
          mpeBal,
          alert: {
            type: alertTypes.ERROR,
            message: "Insufficient MPE balance. Please deposit some AGIX tokens to your escrow account",
          },
        });
        return;
      }
      if (!this.paymentChannelManagement.channel) {
        await this.paymentChannelManagement.openChannel(noOfServiceCalls);
      } else {
        await this.paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      }

      handleContinue();
      stopLoader();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Unable to execute the call" } });
      stopLoader();
    }
  };

  shouldContinueBeEnabled = () => {
    const { mpeBal, totalPrice, channelBalance, selectedPayType } = this.state;
    return (
      // if pay type multiple calls the call number should be more than MIN_CALLS_NUMBER
      (selectedPayType !== payTypes.MULTIPLE_CALLS || this.isCallsMoreOrEqualThanMinimum()) &&
      selectedPayType &&
      this.props.isServiceAvailable &&
      (Number(mpeBal) >= Number(totalPrice) || Number(channelBalance) >= Number(totalPrice))
    );
  };

  shouldDepositToEscrowBeHighlighted = () => this.state.mpeBal <= 0;

  handleTooltipOpen = () => {
    if (!this.props.isServiceAvailable) {
      this.setState({ showTooltip: true });
    }
  };

  handleTooltipClose = () => {
    this.setState({ showTooltip: false });
  };

  // getChannelBalanceFromBack = async () => {
  //   const {
  //     serviceDetails: { org_id },
  //   } = this.props;
  //   const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
  //   console.log("this.paymentChannelManagement: ", this.paymentChannelManagement);
  //   const channelId = this.paymentChannelManagement?._channel?._channelId;
  //   if (!channelId) {
  //     this.setState({ channelBalanceFromBack: 0 });
  //     return;
  //   }
  //   const providers = await userActions.fetchWalletLinkedProviders(selectedEthAddress);
  //   const [provider] = providers.filter((provider) => provider.org_id === org_id);
  //   if (channelId && provider.groups[0]) {
  //     const [channel] = provider.groups[0].channels.filter((channelItem) => channelItem.channel_id === channelId);
  //     const channelBalance = Number(channel.current_balance);
  //     this.setState({ channelBalanceFromBack: channelBalance });
  //   }
  // };
  //
  render() {
    const { classes } = this.props;
    const {
      showPurchaseDialog,
      channelBalance,
      // channelBalanceFromBack,
      selectedPayType,
      disabledPayTypes,
      noOfServiceCalls,
      totalPrice,
      alert,
      showTooltip,
      isStartServiceDisable,
    } = this.state;
    if (isUndefined(channelBalance) || isNaN(channelBalance)) {
      // const channelBalanceCard = paymentInfoCardData.channelBalance;
      return (
        <>
          {/* {this.sdk && (
            <PaymentInfoCard
              key={channelBalanceCard.id}
              title={channelBalanceCard.title}
              value={channelBalanceFromBack}
              unit={channelBalanceCard.unit}
            />
          )} */}
          {/* <div className={classes.runServiceContainer}> */}
          <StyledButton
            type="blue"
            btnText="run service"
            onClick={this.getPaymentChannelData}
            disabled={isStartServiceDisable}
          />
          <AlertBox type={alert.type} message={alert.message} />
          {/* </div> */}
        </>
      );
    }
    return (
      <div className={classes.PurchaseFlowContainer}>
        <PurchaseDialog show={showPurchaseDialog} onClose={this.handlePurchaseDialogClose} />
        <div className={classes.paymentInfoCard}>
          {Object.values(paymentInfoCardData).map((item) => (
            <PaymentInfoCard key={item.id} title={item.title} value={this.state[item.id]} unit={item.unit} />
          ))}
        </div>
        <div className={classes.ChannelSelectionBoxMainContainer}>
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
              unit: "AGIX",
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
              totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
              unit: "AGIX",
              noInput: true,
            }}
            disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
          />
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonContainer}>
          <StyledButton
            type={this.shouldDepositToEscrowBeHighlighted() ? "blue" : "transparent"}
            btnText="Deposit into Escrow"
            onClick={this.handlePurchaseDialogOpen}
          />
          <Tooltip
            title="Service is currently offline. Please try after sometime"
            aria-label="add-payment"
            open={showTooltip}
            onOpen={this.handleTooltipOpen}
            onClose={this.handleTooltipClose}
            className={classes.tooltip}
          >
            <div>
              <StyledButton
                type="blue"
                btnText="Continue"
                onClick={this.handleSubmit}
                disabled={!this.shouldContinueBeEnabled()}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pricing: pricing(state),
  serviceDetails: currentServiceDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  startChannelSetupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC)),
  updateMetamaskWallet: () => dispatch(userActions.updateMetamaskWallet()),
  // stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
  getSdk: () => dispatch(sdkActions.getSdk()),
  // updateChannelBalanceAPI: (orgId, serviceId, groupId, authorizedAmount, fullAmount, channelId, nonce) =>
  //   dispatch(
  //     userActions.updateChannelBalanceAPI(orgId, serviceId, groupId, authorizedAmount, fullAmount, channelId, nonce)
  //   ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MetamaskFlow));
