import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import InfoIcon from "@mui/icons-material/Info";
import { cogsToAgi } from "../../../../utility/PricingStrategy";
import { loaderActions, sdkActions } from "../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import { Networks } from "../../../../config/Networks";

const MetamaskDetails = ({ classes }) => {
  const wallet = useSelector((state) => state.userReducer.wallet);

  const [tokenBalance, setTokenBalance] = useState("");
  const [escrowBalance, setEscrowBalance] = useState("");
  const [alert, setAlert] = useState({});
  const dispatch = useDispatch();

  const currentNetwork = Networks[process.env.REACT_APP_ETH_NETWORK];

  useEffect(() => {
    const getAccountDetails = async () => {
      await retrieveAccountDetails();
    };
    getAccountDetails();
  }, [wallet]);

  const retrieveAccountDetails = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_MM_ACC_DETAILS));
      const sdk = await dispatch(sdkActions.getSdk());
      const escrowBalance = await sdk.account.escrowBalance();
      const tokenBalance = await sdk.account.balance();

      setEscrowBalance(cogsToAgi(escrowBalance));
      setTokenBalance(cogsToAgi(tokenBalance));
    } catch (error) {
      console.log("error: ", error);
      setAlert({ type: alertTypes.ERROR, message: `Unable to fetch account details` });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  return (
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
        <span>{tokenBalance} AGIX</span>
      </div>
      <div className={classes.bgBox}>
        <div className={classes.label}>
          <InfoIcon />
          <span>Escrow Balance</span>
        </div>
        <span>{escrowBalance} AGIX</span>
      </div>
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(MetamaskDetails);
