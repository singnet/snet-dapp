import React from "react";
import PaymentPopup from "./PaymentPopup";
import { orderTypes } from ".";

const CreateWallet = ({ visible, setVisibility }) => {
  return <PaymentPopup visible={visible} topup setVisibility={setVisibility} orderType={orderTypes.TOPUP_WALLET} />;
};

export default CreateWallet;
