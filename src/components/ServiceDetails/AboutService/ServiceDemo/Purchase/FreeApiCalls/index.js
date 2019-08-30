import React from "react";

import AlertBox from "../../../../../common/AlertBox";

const FreeApiCalls = ({ classes, freeCallsRemaining }) => {
  return (
    <AlertBox
      type="info"
      message={`You are free to use ${freeCallsRemaining} more API calls to tryout the service. Post the limit you have to purchase to continue using the service.`}
    />
  );
};

export default FreeApiCalls;
