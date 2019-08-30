import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

import { cogsToAgi, txnTypes, agiToCogs } from "../../../../utility/PricingStrategy";
import { initSdk } from "../../../../utility/sdk";
import { loaderActions } from "../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import { useStyles } from "./styles";
import StyledTextField from "../../../common/StyledTextField";
import StyledButton from "../../../common/StyledButton";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import { Networks } from "../../../../config/Networks";

class MetamaskDetails extends Component {
  state = {
    activeTab: 0,
    currentNetwork: "",
    tokenBalance: "",
    escrowBalance: "",
    amount: {},
    alert: {},
  };

  componentDidMount = async () => {
    this.props.startAccBalLoader();
    await this.retrieveAccountDetails();
    this.props.stopLoader();
  };

  retrieveAccountDetails = async () => {
    const sdk = await initSdk();
    const escrowBalance = await sdk.account.escrowBalance();
    const tokenBalance = await sdk.account.balance();
    const networkId = sdk._networkId;
    this.setState({
      escrowBalance: cogsToAgi(escrowBalance),
      tokenBalance: cogsToAgi(tokenBalance),
      currentNetwork: Networks[networkId],
    });
  };

  onTabChange = (event, value) => {
    if (this.props.handleTitleChange) {
      this.props.handleTitleChange(value);
    }
    this.setState({ activeTab: value });
  };

  handleAmountChange = (event, txnType) => {
    const { value } = event.target;
    this.setState(prevState => ({ amount: { ...prevState.amount, [txnType]: value } }));
  };

  handleDeposit = async () => {
    this.props.startDepositLoader();
    const sdk = await initSdk();
    try {
      const amountInAGI = this.state.amount[txnTypes.DEPOSIT];
      const amountInCogs = agiToCogs(amountInAGI);
      await sdk.account.depositToEscrowAccount(amountInCogs);
      await this.retrieveAccountDetails();
      this.setState({ alert: { type: alertTypes.SUCCESS, message: "Successfully deposited" } });
    } catch (err) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to deposit amount: ${err}` } });
    }
    this.props.stopLoader();
  };

  handleWithDraw = async () => {
    this.props.startWithdrawLoader();
    const sdk = await initSdk();
    try {
      const amountInAGI = this.state.amount[txnTypes.WITHDRAW];
      const amountInCogs = agiToCogs(amountInAGI);
      await sdk.account.withdrawFromEscrowAccount(amountInCogs);
      await this.retrieveAccountDetails();
      this.setState({ alert: { type: alertTypes.SUCCESS, message: "Successfully withdrawn" } });
    } catch (err) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to withdraw amount: ${err}` } });
    }
    this.props.stopLoader();
  };

  render() {
    const { classes, wallet } = this.props;
    const { activeTab, currentNetwork, tokenBalance, escrowBalance, amount, alert } = this.state;

    const tabs = [
      {
        name: "Deposit",
        activeIndex: 0,
        submitAction: this.handleDeposit,
        component: (
          <StyledTextField
            label="Amount to be deposited in AGI"
            value={amount[txnTypes.DEPOSIT] || ""}
            onChange={event => this.handleAmountChange(event, txnTypes.DEPOSIT)}
          />
        ),
      },
      {
        name: "Withdraw",
        activeIndex: 1,
        submitAction: this.handleWithDraw,
        component: (
          <StyledTextField
            label="Amount to be withdrawn in AGI"
            value={amount[txnTypes.WITHDRAW] || ""}
            onChange={event => this.handleAmountChange(event, txnTypes.WITHDRAW)}
          />
        ),
      },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0];

    return (
      <Fragment>
        <div className={classes.accountDetails}>
          <div>
            <div className={classes.label}>
              <InfoIcon />
              <span>Current Network</span>
            </div>
            <span>{currentNetwork} Network</span>
          </div>
          <div>
            <div className={classes.label}>
              <InfoIcon />
              <span>Wallet ID</span>
            </div>
            <span className={classes.walletId}>{wallet.address}</span>
          </div>
          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon />
              <span>Total Tokens</span>
            </div>
            <span>{tokenBalance} AGI</span>
          </div>
          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon />
              <span>Escrow Balance</span>
            </div>
            <span>{escrowBalance} AGI</span>
          </div>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab} onChange={this.onTabChange}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent.component}
          <AlertBox type={alert.type} message={alert.message} />
        </div>
        <div className={classes.btnContainer}>
          <StyledButton type="blue" btnText={activeComponent.name} onClick={activeComponent.submitAction} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  startAccBalLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_MM_ACC_DETAILS)),
  startDepositLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.DEPOSIT)),
  startWithdrawLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MetamaskDetails));
