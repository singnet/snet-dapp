import React from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";

const Purchase = ({ handleComplete, freeCallsRemaining }) => {
  if (freeCallsRemaining > 0) {
    return <ActiveSession freeCallsRemaining={freeCallsRemaining} handleComplete={handleComplete} />;
  }
  return <ExpiredSession handleComplete={handleComplete} />;
};

export default Purchase;
