import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

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

  const retrieveAccountDetails = useCallback(async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_MM_ACC_DETAILS));
      const sdk = await dispatch(sdkActions.getSdk());
      const escrowBalance = await sdk.account.escrowBalance();
      const tokenBalance = await sdk.account.balance();

      setEscrowBalance(cogsToAgi(escrowBalance));
      setTokenBalance(cogsToAgi(tokenBalance));
    } catch (error) {
      console.error("error: ", error);
      setAlert({ type: alertTypes.ERROR, message: `Unable to fetch account details` });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  }, [dispatch]);

  useEffect(() => {
    const getAccountDetails = async () => {
      await retrieveAccountDetails();
    };
    getAccountDetails();
  }, [wallet, retrieveAccountDetails]);

  return (
    <div className={classes.accountDetails}>
      <div>
        <div className={classes.label}>
          <span>Current Network</span>
        </div>
        <span>{currentNetwork} Network</span>
      </div>
      <div>
        <div className={classes.label}>
          <span>Wallet Address</span>
        </div>
        <span className={classes.walletId}>{wallet.address}</span>
      </div>
      <div className={classes.bgBox}>
        <div className={classes.label}>
          <span>Total Tokens</span>
        </div>
        <span>
          {tokenBalance} {process.env.REACT_APP_TOKEN_NAME}
        </span>
      </div>
      <div className={classes.bgBox}>
        <div className={classes.label}>
          <span>Escrow Balance</span>
        </div>
        <span>
          {escrowBalance} {process.env.REACT_APP_TOKEN_NAME}
        </span>
      </div>
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(MetamaskDetails);
