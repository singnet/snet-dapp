import React from "react";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../common/StyledButton";

const NextAction = ({ channel, setShowCreateWalletPopup, handleContinue, anyPendingTxn }) => {
  if (isEmpty(channel)) {
    return (
      <StyledButton
        type="blue"
        btnText="create wallet"
        onClick={() => setShowCreateWalletPopup(true)}
        disabled={anyPendingTxn()}
      />
    );
  }
  return <StyledButton type="blue" btnText="continue" disabled={channel.balanceInAgi <= 0} onClick={handleContinue} />;
};

export default NextAction;
