import React from "react";
import MetamaskFlow from "./MetamaskFlow";
import GeneralAccountWallet from "./GeneralAccountWallet";

const WalletDetailsToggler = ({ metamask, metamaskProps, show }) => {
  if (!show) {
    return null;
  }
  if (metamask) {
    return <MetamaskFlow {...metamaskProps} />;
  }
  return <GeneralAccountWallet />;
};

export default WalletDetailsToggler;
