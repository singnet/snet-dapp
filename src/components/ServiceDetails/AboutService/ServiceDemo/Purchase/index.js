import React from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";

const Purchase = ({
  handleComplete,
  freeCallsRemaining,
  freeCallsAllowed,
  isFreecallLoading,
  wallet,
  groupInfo,
  handlePurchaseError,
  isServiceAvailable,
  setIsLastPaidCall,
}) => {
  if (freeCallsRemaining < 1) {
    return (
      <ExpiredSession
        setIsLastPaidCall={setIsLastPaidCall}
        handleComplete={handleComplete}
        wallet={wallet}
        groupInfo={groupInfo}
        handlePurchaseError={handlePurchaseError}
        isServiceAvailable={isServiceAvailable}
      />
    );
  }
  return (
    <ActiveSession
      isFreecallLoading={isFreecallLoading}
      freeCallsRemaining={freeCallsRemaining}
      freeCallsAllowed={freeCallsAllowed}
      handleComplete={handleComplete}
      isServiceAvailable={isServiceAvailable}
    />
  );
};

export default Purchase;
