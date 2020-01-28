import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import map from "lodash/map";
import find from "lodash/find";

import StyledDropdown from "../../common/StyledDropdown";
import { useStyles } from "./styles";
import {
  fetchAvailableUserWallets,
  fetchWalletLinkedProviders,
  walletTypes,
} from "../../../Redux/actionCreators/UserActions";
import { userActions } from "../../../Redux/actionCreators";
import MetamaskDetails from "./MetamaskDetails";
import { initSdk } from "../../../utility/sdk";
import ProviderBalance from "./ProviderBalance";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import ProvidersLinkedCount from "./ProvidersLinkedCount";
import { startAppLoader, stopAppLoader } from "../../../Redux/actionCreators/LoaderActions";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { initialWallet } from "../../../Redux/reducers/UserReducer";

const UserProfileAccount = ({ classes, startAppLoader, stopAppLoader, wallet, updateWallet }) => {
  const [alert, setAlert] = useState({});
  const [wallets, updateWallets] = useState([]);
  const [linkedProviders, updateLinkedProviders] = useState([]);
  useEffect(() => {
    const fetchWallets = async () => {
      const availableWallets = await fetchAvailableUserWallets();
      const enhancedWallets = map(availableWallets, ({ address, type }) => {
        return { address, type, value: address, label: `${type} (${address})` };
      });
      updateWallets(enhancedWallets);
    };
    fetchWallets();
  }, []);

  const isSameMetaMaskAddress = address => {
    const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
    if (selectedEthAddress && address) {
      return selectedEthAddress.toLowerCase() === address.toLowerCase();
    }

    return false;
  };

  const handleWalletTypeChange = async event => {
    setAlert({});
    const { value: selectedValue } = event.target;
    const selectedWallet = find(wallets, ({ value }) => selectedValue === value);
    if (!selectedWallet) {
      updateWallet(initialWallet);
      return;
    }

    startAppLoader();
    const organizations = await fetchWalletLinkedProviders(selectedWallet.address);
    stopAppLoader();
    updateLinkedProviders(organizations);
    updateWallet(selectedWallet);

    if (selectedWallet.type === walletTypes.METAMASK) {
      try {
        if (isSameMetaMaskAddress(selectedWallet.address)) {
          const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
          await initSdk(selectedEthAddress);
          return;
        }
        if (!isSameMetaMaskAddress(selectedWallet.address)) {
          setAlert({
            type: alertTypes.ERROR,
            message: `The selected wallet address does not match the address in the current metamask account. Please select the correct account in metamask and try again.`,
          });
        } else {
          setAlert({ type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` });
        }
      } catch (error) {
        setAlert({ type: alertTypes.ERROR, message: `Something went wrong. Please try again` });
      }
    }
  };

  const walletDetails = {
    [walletTypes.METAMASK]: isSameMetaMaskAddress(wallet.address) ? <MetamaskDetails /> : undefined,
  };

  const hasSelectedWallet = wallet.type !== initialWallet.type;
  return (
    <Grid container spacing={24} className={classes.accountMainContainer}>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.accountContainer}>
        <h3>Payment / Transfer Method</h3>
        <div className={classes.accountWrapper}>
          <div className={classes.dropDown}>
            <span className={classes.dropDownTitle}>Wallet</span>
            <StyledDropdown
              labelTxt="Select a Wallet"
              list={wallets}
              value={wallet.value}
              onChange={handleWalletTypeChange}
            />
          </div>
          {walletDetails[wallet.type]}
          <AlertBox type={alert.type} message={alert.message} />
          {hasSelectedWallet && <ProvidersLinkedCount providerCount={linkedProviders.length} />}
        </div>
      </Grid>
      {hasSelectedWallet && (
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.providerBalMaincontainer}>
          <ProviderBalance linkedProviders={linkedProviders} />
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => {
  return {
    updateWallet: args => dispatch(userActions.updateWallet(args)),
    startAppLoader: () => dispatch(startAppLoader(LoaderContent.FETCH_LINKED_PROVIDERS)),
    stopAppLoader: () => dispatch(stopAppLoader),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileAccount));
