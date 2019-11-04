import React from "react";

import PaymentPopup from "./PaymentPopup";
import { paymentTitles } from "./";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

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
