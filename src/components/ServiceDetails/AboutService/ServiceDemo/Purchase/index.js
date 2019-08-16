import React from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import { walletTypes } from "../../../../../Redux/actionCreators/UserActions";

const Purchase = ({ handleComplete, freeCallsRemaining, freeCallsAllowed, wallet }) => {
  const isMetamaskAvailable = () => {
    return wallet.type === walletTypes.METAMASK;
  };

  if (freeCallsRemaining > 0) {
    return (
      <ActiveSession
        freeCallsRemaining={freeCallsRemaining}
        freeCallsAllowed={freeCallsAllowed}
        handleComplete={handleComplete}
      />
    );
  }
  return <ExpiredSession handleComplete={handleComplete} metamask={isMetamaskAvailable()} />;
};

export default Purchase;
