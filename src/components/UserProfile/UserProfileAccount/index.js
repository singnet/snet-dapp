import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import StyledDropdown from "../../common/StyledDropdown";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { userActions } from "../../../Redux/actionCreators";
import MetamaskDetails from "./MetamaskDetails";
import { initSdk } from "../../../utility/sdk";
import AlertBox, { alertTypes } from "../../common/AlertBox";

const walletDropdownList = Object.entries(walletTypes).map(([key, value]) => ({ value, label: key }));

const UserProfileAccount = ({ classes, wallet, updateWallet, stopWalletDetailsPolling }) => {
  const [alert, setAlert] = useState({});

  const handleWalletTypeChange = async event => {
    setAlert({});
    const { value } = event.target;
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
        setAlert({ type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` });
      } catch (error) {
        setAlert({ type: alertTypes.ERROR, message: `Something went wrong. Please try again` });
      }
    }
    if (value === walletTypes.GENERAL) {
      stopWalletDetailsPolling();
      updateWallet({ type: value });
      return;
    }

    updateWallet({ type: value });
  };

  const walletDetails = {
    [walletTypes.METAMASK]: <MetamaskDetails />,
  };

  return (
    <Grid container spacing={10} className={classes.accountMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountContainer}>
        <h3>Payment / Transfer Method</h3>
        <div className={classes.accountWrapper}>
          <div className={classes.dropDown}>
            <span className={classes.dropDownTitle}>Wallet</span>
            <StyledDropdown
              labelTxt="Select a Wallet"
              list={walletDropdownList}
              value={wallet.type}
              onChange={handleWalletTypeChange}
            />
          </div>
          {walletDetails[wallet.type] || (
            <AlertBox type={alertTypes.INFO} message="Please select a wallet to proceed" />
          )}
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  updateWallet: args => dispatch(userActions.updateWallet(args)),
  stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileAccount));
