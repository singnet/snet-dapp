import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Typography from "@mui/material/Typography";
import { walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import StyledDropdown from "../../../../common/StyledDropdown";
import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { channelInfo } from "../../../../../Redux/reducers/UserReducer";
import PaymentInfoCard from "../../../AboutService/ServiceDemo/Purchase/PaymentInfoCard";
import { loaderActions, userActions, sdkActions } from "../../../../../Redux/actionCreators";
import { anyPendingTxn, anyFailedTxn } from "../../../../../Redux/reducers/PaymentReducer";
import WalletDetailsToggler from "../../../AboutService/ServiceDemo/Purchase/ExpiredSession/WalletDetailsToggler";
import { useStyles } from "./styles";
import { groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";

const TransactionAlert = {
  PENDING: { type: alertTypes.WARNING, message: "Transaction Confirmed. Pending token allocation" },
  FAILED: { type: alertTypes.ERROR, message: "Transaction Failed. See history for more details" },
};

class PaymentMode extends Component {
  state = {
    alert: {},
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

  handlePayTypeChange = async (event) => {
    const { value } = event.target;
    const { updateWallet } = this.props;
    this.setState({ alert: {} });
    if (value === walletTypes.METAMASK) {
      try {
        const sdk = await this.props.getSdk();
        const address = await sdk.account.getAddress();

        if (!isEmpty(address)) {
          // stopWalletDetailsPolling();
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
      // stopWalletDetailsPolling();
      updateWallet({ type: value });
      return;
    }
    updateWallet({ type: value });
  };

  handlePurchaseError = (error) => {
    this.setState({
      alert: { type: alertTypes.ERROR, message: "Purchase could not be completed. Please try again" },
    });
    this.props.stopLoader();
  };

  render() {
    const { classes, wallet, groupInfo, service, channelInfo } = this.props;

    const channelPaymentOptions = [
      { value: walletTypes.GENERAL, label: "PayPal" },
      { value: walletTypes.METAMASK, label: "Metamask" },
    ];

    return (
      <div className={classes.paymentMode}>
        <p>Please select a payment method to continue</p>
        <div className={classes.paymentChannelAndDetails}>
          <div className={classes.paymentChannelDropDownContainer}>
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
              title=""
              value={!isEmpty(channelInfo) && channelInfo.balanceInAgi}
              unit="AGIX"
            />
          </div>
          <AlertBox {...this.transactionAlert()} />
        </div>
        <WalletDetailsToggler
          show={wallet.type !== walletTypes.DEFAULT}
          metamask={wallet.type === walletTypes.METAMASK}
          generalWalletProps={{ handleContinue: this.props.handlePurchaseComplete }}
          metamaskProps={{
            handleContinue: this.props.handlePurchaseComplete,
            groupInfo,
            handlePurchaseError: this.handlePurchaseError,
            isServiceAvailable: Boolean(service.is_available),
          }}
        />
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state),
  anyPendingTxn: anyPendingTxn(state),
  anyFailedTxn: anyFailedTxn(state),
  groupInfo: groupInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
  updateWallet: (args) => dispatch(userActions.updateWallet(args)),
  // stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),
  getSdk: () => dispatch(sdkActions.getSdk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PaymentMode));
