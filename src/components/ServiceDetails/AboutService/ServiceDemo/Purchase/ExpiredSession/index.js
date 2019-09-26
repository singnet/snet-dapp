import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { alertTypes } from "../../../../../common/AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../../../../Redux/actionCreators/UserActions";
import StyledDropdown from "../../../../../common/StyledDropdown";
import PaymentInfoCard from "../PaymentInfoCard";
import CreateWalletPopup from "./GeneralAccountWallet/CreateWalletPopup";
import { initSdk } from "../../../../../../utility/sdk";
import isEmpty from "lodash/isEmpty";
import { userActions } from "../../../../../../Redux/actionCreators";
import WalletDetailsToggler from "./WalletDetailsToggler";

class ExpiredSession extends Component {
  state = {
    showCreateWalletPopup: false,
    alert: {},
  };

  handleCreateWallet = () => {
    this.setState({ showCreateWalletPopup: true });
  };

  handlePayTypeChange = async event => {
    const { value } = event.target;
    const { updateWallet } = this.props;
    this.setState({ alert: {} });
    if (value === walletTypes.METAMASK) {
      try {
        const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
        const sdk = await initSdk(selectedEthAddress);
        const address = sdk.account.address;
        //1. To be replaced with wallet API
        if (!isEmpty(address)) {
          sessionStorage.setItem("wallet", JSON.stringify({ type: walletTypes.METAMASK, address }));
          updateWallet({ type: value, address });
          return;
        }
        this.setState({
          alert: { type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` },
        });
        //till here(1)
      } catch (error) {
        this.setState({ alert: { type: alertTypes.ERROR, message: `Something went wrong. Please try again` } });
      }
    }
    if (value === walletTypes.GENERAL) {
      sessionStorage.setItem("wallet", JSON.stringify({ type: walletTypes.GENERAL }));
      updateWallet({ type: value });
      return;
    }
    //2. to be removed once wallet API is available
    sessionStorage.removeItem("wallet");
    //till here(2)
    updateWallet({ type: value });
  };

  handlePopupClose = () => {
    this.setState({ showCreateWalletPopup: false });
  };
  // handleAddPayment = () => {
  //   history.push(`/${Routes.USER_PROFILE}`);
  // };

  render() {
    const {
      classes,
      paymentInfoCardTitle,
      paymentInfoCardValue,
      paymentInfoCardUnit,
      wallet,
      handleComplete,
      groupInfo,
      handlePurchaseError,
      isServiceAvailable,
    } = this.props;
    const { showCreateWalletPopup } = this.state;
    const channelPaymentOptions = [
      { value: walletTypes.GENERAL, label: "General Account Wallet" },
      { value: walletTypes.METAMASK, label: "Metamask" },
    ];
    return (
      <div className={classes.mainContainer}>
        <Typography variant="body1" className={classes.description}>
          You have run out of free trial. Please select a payment method to continue
        </Typography>

        <div className={classes.paymentChannelAndDetails}>
          <div className={classes.paymentChannelDropDownContainer}>
            <InfoIcon className={classes.infoIconContainer} />
            <div className={classes.paymentChannelDropDown}>
              <Typography className={classes.dropDownTitle} variant="subtitle1">
                Payment Channel
              </Typography>
              <AccountBalanceWalletIcon className={classes.walletIcon} />
              <StyledDropdown
                labelTxt="Select a Wallet"
                list={channelPaymentOptions}
                value={wallet.type || "default"}
                onChange={this.handlePayTypeChange}
              />
            </div>
          </div>
          <div className={classes.channelBalance}>
            <PaymentInfoCard
              title={paymentInfoCardTitle || "s: channel balance"}
              value={paymentInfoCardValue || "s : 0.00134"}
              unit={paymentInfoCardUnit || "s"}
            />
          </div>
          <div className={classes.alertBoxConatiner} />
        </div>
        <WalletDetailsToggler
          metamask={wallet.type === walletTypes.METAMASK}
          metamaskProps={{
            handleContinue: handleComplete,
            groupInfo,
            handlePurchaseError,
            isServiceAvailable,
          }}
        />

        <CreateWalletPopup open={showCreateWalletPopup} handleClose={this.handlePopupClose} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  updateWallet: args => dispatch(userActions.updateWallet(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ExpiredSession));

//props
// classes,
//   handleComplete,
//   groupInfo,
//   history,
//   handlePurchaseError,
//   isServiceAvailable,
//   wallet,
