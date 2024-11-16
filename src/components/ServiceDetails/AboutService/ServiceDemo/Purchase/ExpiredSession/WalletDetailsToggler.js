import React from "react";
import MetamaskFlow from "./MetamaskFlow";
import GeneralAccountWallet from "./GeneralAccountWallet";

const WalletDetailsToggler = ({ metamask, metamaskProps, generalWalletProps }) => {
  if (metamask) {
    return <MetamaskFlow {...metamaskProps} />;
  }
  return <GeneralAccountWallet {...generalWalletProps} />;
};

export default WalletDetailsToggler;
