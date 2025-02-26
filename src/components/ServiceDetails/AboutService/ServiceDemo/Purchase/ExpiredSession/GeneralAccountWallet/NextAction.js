import React, { Fragment } from "react";
import isEmpty from "lodash/isEmpty";
import { anyPendingTxn as getAnyPendingTxn } from "../../../../../../../Redux/reducers/PaymentReducer";
import { anyGeneralWallet as getAnyGeneralWallet } from "../../../../../../../Redux/reducers/UserReducer";
import StyledButton from "../../../../../../common/StyledButton";
import { useSelector } from "react-redux";

const NextAction = ({ channel, setShowCreateWalletPopup, setShowLinkProvider, setShowTopUpWallet, handleContinue }) => {
  const anyGeneralWallet = useSelector((state) => getAnyGeneralWallet(state));
  const anyPendingTxn = useSelector((state) => getAnyPendingTxn(state));

  if (!anyGeneralWallet) {
    return (
      <StyledButton
        type="blue"
        btnText="create wallet"
        onClick={() => setShowCreateWalletPopup(true)}
        disabled={anyPendingTxn}
      />
    );
  }
  if (isEmpty(channel)) {
    return (
      <StyledButton
        type="blue"
        btnText="link provider"
        onClick={() => setShowLinkProvider(true)}
        disabled={anyPendingTxn}
      />
    );
  }
  return (
    <Fragment>
      <StyledButton type="transparentBlueBorder" btnText="top up wallet" onClick={setShowTopUpWallet} />
      <StyledButton
        type="blue"
        btnText="Run service"
        disabled={channel.balanceInAgi <= 0 || anyPendingTxn}
        onClick={handleContinue}
      />
    </Fragment>
  );
};

export default NextAction;
