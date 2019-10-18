import React from "react";

import PaymentPopup, { orderTypes } from "./PaymentPopup";
import { paymentTitles } from "./";

const TopupWallet = ({ visible, setVisibility }) => {
  return (
    <PaymentPopup
      visible={visible}
      handleClose={() => setVisibility(false)}
      orderType={orderTypes.TOPUP_WALLET}
      title={paymentTitles.TOPUP_WALLET}
    />
  );
};

export default TopupWallet;
