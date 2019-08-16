import React from "react";
import ThirdPartyAIService from "./ThirdPartyAIService";
import Purchase from "./Purchase";

const PurchaseToggler = ({ purchaseCompleted, purchaseProps, thirdPartyProps }) => {
  if (purchaseCompleted) {
    return <ThirdPartyAIService {...thirdPartyProps} />;
  }
  return <Purchase {...purchaseProps} />;
};

export default PurchaseToggler;
