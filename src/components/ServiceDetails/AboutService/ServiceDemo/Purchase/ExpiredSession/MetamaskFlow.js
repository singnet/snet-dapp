import React, { useState } from "react";

import { PaymentInfoCardData } from "../../../../../../utility/constants/PurchaseFlow.js";
import StyledButton from "../../../../../common/StyledButton";
import PaymentInfoCard from "../PaymentInfoCard";
import PurchaseDialog from "../PurchaseDialog";
import ChannelSelectionBox from "../ChannelSelectionBox";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

export const MetamaskFlow = ({ classes, handleContinue }) => {
  const [selectedPayType, setSelectedPayType] = useState(payTypes.CHANNEL_BALANCE);
  const [disabledPayTypes, setDisablePayTypes] = useState([payTypes.SINGLE_CALL]);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [noOfCalls, setNoOfCalls] = useState(1);
  const [totalPrice, setTotalPrice] = useState("0.00000002");

  const handlePayTypeChange = value => {
    if (disabledPayTypes.includes(value)) {
      return;
    }
    setSelectedPayType(value);
  };

  const handlePurchaseDialogClose = () => {
    setShowPurchaseDialog(false);
  };

  const handleNoOfCallsChange = event => {
    const noOfCalls = event.target.value;
    const totalPrice = String(((noOfCalls * 2) / 100000000).toFixed(8));
    setNoOfCalls(noOfCalls);
    setTotalPrice(totalPrice);
  };

  return (
    <div className={classes.PurchaseFlowContainer}>
      <PurchaseDialog show={showPurchaseDialog} onClose={handlePurchaseDialogClose} />
      <p className={classes.PurchaseFlowDescription}>
        Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload a
        a file from your computer, URL, or select image from the gallery. You can specify additional parameters in the
        panel below. “Mouse over” for tool tips.
      </p>
      <div className={classes.paymentInfoCard}>
        {PaymentInfoCardData.map(item => (
          <PaymentInfoCard key={item.title} title={item.title} value={item.value} unit={item.unit} />
        ))}
      </div>
      <div className={classes.ChannelSelectionBoxMainContainer}>
        <div>
          <span className={classes.channelSelectionTitle}>Recommended</span>
          <ChannelSelectionBox
            title="Channel Balance"
            description="You have 0.065627 tokens in you channel. This can be used for running demos across all the services from this vendor."
            checked={selectedPayType === payTypes.CHANNEL_BALANCE}
            value={payTypes.CHANNEL_BALANCE}
            onClick={() => handlePayTypeChange(payTypes.CHANNEL_BALANCE)}
            disabled={disabledPayTypes.includes(payTypes.CHANNEL_BALANCEx)}
          />
        </div>
        <div>
          <span className={classes.channelSelectionTitle}>Best Value</span>
          <ChannelSelectionBox
            title="Multiple Calls"
            description="Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost."
            checked={selectedPayType === payTypes.MULTIPLE_CALLS}
            value={payTypes.MULTIPLE_CALLS}
            onClick={() => handlePayTypeChange(payTypes.MULTIPLE_CALLS)}
            inputProps={{
              noOfCalls,
              onChange: handleNoOfCallsChange,
              totalPrice,
              unit: "AGI",
            }}
            disabled={disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)}
          />
          <ChannelSelectionBox
            title="Single Call"
            description="Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance."
            checked={selectedPayType === payTypes.SINGLE_CALL}
            value={payTypes.SINGLE_CALL}
            onClick={() => handlePayTypeChange(payTypes.SINGLE_CALL)}
            inputProps={{
              noOfCalls: 1,
              totalPrice: 0.000002,
              unit: "AGI",
            }}
            disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
          />
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <StyledButton type="transparent" btnText="Deposit into Escrow" />
        <StyledButton type="blue" btnText="Continue" onClick={handleContinue} />
      </div>
    </div>
  );
};
