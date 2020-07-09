import React, { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";

import StyledButton from "../../../../../../common/StyledButton";
import PaymentInfoCard from "../../PaymentInfoCard";
import PurchaseDialog from "../../PurchaseDialog";
import ChannelSelectionBox from "../../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import { initSdk } from "../../../../../../../utility/sdk";
import { cogsToAgi } from "../../../../../../../utility/PricingStrategy";
import { currentServiceDetails, pricing } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import PaymentChannelManagement from "../../../../../../../utility/PaymentChannelManagement";
import { loaderActions, userActions } from "../../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../../utility/constants/LoaderContent";
import { useStyles } from "./style";
import { walletTypes } from "../../../../../../../Redux/actionCreators/UserActions";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

const connectMMinfo = {
  type: alertTypes.WARNING,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to install and learn more about how to use Metamask and your AGI credits with SinguarlityNet AI Marketplace.`,
};

class MetamaskFlow extends Component {
  state = {
    MMconnected: false,
    mpeBal: "0",
    selectedPayType: payTypes.CHANNEL_BALANCE,
    disabledPayTypes: [],
    showPurchaseDialog: false,
    noOfServiceCalls: 1,
    totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
    alert: {},
    showTooltip: false,
  };

  serviceClient;

  paymentChannelManagement;

  componentDidMount = () => {
    this.initializePaymentChannel();
  };

  initializePaymentChannel = async () => {
    try {
      const {
        serviceDetails: { org_id, service_id },
        groupInfo,
      } = this.props;
      const sdk = await initSdk();
      this.serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
      this.paymentChannelManagement = new PaymentChannelManagement(sdk, this.serviceClient);
    } catch (error) {
      this.props.handlePurchaseError("Unable to initialize payment channel. Please try again");
    }
  };

  PaymentInfoCardData = [
    {
      title: "Escrow Balance",
      value: this.state.mpeBal,
      unit: "AGI",
    },
    {
      title: "Channel Balance",
      value: this.state.channelBalance,
      unit: "AGI",
    },
  ];

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

  handleConnectMM = async () => {
    const { startMMconnectLoader, stopLoader, registerWallet, walletList, updateWallet } = this.props;
    this.setState({ alert: {} });
    try {
      startMMconnectLoader();
      const sdk = await initSdk();
      const mpeBal = await sdk.account.escrowBalance();
      await this.paymentChannelManagement.updateChannelInfo();
      const address = sdk.account.address;
      const addressAlreadyRegistered = walletList.some(wallet => wallet.address === address);
      if (!addressAlreadyRegistered) {
        await registerWallet(address, walletTypes.METAMASK);
      }
      updateWallet({ type: walletTypes.METAMASK, address });
      this.PaymentInfoCardData.map(el => {
        if (el.title === "Escrow Balance") {
          el.value = cogsToAgi(mpeBal);
        }
        if (el.title === "Channel Balance") {
          el.value = cogsToAgi(this.paymentChannelManagement.availableBalance());
        }
        return el;
      });
      const channelBalance = this.paymentChannelManagement.availableBalance();
      this.handleDisabledPaytypes(channelBalance, mpeBal);

      this.setState({ MMconnected: true, mpeBal, channelBalance });
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: error.message } });
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
    const totalPrice = String(cogsToAgi(this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)));
    this.setState({ noOfServiceCalls, totalPrice });
  };

  handleSubmit = async () => {
    this.props.startChannelSetupLoader();
    this.setState({ alert: {} });

    let { noOfServiceCalls, selectedPayType } = this.state;
    if (selectedPayType === payTypes.CHANNEL_BALANCE) {
      this.props.handleContinue();
      this.props.stopLoader();
      return;
    }
    if (selectedPayType === payTypes.SINGLE_CALL) {
      noOfServiceCalls = 1;
    }
    try {
      const sdk = await initSdk();
      const mpeBal = await sdk.account.escrowBalance();
      if (mpeBal < this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)) {
        this.setState({
          mpeBal,
          alert: {
            type: alertTypes.ERROR,
            message: `Insufficient MPE balance. Please deposit some AGI tokens to your escrow account`,
          },
        });
        return;
      }
      if (!this.paymentChannelManagement.channel) {
        await this.paymentChannelManagement.openChannel(noOfServiceCalls);
      } else {
        await this.paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      }

      this.props.handleContinue();
      this.props.stopLoader();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to execute the call` } });
      this.props.stopLoader();
    }
  };

  parseChannelBalFromPaymentCard = () => {
    return this.PaymentInfoCardData.find(el => el.title === "Channel Balance").value;
  };

  shouldContinueBeEnabled = () => this.state.mpeBal > 0 && this.props.isServiceAvailable;

  shouldDepositToEscrowBeHighlighted = () => this.state.mpeBal <= 0;

  handleTooltipOpen = () => {
    if (!this.props.isServiceAvailable) {
      this.setState({ showTooltip: true });
    }
  };

  handleTooltipClose = () => {
    this.setState({ showTooltip: false });
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
      showTooltip,
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
        <PurchaseDialog show={showPurchaseDialog} onClose={this.handlePurchaseDialogClose} />
        <Typography variant="body1" className={classes.PurchaseFlowDescription}>
          Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload
          a a file from your computer, URL, or select image from the gallery. You can specify additional parameters in
          the panel below. “Mouse over” for tool tips.
        </Typography>
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
              description={`You have ${this.parseChannelBalFromPaymentCard()} AGI in you channel. This can be used for running demos across all the services from this vendor.`}
              checked={selectedPayType === payTypes.CHANNEL_BALANCE}
              value={payTypes.CHANNEL_BALANCE}
              onClick={() => this.handlePayTypeChange(payTypes.CHANNEL_BALANCE)}
              disabled={disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)}
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
            classes={classes}
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

const mapStateToProps = state => ({
  serviceDetails: currentServiceDetails(state),
  pricing: pricing(state),
  wallet: state.userReducer.wallet,
  walletList: state.userReducer.walletList,
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  startChannelSetupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MetamaskFlow));
