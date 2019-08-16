import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

import Deposit from "./Deposit";
import StyledDropdown from "../../common/StyledDropdown";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { userActions } from "../../../Redux/actionCreators";

const walletDropdownList = Object.entries(walletTypes).map(([key, value]) => ({ value, label: key }));

class UserProfileAccount extends Component {
  state = {
    activeTab: 0,
    tokenBalance: "",
    escrowBalance: "",
  };

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
    //retrive from sdk
    //await and return the value
    // this.setState({tokenBalance:value})
  };

  retriveEscrowBalance = async () => {
    //retrive from sdk
    //and return the value
    // this.setState({escrowBalance:value})
  };

  render() {
    const { classes, wallet } = this.props;
    const { activeTab, tokenBalance, escrowBalance } = this.state;

    const tabs = [{ name: "Deposit", activeIndex: 0, component: <Deposit /> }, { name: "Withdraw", activeIndex: 1 }];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;

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
                <span>{tokenBalance}</span>
              </div>
              <div className={classes.bgBox}>
                <div className={classes.label}>
                  <InfoIcon />
                  <span>Escrow Balance</span>
                </div>
                <span>{escrowBalance}</span>
              </div>
            </div>
            <div className={classes.tabsContainer}>
              <AppBar position="static" className={classes.tabsHeader}>
                <Tabs value={activeTab}>
                  {tabs.map(value => (
                    <Tab key={value.name} label={value.name} onClick={() => this.onTabChange(value.activeIndex)} />
                  ))}
                </Tabs>
              </AppBar>
              {activeComponent}
            </div>
            <StyledButton type="blue" disabled btnText="deposit" />
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
