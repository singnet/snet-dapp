import React from "react";

import PaymentPopup from "./PaymentPopup";
import { orderTypes } from "./";

const TopupWallet = ({ visible, setVisibility }) => {
  return <PaymentPopup visible={visible} setVisibility={setVisibility} orderType={orderTypes.TOPUP_WALLET} />;
};

export default TopupWallet;
