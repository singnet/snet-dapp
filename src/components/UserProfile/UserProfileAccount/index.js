import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import isEmpty from "lodash/isEmpty";

import StyledDropdown from "../../common/StyledDropdown";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import MetamaskDetails from "./MetamaskDetails";
import { initSdk } from "../../../utility/sdk";
import ProviderBalance from "./ProviderBalance";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import ProvidersLinkedCount from "./ProvidersLinkedCount";

const walletDropdownList = Object.entries(walletTypes).map(([key, value]) => ({ value, label: key }));

const UserProfileAccount = ({ classes }) => {
  const [alert, setAlert] = useState({});
  const [wallet, updateWallet] = useState({ type: "default" });

  const handleWalletTypeChange = async event => {
    setAlert({});
    const { value } = event.target;
    if (value === walletTypes.METAMASK) {
      try {
        const selectedEthAddress = window.ethereum && window.ethereum.selectedAddress;
        const sdk = await initSdk(selectedEthAddress);
        const address = sdk.account.address;
        if (!isEmpty(address)) {
          updateWallet({ type: value, address });
          return;
        }
        setAlert({ type: alertTypes.ERROR, message: `Unable to fetch Metamask address. Please try again` });
      } catch (error) {
        setAlert({ type: alertTypes.ERROR, message: `Something went wrong. Please try again` });
      }
    }
    if (value === walletTypes.GENERAL) {
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
          {walletDetails[wallet.type]}
          <AlertBox type={alert.type} message={alert.message} />
          <ProvidersLinkedCount />
        </div>
      </Grid>
      <Grid xs={12} sm={12} md={8} lg={8} className={classes.providerBalMaincontainer}>
        <ProviderBalance />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileAccount);
