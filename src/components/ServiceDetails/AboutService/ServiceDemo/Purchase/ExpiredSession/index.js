import React, { useEffect } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";
import MetamaskFlow from "./MetamaskFlow";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import StyledDropdown from "../../../../../common/StyledDropdown";
// import WalletDetailsToggler from "./WalletDetailsToggler";

const ExpiredSession = ({ classes, setIsLastPaidCall, handleComplete, handlePurchaseError, isServiceAvailable }) => {
  useEffect(() => {
    setIsLastPaidCall(false);
  }, [setIsLastPaidCall]);

  // const checkForPaymentsInProgress = useCallback(async () => {
  //   const { paymentId: paypalPaymentId, PayerID } = queryString.parse(location.search);
  //   if (orderId && paymentId && paypalPaymentId && PayerID) {
  //     const { data } = await dispatch(paymentActions.fetchOrderDetails(orderId));

  //     const orderType = data.item_details.order_type;
  //     dispatch(paymentActions.updatePaypalInProgress(orderId, orderType, paymentId, paypalPaymentId, PayerID));
  //     return dispatch(userActions.updateWallet({ type: walletTypes.GENERAL }));
  //   }
  // }, [dispatch, orderId, paymentId, location.search]);

  // useEffect(() => {
  //   if (process.env.REACT_APP_SANDBOX) {
  //     return;
  //   }

  //   try {
  //     dispatch(loaderActions.startAppLoader(LoaderContent.INIT_SERVICE_DEMO));
  //     checkForPaymentsInProgress();
  //     dispatch(loaderActions.stopAppLoader());
  //   } catch (error) {
  //     dispatch(loaderActions.stopAppLoader());
  //   }
  // }, [dispatch, checkForPaymentsInProgress]);

  // const handlePayTypeChange = (event) => {
  //   const { value } = event.target;
  //   dispatch(userActions.updateWallet({ type: value }));
  // };

  // const channelPaymentOptions = [
  //   { value: walletTypes.GENERAL, label: "PayPal" },
  //   { value: walletTypes.METAMASK, label: "Metamask" },
  // ];

  return (
    <div className={classes.mainContainer}>
      <Typography variant="body1" className={classes.description}>
        You have run out of free trial. Please select a payment method to continue
      </Typography>
      <div className={classes.paymentChannelAndDetails}>
        <MetamaskFlow
          handleContinue={handleComplete}
          setIsLastPaidCall={setIsLastPaidCall}
          handlePurchaseError={handlePurchaseError}
          isServiceAvailable={isServiceAvailable}
        />
        {/* <div className={classes.paymentChannelDropDownContainer}>
          <div className={classes.paymentChannelDropDown}>
            <Typography className={classes.dropDownTitle} variant="subtitle1">
              Payment Type
            </Typography>
            <AccountBalanceWalletIcon className={classes.walletIcon} />
            <StyledDropdown list={channelPaymentOptions} value={wallet.type} onChange={handlePayTypeChange} />
          </div>
        </div>
        <WalletDetailsToggler
          metamask={wallet.type === walletTypes.METAMASK}
          generalWalletProps={{ handleContinue: handleComplete }}
          metamaskProps={{
            handleContinue: handleComplete,
            setIsLastPaidCall,
            handlePurchaseError,
            isServiceAvailable,
          }}
        /> */}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ExpiredSession);
