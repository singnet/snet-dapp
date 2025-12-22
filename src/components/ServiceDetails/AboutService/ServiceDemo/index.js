import React, { memo, useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { loaderActions } from "../../../../Redux/actionCreators";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import Routes from "../../../../utility/constants/Routes";
import { progressTabStatus } from "../../../common/ProgressBar";
import { useLocation } from "react-router-dom";
import Purchase from "./Purchase";
import ThirdPartyAIService from "./ThirdPartyAIService";
import { configuration } from "./mock/configuration";

const demoProgressStatus = {
  purchasing: 0,
  executingAIservice: 1,
  displayingResponse: 2,
};

const progressList = [{ label: "Purchase" }, { label: "Configure" }, { label: "Results", status: undefined }];

const ServiceDemo = ({ classes }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const serviceName = useSelector((state) => state.serviceDetailsReducer.details.displayName);

  const [progressText, setProgressText] = useState(progressList);
  const [purchaseCompleted, setPurchaseCompleted] = useState(configuration.debug.skipPurchase ? true : false);
  const [isServiceExecutionComplete, setIsServiceExecutionComplete] = useState(false);
  const [alert, setAlert] = useState({});
  const [isLastPaidCall, setIsLastPaidCall] = useState(false);

  const MemoizedProgressBar = memo(ProgressBar);
  const MemoizedAlertBox = memo(AlertBox);

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
    dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION(serviceName)));
  };

  const updateProgressText = useCallback((status) => {
    setProgressText((prev) => prev.map((item) => (item.label === "Results" ? { ...item, status } : item)));
  }, []);

  const serviceRequestCompleteHandler = () => {
    setIsServiceExecutionComplete(true);
    updateProgressText(progressTabStatus.SUCCESS);
    dispatch(loaderActions.stopAppLoader());
  };

  const handleResetAndRun = () => {
    setPurchaseCompleted(false);
    setIsServiceExecutionComplete(false);
    setAlert({});
    setProgressText(progressList);
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
    console.error(error);
    setPurchaseCompleted(false);
    setAlert({ type: alertTypes.ERROR, message: "Purchase could not be completed. Please try again" });
    dispatch(loaderActions.stopAppLoader());
  };

  const computedActiveSection = computeActiveSection();

  return (
    <div className={classes.demoExampleContainer}>
      <MemoizedProgressBar activeSection={computedActiveSection} progressText={progressText} />
      {isLastPaidCall && (
        <MemoizedAlertBox
          className={classes.lastPaidCallInfo}
          type={alertTypes.INFO}
          message="This is the last paid service call!"
        />
      )}
      {purchaseCompleted ? (
        <ThirdPartyAIService
          isServiceExecutionComplete={isServiceExecutionComplete}
          onStart={serviceRequestStartHandler}
          onComplete={serviceRequestCompleteHandler}
          onError={serviceRequestErrorHandler}
          handleResetAndRun={handleResetAndRun}
        />
      ) : (
        <Purchase
          handleComplete={handlePurchaseComplete}
          setIsLastPaidCall={setIsLastPaidCall}
          handlePurchaseError={handlePurchaseError}
        />
      )}
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

ServiceDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(ServiceDemo);
