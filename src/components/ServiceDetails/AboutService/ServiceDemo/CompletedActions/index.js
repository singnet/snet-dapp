import React, { useEffect, useState } from "react";

import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";
import UserFeedback from "../UserFeedback";
import PaymentChannelManagement from "../../../../../utility/PaymentChannelManagement";
import { updateChannelBalanceAPI } from "../../../../../Redux/actionCreators/UserActions";
import { getSdk } from "../../../../../Redux/actionCreators/SDKActions";
import { useDispatch, useSelector } from "react-redux";
import { groupInfo as getGroupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import { callTypes } from "../../../../../utility/sdk";

const CompletedActions = ({ isComplete, callType, feedback, orgId, serviceId, refetchFeedback, handleResetAndRun }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const groupInfo = useSelector((state) => getGroupInfo(state));
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

  useEffect(() => {
    if (callType !== callTypes.REGULAR || !isComplete) {
      return;
    }
    const updateBalance = async () => {
      try {
        const sdk = await dispatch(getSdk());
        const serviceClient = await sdk.createServiceClient(orgId, serviceId);
        const paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
        await paymentChannelManagement.updateChannelInfo();
        const channel = paymentChannelManagement._channel;
        await dispatch(
          updateChannelBalanceAPI(
            orgId,
            serviceId,
            groupInfo.group_id,
            Number(channel._state.amountDeposited) - Number(channel._state.availableAmount),
            Number(channel._state.amountDeposited),
            Number(channel._channelId),
            Number(channel._state.nonce)
          )
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
