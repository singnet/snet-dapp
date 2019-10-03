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

const TransactionAlert = {
  PENDING: { type: alertTypes.WARNING, message: "Transaction Confirmed. Pending token allocation" },
  FAILED: { type: alertTypes.ERROR, message: "Transaction Failed. See history for more details" },
};

class ExpiredSession extends Component {
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
  // handleAddPayment = () => {
  //   history.push(`/${Routes.USER_PROFILE}`);
  // };

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
                disabled={!isEmpty(wallet)}
                labelTxt="Select a Wallet"
                list={channelPaymentOptions}
                value={wallet.type || "default"}
                onChange={this.handlePayTypeChange}
              />
            </div>
          </div>
          <div className={classes.channelBalance}>
            <PaymentInfoCard
              show={!isEmpty(channelInfo)}
              title="channel balance"
              value={!isEmpty(channelInfo) && channelInfo.balanceInAgi}
              unit="AGI"
            />
          </div>
          <AlertBox {...(TransactionAlert[wallet.status] || {})} />
        </div>
        <WalletDetailsToggler
          show={Boolean(wallet.type)}
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
});

const mapDispatchToProps = dispatch => ({
  updateWallet: args => dispatch(userActions.updateWallet(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ExpiredSession));
