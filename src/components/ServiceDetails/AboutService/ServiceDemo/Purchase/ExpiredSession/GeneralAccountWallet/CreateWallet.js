import React from "react";
import PaymentPopup from "./PaymentPopup";
import { orderTypes, paymentTitles } from "./";

const CreateWallet = ({ visible, setVisibility }) => {
  return (
    <PaymentPopup
      visible={visible}
      handleClose={() => setVisibility(false)}
      orderType={orderTypes.CREATE_WALLET}
      title={paymentTitles.CREATE_WALLET}
    />
  );
};

export default CreateWallet;
