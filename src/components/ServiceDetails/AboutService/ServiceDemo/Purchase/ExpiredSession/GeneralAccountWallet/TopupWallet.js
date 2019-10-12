import React from "react";

import PaymentPopup from "./PaymentPopup";
import { orderTypes, paymentTitles } from "./";

const TopupWallet = ({ visible, setVisibility }) => {
  return (
    <PaymentPopup
      visible={visible}
      setVisibility={setVisibility}
      orderType={orderTypes.TOPUP_WALLET}
      title={paymentTitles.TOPUP_WALLET}
    />
  );
};

export default TopupWallet;
