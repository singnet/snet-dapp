import React, { useEffect, useState } from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions, serviceDetailsActions } from "../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.css";
import { isUndefined } from "lodash";
import { useParams } from "react-router-dom";

const Purchase = ({ handleComplete, handlePurchaseError, setIsLastPaidCall }) => {
  const dispatch = useDispatch();
  const { orgId, serviceId } = useParams();
  const { freeCalls, groupId } = useSelector((state) => state.serviceDetailsReducer.details.groupInfo);
  const email = useSelector((state) => state.userReducer.email);

  const [isFreecallLoading, setIsFreecallLoading] = useState(false);
  const [freeCallsInfo, setFreeCalls] = useState({ freeCallsTotal: undefined, freeCallsAvailable: undefined });

  useEffect(() => {
    const fetchFreeCallsUsage = async () => {
      dispatch(loaderActions.startAppLoader(LoaderContent.FREE_CALLS_GETTING));
      try {
        setIsFreecallLoading(true);
        const { freeCallsAvailable, freeCallsTotal } = await dispatch(
          serviceDetailsActions.fetchMeteringData({
            orgId,
            serviceId,
            groupId,
            freeCallsTotal: freeCalls,
          })
        );

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
  }, [dispatch, orgId, serviceId, groupId, email, freeCalls]);

  if (isFreecallLoading || isUndefined(freeCallsInfo.freeCallsAvailable)) {
    return (
      <div className="freecall-loader-container">
        <CircularProgress size="40px" />
      </div>
    );
  }

  if (freeCallsInfo.freeCallsAvailable < 1) {
    return (
      <ExpiredSession
        setIsLastPaidCall={setIsLastPaidCall}
        handleComplete={handleComplete}
        handlePurchaseError={handlePurchaseError}
      />
    );
  }
  return (
    <ActiveSession
      freeCallsAvailable={freeCallsInfo.freeCallsAvailable}
      freeCallsTotal={freeCallsInfo.freeCallsTotal}
      handleComplete={handleComplete}
    />
  );
};

export default Purchase;
