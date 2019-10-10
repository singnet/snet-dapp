import React from "react";
import PaymentPopup from "./PaymentPopup";
import { orderTypes } from ".";

const CreateWallet = ({ visible, setVisibility }) => {
  return <PaymentPopup visible={visible} setVisibility={setVisibility} orderType={orderTypes.CREATE_WALLET} />;
};

export default CreateWallet;
