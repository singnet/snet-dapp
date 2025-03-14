import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import { loaderActions } from "../../../../Redux/actionCreators";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import PurchaseToggler from "./PurchaseToggler";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import Routes from "../../../../utility/constants/Routes";
import { progressTabStatus } from "../../../common/ProgressBar";
import { useLocation } from "react-router-dom";

const demoProgressStatus = {
  purchasing: 0,
  executingAIservice: 1,
  displayingResponse: 2,
};

const ServiceDemo = ({ classes, service }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [progressText, setProgressText] = useState([
    { label: "Purchase" },
    { label: "Configure" },
    { label: "Results", status: undefined },
  ]);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isServiceExecutionComplete, setIsServiceExecutionComplete] = useState(false);
  const [alert, setAlert] = useState({});
  const [isLastPaidCall, setIsLastPaidCall] = useState(false);

  useEffect(() => {
    if (location.hash === Routes.hash.SERVICE_DEMO) {
      window.scroll({
        top: 520,
        behavior: "smooth",
      });
    }
  }, [location.hash]);

  const computeActiveSection = useCallback(() => {
    const { purchasing, executingAIservice, displayingResponse } = demoProgressStatus;

    return purchaseCompleted ? (isServiceExecutionComplete ? displayingResponse : executingAIservice) : purchasing;
  }, [purchaseCompleted, isServiceExecutionComplete]);

  const serviceRequestStartHandler = () => {
    setAlert({});
    dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION(service.display_name)));
  };

  const serviceRequestCompleteHandler = () => {
    setIsServiceExecutionComplete(true);
    setProgressText(
      progressText.map((item) => {
        if (item.label === "Results") {
          item.status = progressTabStatus.SUCCESS;
        }
        return item;
      })
    );
    dispatch(loaderActions.stopAppLoader());
  };

  const handleResetAndRun = () => {
    setPurchaseCompleted(false);
    setIsServiceExecutionComplete(false);
    setAlert({});
    setProgressText(progressText.map((item) => ({ label: item.label })));
  };

  const serviceRequestErrorHandler = (error) => {
    const alert = { type: alertTypes.ERROR };
    if (error.response && error.response.data && error.response.data.error) {
      alert.message = error.response.data.error;
    } else {
      alert.message = error.message || error;
    }
    setIsServiceExecutionComplete(false);
    setAlert(alert);
    dispatch(loaderActions.stopAppLoader());
  };

  const handlePurchaseComplete = () => {
    setPurchaseCompleted(true);
  };

  const handlePurchaseError = (error) => {
    setPurchaseCompleted(false);
    setAlert({ type: alertTypes.ERROR, message: "Purchase could not be completed. Please try again" });
    dispatch(loaderActions.stopAppLoader());
  };

  const computedActiveSection = computeActiveSection();

  return (
    <div className={classes.demoExampleContainer}>
      <ProgressBar activeSection={computedActiveSection} progressText={progressText} />
      {isLastPaidCall && (
        <AlertBox
          className={classes.lastPaidCallInfo}
          type={alertTypes.INFO}
          message="This is the last paid service call!"
        />
      )}
      <PurchaseToggler
        purchaseCompleted={purchaseCompleted}
        purchaseProps={{
          handleComplete: handlePurchaseComplete,
          setIsLastPaidCall,
          handlePurchaseError,
          isServiceAvailable: Boolean(service.is_available),
        }}
        thirdPartyProps={{
          service_id: service.service_id,
          org_id: service.org_id,
          isServiceExecutionComplete,
          handleResetAndRun,
          serviceRequestStartHandler,
          serviceRequestCompleteHandler,
          serviceRequestErrorHandler,
        }}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(ServiceDemo);
