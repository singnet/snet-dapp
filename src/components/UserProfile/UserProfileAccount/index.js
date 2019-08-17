import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

import StyledDropdown from "../../common/StyledDropdown";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { userActions } from "../../../Redux/actionCreators";
import { initSdk } from "../../../utility/sdk";
import { cogsToAgi, txnTypes, agiToCogs } from "../../../utility/PricingStrategy";
import StyledTextField from "../../common/StyledTextField";

const walletDropdownList = Object.entries(walletTypes).map(([key, value]) => ({ value, label: key }));

class UserProfileAccount extends Component {
  state = {
    activeTab: 0,
    tokenBalance: "",
    escrowBalance: "",
    amount: {},
  };

  sdk;

  componentDidMount = () => {
    this.retrieveTokenBalance();
    this.retriveEscrowBalance();
  };

  handleWalletTypeChange = async event => {
    const { value } = event.target;
    const { updateWallet } = this.props;
    // if (value === walletTypes.METAMASK) {
    //   // const address = await; //sdk funtion;
    //   updateWallet({type:value, address});
    //   return
    // }
    updateWallet({ type: value });
  };

  retrieveTokenBalance = async () => {
    if (!this.sdk) {
      this.sdk = await initSdk();
    }
    const escrowBalance = await this.sdk.account.escrowBalance();
    const AGI = cogsToAgi(escrowBalance);
    this.setState({ escrowBalance: AGI });
  };

  retriveEscrowBalance = async () => {
    if (!this.sdk) {
      this.sdk = await initSdk();
    }
    const tokenBalance = await this.sdk.account.balance();
    const AGI = cogsToAgi(tokenBalance);
    this.setState({ tokenBalance: AGI });
  };

  onTabChange = (...args) => {
    this.setState({ activeTab: args[1] });
  };

  handleAmountChange = (event, txnType) => {
    const { value } = event.target;
    this.setState(prevState => ({ amount: { ...prevState.amount, [txnType]: value } }));
  };

  handleDeposit = async event => {
    if (!this.sdk) {
      this.sdk = await initSdk();
    }
    const amountInAGI = this.state.amount[txnTypes.DEPOSIT];
    const amountInCogs = agiToCogs(amountInAGI);
    const response = await this.sdk.account.depositToEscrowAccount(amountInCogs);
    console.log(response);
    this.retrieveTokenBalance();
    this.retriveEscrowBalance();
  };

  handleWithDraw = async event => {
    if (!this.sdk) {
      this.sdk = await initSdk();
    }
    const amountInAGI = this.state.amount[txnTypes.WITHDRAW];
    const amountInCogs = agiToCogs(amountInAGI);
    const response = await this.sdk.account.withdrawFromEscrowAccount(amountInCogs);
    console.log(response);
    this.retrieveTokenBalance();
    this.retriveEscrowBalance();
  };

  render() {
    const { classes, wallet } = this.props;
    const { activeTab, tokenBalance, escrowBalance, amount } = this.state;

    const tabs = [
      {
        name: "Deposit",
        activeIndex: 0,
        submitAction: this.handleDeposit,
        component: (
          <StyledTextField
            label="AGI Token Amount"
            value={amount[txnTypes.DEPOSIT]}
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
            label="AGI Token Amount"
            value={amount[txnTypes.WITHDRAW]}
            onChange={event => this.handleAmountChange(event, txnTypes.WITHDRAW)}
          />
        ),
      },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0];

    return (
      <Grid container spacing={10} className={classes.accountMainContainer}>
        <Grid xs={12} sm={12} md={3} lg={3} className={classes.accountContainer}>
          <h3>Payment / Transfer Method</h3>
          <div className={classes.accountWrapper}>
            <div className={classes.dropDown}>
              <span className={classes.dropDownTitle}>Wallet</span>
              <StyledDropdown
                labelTxt={"Select a Wallet"}
                list={walletDropdownList}
                value={wallet.type}
                onChange={this.handleWalletTypeChange}
              />
            </div>
            <div className={classes.accountDetails}>
              <div>
                <div className={classes.label}>
                  <InfoIcon />
                  <span>Current Network</span>
                </div>
                <span>Ropsten Test Network</span>
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
            </div>
            <StyledButton type="blue" btnText={activeComponent.name} onClick={activeComponent.submitAction} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  updateWallet: args => dispatch(userActions.updateWallet({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileAccount));
