import React, { useEffect, useState } from "react";

import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";
import UserFeedback from "../UserFeedback";
import PaymentChannelManagement from "../../../../../utility/PaymentChannelManagement";
import { updateChannelBalanceAPI, walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import { getSdk } from "../../../../../Redux/actionCreators/SDKActions";
import { channelInfo as getChannelInfo } from "../../../../../Redux/reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { callTypes } from "../../../../../utility/sdk";

const CompletedActions = ({ isComplete, callType, feedback, orgId, serviceId, refetchFeedback, handleResetAndRun }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const walletType = useSelector((state) => state.userReducer.wallet.type);
  const walletList = useSelector((state) => state.userReducer.walletList);
  const channelInfo = getChannelInfo(walletList);

  const [openUserFeedback, setUserFeedback] = useState(false);

  const handleOpenUserFeedback = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    setUserFeedback(true);
  };

  const handleCloseUserFeedback = () => {
    setUserFeedback(false);
  };

  const getSignedAmountAndChannelId = async () => {
    const sdk = await dispatch(getSdk());
    const serviceClient = await sdk.createServiceClient(orgId, serviceId);
    const paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
    await paymentChannelManagement.updateChannelInfo();
    const channel = paymentChannelManagement._channel;
    const signedAmount = Number(channel._state.amountDeposited) - Number(channel._state.availableAmount);

    return { channelId: channel._channelId, signedAmount };
  };

  useEffect(() => {
    if (callType !== callTypes.REGULAR || !isComplete) {
      return;
    }
    const updateBalance = async () => {
      try {
        let signedAmountAndChannelId = {};
        if (walletType === walletTypes.METAMASK) {
          signedAmountAndChannelId = await getSignedAmountAndChannelId();
        } else {
          signedAmountAndChannelId = { channelId: channelInfo.id, signedAmount: undefined };
        }

        await dispatch(
          updateChannelBalanceAPI({
            orgId,
            serviceId,
            ...signedAmountAndChannelId,
          })
        );
      } catch (err) {
        console.error("update balance error: ", err);
      }
    };

    updateBalance();
  }, [callType, isComplete]);

  if (!isComplete) {
    return null;
  }

  return (
    <div className={classes.buttonsContainer}>
      <UserFeedback
        open={openUserFeedback}
        handleClose={handleCloseUserFeedback}
        feedback={feedback}
        orgId={orgId}
        serviceId={serviceId}
        refetchFeedback={refetchFeedback}
      />
      <StyledButton type="transparent" btnText="Rate the service" onClick={handleOpenUserFeedback} />
      <StyledButton type="blue" btnText="Reset and Run" onClick={handleResetAndRun} />
    </div>
  );
};

export default CompletedActions;
