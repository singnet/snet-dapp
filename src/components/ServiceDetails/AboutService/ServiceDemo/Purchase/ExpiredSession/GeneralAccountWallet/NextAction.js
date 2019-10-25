import React from "react";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../common/StyledButton";

const NextAction = props => {
  const {
    channel,
    setShowCreateWalletPopup,
    setShowLinkProvider,
    handleContinue,
    anyPendingTxn,
    anyGeneralWallet,
  } = props;

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
    <StyledButton
      type="blue"
      btnText="continue"
      disabled={channel.balanceInAgi <= 0 || anyPendingTxn}
      onClick={handleContinue}
    />
  );
};

export default NextAction;
