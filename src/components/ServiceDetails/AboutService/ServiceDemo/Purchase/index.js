import React, { useEffect, useState } from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import { groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions, serviceDetailsActions } from "../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.css";
import { isUndefined } from "lodash";

const Purchase = ({ handleComplete, handlePurchaseError, isServiceAvailable, setIsLastPaidCall }) => {
  const dispatch = useDispatch();
  const { org_id, service_id } = useSelector((state) => state.serviceDetailsReducer.details);
  const { free_calls, group_id } = useSelector((state) => groupInfo(state));
  const email = useSelector((state) => state.userReducer.email);

  const [isFreecallLoading, setIsFreecallLoading] = useState(false);
  const [freeCalls, setFreeCalls] = useState({ freeCallsTotal: undefined, freeCallsAvailable: undefined });

  useEffect(() => {
    const fetchFreeCallsUsage = async () => {
      dispatch(loaderActions.startAppLoader(LoaderContent.FREE_CALLS_GETTING));
      try {
        setIsFreecallLoading(true);
        const { freeCallsAvailable, freeCallsTotal } = await dispatch(
          serviceDetailsActions.fetchMeteringData({
            orgId: org_id,
            serviceId: service_id,
            groupId: group_id,
            freeCallsTotal: free_calls,
          })
        );
        console.log(freeCallsTotal, freeCallsAvailable);

        setFreeCalls({
          freeCallsTotal,
          freeCallsAvailable,
        });
      } catch (error) {
        console.error(error);
        setFreeCalls({
          freeCallsTotal: 0,
          freeCallsAvailable: 0,
        });
      } finally {
        setIsFreecallLoading(false);
        dispatch(loaderActions.stopAppLoader());
      }
    };

    fetchFreeCallsUsage();
  }, [dispatch, org_id, service_id, group_id, email, free_calls]);

  if (isFreecallLoading || isUndefined(freeCalls.freeCallsAvailable)) {
    return (
      <div className="freecall-loader-container">
        <CircularProgress size="40px" />
      </div>
    );
  }

  if (freeCalls.freeCallsAvailable < 1) {
    return (
      <ExpiredSession
        setIsLastPaidCall={setIsLastPaidCall}
        handleComplete={handleComplete}
        handlePurchaseError={handlePurchaseError}
        isServiceAvailable={isServiceAvailable}
      />
    );
  }
  return (
    <ActiveSession
      freeCallsAvailable={freeCalls.freeCallsAvailable}
      freeCallsTotal={freeCalls.freeCallsTotal}
      handleComplete={handleComplete}
      isServiceAvailable={isServiceAvailable}
    />
  );
};

export default Purchase;
