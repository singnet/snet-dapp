import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import map from "lodash/map";
import find from "lodash/find";
import StyledDropdown from "../../common/StyledDropdown";
import { useStyles } from "./styles";
import {
  fetchAvailableUserWallets,
  fetchWalletLinkedProviders,
  walletTypes,
} from "../../../Redux/actionCreators/UserActions";
import { userActions, sdkActions } from "../../../Redux/actionCreators";
import MetamaskDetails from "./MetamaskDetails";
import ProviderBalance from "./ProviderBalance";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import ProvidersLinkedCount from "./ProvidersLinkedCount";
import { startAppLoader, stopAppLoader } from "../../../Redux/actionCreators/LoaderActions";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { initialWallet } from "../../../Redux/reducers/UserReducer";

const UserProfileAccount = ({ classes }) => {
  const wallet = useSelector((state) => state.userReducer.wallet);

  const [alert, setAlert] = useState({});
  const [wallets, setWallets] = useState([]);
  const [linkedProviders, updateLinkedProviders] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const availableWallets = dispatch(fetchAvailableUserWallets());
    const enhancedWallets = map(availableWallets, ({ address, type }) => {
      return { address, type, value: address, label: `${type} (${address})` };
    });
    setWallets(enhancedWallets);
    const sdk = dispatch(sdkActions.getSdk());
    setCurrentAddress(sdk.account.getAddress());
  }, [dispatch]);

  const isSameMetaMaskAddress = (address) => {
    if (currentAddress && address) {
      return currentAddress.toLowerCase() === address.toLowerCase();
    }
    return false;
  };

  const handleWalletTypeChange = async (event) => {
    setAlert({});
    const { value: selectedValue } = event.target;
    const selectedWallet = find(wallets, ({ value }) => selectedValue === value);
    if (!selectedWallet) {
      dispatch(userActions.updateWallet(initialWallet));
      return;
    }

    dispatch(startAppLoader(LoaderContent.FETCH_LINKED_PROVIDERS));
    const organizations = await fetchWalletLinkedProviders(selectedWallet.address);
    dispatch(stopAppLoader());
    updateLinkedProviders(organizations);
    dispatch(userActions.updateWallet(selectedWallet));

    if (selectedWallet.type === walletTypes.METAMASK) {
      try {
        if (isSameMetaMaskAddress(selectedWallet.address)) {
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
        console.log(error);
        setAlert({ type: alertTypes.ERROR, message: `Something went wrong. Please try again` });
      }
    }
  };

  const walletDetails = {
    [walletTypes.METAMASK]: isSameMetaMaskAddress(wallet.address) ? <MetamaskDetails /> : undefined,
  };

  return (
    <Grid container className={classes.accountMainContainer}>
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
          {wallet.address && <ProvidersLinkedCount providerCount={linkedProviders.length} />}
        </div>
      </Grid>
      {linkedProviders.length > 0 && (
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.providerBalMaincontainer}>
          <ProviderBalance linkedProviders={linkedProviders} />
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileAccount);
