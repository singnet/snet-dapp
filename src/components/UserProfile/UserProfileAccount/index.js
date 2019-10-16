import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import map from "lodash/map";
import find from "lodash/find";
import lowerCase from "lodash/lowerCase";

import StyledDropdown from "../../common/StyledDropdown";
import { useStyles } from "./styles";
import {
  fetchAvailableUserWallets,
  fetchWalletLinkedProviders,
  walletTypes,
} from "../../../Redux/actionCreators/UserActions";
import MetamaskDetails from "./MetamaskDetails";
import { initSdk } from "../../../utility/sdk";
import ProviderBalance from "./ProviderBalance";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import ProvidersLinkedCount from "./ProvidersLinkedCount";
import { startAppLoader, stopAppLoader } from "../../../Redux/actionCreators/LoaderActions";
import { LoaderContent } from "../../../utility/constants/LoaderContent";

const UserProfileAccount = ({ classes, dispatch }) => {
  const [alert, setAlert] = useState({});
  const initialWallet = { value: "default", type: "default" };
  const [wallet, updateWallet] = useState(initialWallet);
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

  const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
  const isSameMetaMaskAddress = lowerCase(selectedEthAddress) === lowerCase(wallet.address);
  const handleWalletTypeChange = async event => {
    setAlert({});
    const { value: selectedValue } = event.target;
    const selectedWallet = find(wallets, ({ value }) => selectedValue === value);
    if (!selectedWallet) {
      updateWallet(initialWallet);
      return;
    }

    dispatch(startAppLoader(LoaderContent.FETCH_LINKED_PROVIDERS));
    const organizations = await fetchWalletLinkedProviders(selectedWallet.address);
    dispatch(stopAppLoader);
    updateLinkedProviders(organizations);
    updateWallet(selectedWallet);

    if (selectedWallet.type === walletTypes.METAMASK) {
      try {
        if (isSameMetaMaskAddress) {
          await initSdk(selectedEthAddress);
          return;
        }
        setAlert({ type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` });
      } catch (error) {
        setAlert({ type: alertTypes.ERROR, message: `Something went wrong. Please try again` });
      }
    }
  };

  const walletDetails = {
    [walletTypes.METAMASK]: isSameMetaMaskAddress ? <MetamaskDetails wallet={wallet} /> : undefined,
  };

  const hasSelectedWallet = wallet.type !== initialWallet.type;
  return (
    <Grid container spacing={10} className={classes.accountMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountContainer}>
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
        <Grid xs={12} sm={12} md={8} lg={8} className={classes.providerBalMaincontainer}>
          <ProviderBalance linkedProviders={linkedProviders} />
        </Grid>
      )}
    </Grid>
  );
};

export default connect()(withStyles(useStyles)(UserProfileAccount));
