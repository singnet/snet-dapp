import React from "react";
import PaymentPopup, { orderTypes } from "./PaymentPopup";
import { paymentTitles } from "./";

const CreateWallet = ({ visible, setVisibility }) => {
  return (
    <PaymentPopup
      visible={visible}
      handleOpen={() => setVisibility(true)}
      handleClose={() => setVisibility(false)}
      orderType={orderTypes.CREATE_WALLET}
      title={paymentTitles.CREATE_WALLET}
    />
  );
};

export default CreateWallet;
