import React from "react";
import { OnrampWebSDK } from '@onramp.money/onramp-web-sdk';
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../common/StyledButton";
import { useDispatch } from "react-redux";
import { sdkActions } from "../../Redux/actionCreators";

const TokenPurchase = () => {
  const dispatch = useDispatch();

  const isMetamaskAvailable = window?.ethereum?.isMetaMask;

  const showOrump = async () => {    
    if (!isMetamaskAvailable) {
      return;
    }
    try {
      const sdk = await dispatch(sdkActions.getSdk());
      const address = await sdk.account.getAddress();
      
      const onrampInstance = new OnrampWebSDK({
        appId: 1, // replace this with the appID you got during onboarding process
        walletAddress: address, // replace with user's wallet address
        flowType: 1, // 1 -> onramp || 2 -> offramp || 3 -> Merchant checkout
        // fiatType: 3, // 1 -> INR || 2 -> TRY || 3 -> AED || 4 -> MXN || 5-> VND || 6 -> NGN etc. visit Fiat Currencies page to view full list of supported fiat currencies
        paymentMethod: 1, // 1 -> Instant transafer(UPI) || 2 -> Bank transfer(IMPS/FAST)
        coinCode: "FET", // replace with the coin code you want to buy
      });
      onrampInstance?.show();
    } catch(error) {
      console.log("error: ",error);
    }
  }

  return (
    <StyledButton
      variant="contained"
      onClick={showOrump}
      disabled={!isMetamaskAvailable}
      btnText="Buy FET Token"
    />
  );
};

export default withStyles(useStyles)(TokenPurchase);
