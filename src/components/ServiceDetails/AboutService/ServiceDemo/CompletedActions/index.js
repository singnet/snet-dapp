import React, { useCallback, useEffect, useState } from "react";

import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";
import UserFeedback from "../UserFeedback";
import { updateChannelBalanceAPI, walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import { createPaymentChannelManagement } from "../../../../../Redux/actionCreators/SDKActions";
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

  const getSignedAmountAndChannelId = useCallback(async () => {
    const paymentChannelManagement = await dispatch(createPaymentChannelManagement(orgId, serviceId));
    await paymentChannelManagement.updateChannelInfo();
    const channel = paymentChannelManagement._channel;
    // eslint-disable-next-line no-undef
    const signedAmount = channel.state.amountDeposited - BigInt(channel.state.availableAmount);

    return { channelId: Number(channel._channelId), signedAmount: Number(signedAmount) };
  }, [dispatch, orgId, serviceId]);

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
          signedAmountAndChannelId = { channelId: Number(channelInfo.id), signedAmount: undefined };
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
  }, [dispatch, getSignedAmountAndChannelId, callType, isComplete, channelInfo.id, walletType, orgId, serviceId]);

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
