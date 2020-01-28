import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../../../../Redux/actionCreators/UserActions";
import StyledDropdown from "../../../../../common/StyledDropdown";
import PaymentInfoCard from "../PaymentInfoCard";
import { initSdk } from "../../../../../../utility/sdk";
import isEmpty from "lodash/isEmpty";
import { userActions } from "../../../../../../Redux/actionCreators";
import WalletDetailsToggler from "./WalletDetailsToggler";
import { channelInfo } from "../../../../../../Redux/reducers/UserReducer";
import { anyPendingTxn, anyFailedTxn } from "../../../../../../Redux/reducers/PaymentReducer";

const TransactionAlert = {
  PENDING: { type: alertTypes.WARNING, message: "Transaction Confirmed. Pending token allocation" },
  FAILED: { type: alertTypes.ERROR, message: "Transaction Failed. See history for more details" },
};

class ExpiredSession extends Component {
  handlePayTypeChange = async event => {
    const { value } = event.target;
    const { updateWallet, stopWalletDetailsPolling } = this.props;
    this.setState({ alert: {} });
    if (value === walletTypes.METAMASK) {
      try {
        const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
        const sdk = await initSdk(selectedEthAddress);
        const address = sdk.account.address;

        if (!isEmpty(address)) {
          stopWalletDetailsPolling();
          updateWallet({ type: value, address });
          return;
        }
        this.setState({
          alert: { type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` },
        });
      } catch (error) {
        this.setState({ alert: { type: alertTypes.ERROR, message: `Something went wrong. Please try again` } });
      }
    }
    if (value === walletTypes.GENERAL) {
      stopWalletDetailsPolling();
      updateWallet({ type: value });
      return;
    }
    updateWallet({ type: value });
  };

  transactionAlert = () => {
    const { anyPendingTxn, anyFailedTxn, wallet } = this.props;
    if (wallet.type === walletTypes.GENERAL && anyPendingTxn) {
      return TransactionAlert.PENDING;
    }
    if (wallet.type === walletTypes.GENERAL && anyFailedTxn) {
      return TransactionAlert.FAILED;
    }
    return {};
  };

  render() {
    const {
      classes,
      wallet,
      handleComplete,
      groupInfo,
      handlePurchaseError,
      isServiceAvailable,
      channelInfo,
    } = this.props;
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
              show={!isEmpty(channelInfo) && wallet.type === walletTypes.GENERAL}
              title="Channel Balance"
              value={!isEmpty(channelInfo) && channelInfo.balanceInAgi}
              unit="AGI"
            />
          </div>
          <AlertBox {...this.transactionAlert()} />
        </div>
        <WalletDetailsToggler
          show={wallet.type !== walletTypes.DEFAULT}
          metamask={wallet.type === walletTypes.METAMASK}
          generalWalletProps={{ handleContinue: handleComplete }}
          metamaskProps={{
            handleContinue: handleComplete,
            groupInfo,
            handlePurchaseError,
            isServiceAvailable,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state),
  anyPendingTxn: anyPendingTxn(state),
  anyFailedTxn: anyFailedTxn(state),
});

const mapDispatchToProps = dispatch => ({
  updateWallet: args => dispatch(userActions.updateWallet(args)),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ExpiredSession));
