import React, { useEffect, useState } from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import { currentServiceDetails, groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions, serviceDetailsActions } from "../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.css";

const Purchase = ({ handleComplete, wallet, handlePurchaseError, isServiceAvailable, setIsLastPaidCall }) => {
  const dispatch = useDispatch();
  const { org_id, service_id } = useSelector((state) => currentServiceDetails(state));
  const group_id = useSelector((state) => groupInfo(state).group_id);
  const email = useSelector((state) => state.userReducer.email);

  const [isFreecallLoading, setIsFreecallLoading] = useState(false);
  const [freeCalls, setFreeCalls] = useState({ freeCallsAllowed: 0, freeCallsRemaining: 0 });

  useEffect(() => {
    const fetchFreeCallsUsage = async () => {
      dispatch(loaderActions.startAppLoader(LoaderContent.FREE_CALLS_GETTING));
      try {
        setIsFreecallLoading(true);
        const { free_calls_allowed, total_calls_made } = await dispatch(
          serviceDetailsActions.fetchMeteringData({
            orgId: org_id,
            serviceId: service_id,
            groupId: group_id,
            username: email,
          })
        );
        setFreeCalls({
          freeCallsAllowed: free_calls_allowed,
          freeCallsRemaining: free_calls_allowed - total_calls_made,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsFreecallLoading(false);
        dispatch(loaderActions.stopAppLoader());
      }
    };

    fetchFreeCallsUsage();
  }, [dispatch, org_id, service_id, group_id, email]);

  if (isFreecallLoading) {
    return (
      <div className="freecall-loader-container">
        <CircularProgress size="40px" />
      </div>
    );
  }

  if (freeCalls.freeCallsRemaining < 1) {
    return (
      <ExpiredSession
        setIsLastPaidCall={setIsLastPaidCall}
        handleComplete={handleComplete}
        wallet={wallet}
        handlePurchaseError={handlePurchaseError}
        isServiceAvailable={isServiceAvailable}
      />
    );
  }
  return (
    <ActiveSession
      freeCallsRemaining={freeCalls.freeCallsRemaining}
      freeCallsAllowed={freeCalls.freeCallsAllowed}
      handleComplete={handleComplete}
      isServiceAvailable={isServiceAvailable}
    />
  );
};

export default Purchase;
