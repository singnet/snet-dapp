import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
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
import { isEmpty } from "lodash";
import { CircularProgress } from "@mui/material";

const alertSelectCurrentWallet = {
  type: alertTypes.ERROR,
  message: `The selected wallet address does not match the address in the current metamask account. Please select the correct account in metamask and try again.`,
};

const UserProfileAccount = ({ classes }) => {
  const [alert, setAlert] = useState({});
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [linkedProviders, setLinkedProviders] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const dispatch = useDispatch();

  const parseWallet = (address, type) => {
    return { value: address, label: `${type} (${address})`, address, type };
  };

  const getWallets = async (currentAddress) => {
    const availableWallets = await dispatch(fetchAvailableUserWallets());
    let currentWallet = availableWallets.find(({ address }) => address === currentAddress);
    const enhancedWallets = availableWallets.map(({ address, type }) => parseWallet(address, type));
    if (!currentWallet) {
      currentWallet = parseWallet(currentAddress, walletTypes.METAMASK);
      enhancedWallets.push(currentWallet);
    }
    setSelectedWallet(parseWallet(currentWallet.address, currentWallet.type));
    dispatch(userActions.updateWallet(currentWallet));
    return enhancedWallets;
  };

  useEffect(() => {
    const fetchWallets = async () => {
      if (!window?.ethereum) {
        setAlert({ type: alertTypes.ERROR, message: `Can't find Metamask` });
      }
      try {
        const sdk = await dispatch(sdkActions.getSdk());
        const currentAddress = await sdk.account.getAddress();
        const wallets = await getWallets(currentAddress);
        setCurrentAddress(currentAddress);
        setWallets(wallets);
      } catch (error) {
        setCurrentAddress("");
        setWallets([]);
      }
    };
    fetchWallets();
  }, [dispatch]);

  useEffect(() => {
    const getProviders = async () => {
      if (!selectedWallet?.address) {
        return;
      }

      dispatch(startAppLoader(LoaderContent.FETCH_LINKED_PROVIDERS));
      const organizations = await fetchWalletLinkedProviders(selectedWallet.address);
      setLinkedProviders(organizations);
      dispatch(stopAppLoader());
    };

    getProviders();
  }, [selectedWallet]);

  const isSameMetaMaskAddress = (address) => {
    if (currentAddress && address) {
      return currentAddress.toLowerCase() === address.toLowerCase();
    }
    return false;
  };

  const handleWalletTypeChange = async (event) => {
    setAlert({});

    const { value: selectedValue } = event.target;
    const selectedWallet = wallets.find(({ value }) => selectedValue === value);
    setSelectedWallet(selectedWallet);
  };

  const walletDetails = {
    [walletTypes.METAMASK]: isSameMetaMaskAddress(selectedWallet.address) ? (
      <MetamaskDetails />
    ) : (
      <AlertBox {...alertSelectCurrentWallet} />
    ),
  };

  if (isEmpty(selectedWallet)) {
    return (
      <div className={classes.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container className={classes.accountMainContainer}>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.accountContainer}>
        <h3>Payment / Transfer Method</h3>
        <div className={classes.accountWrapper}>
          <div className={classes.dropDown}>
            <span className={classes.dropDownTitle}>Wallet</span>
            <StyledDropdown list={wallets} value={selectedWallet.value} onChange={handleWalletTypeChange} />
          </div>
          {walletDetails[selectedWallet.type]}
          <AlertBox type={alert.type} message={alert.message} />
          {selectedWallet.address && <ProvidersLinkedCount providerCount={linkedProviders.length} />}
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
