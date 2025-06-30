import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";

import thirdPartyCustomUIComponents from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import CompletedActions from "./CompletedActions";
import { createServiceClient, callTypes } from "../../../../utility/sdk";
import ThirdPartyServiceErrorBoundary from "./ThirdPartyServiceErrorBoundary";
import { isEmpty } from "lodash";
import { modelStatus } from "../../../../Redux/reducers/ServiceTrainingReducer";
import { fetchFeedback } from "../../../../Redux/actionCreators/ServiceActions";

const ThirdPartyAIService = ({
  classes,
  isServiceExecutionComplete,
  onStart,
  onComplete,
  onError,
  handleResetAndRun,
}) => {
  const dispatch = useDispatch();
  const { service_id, org_id, groupInfo } = useSelector((state) => state.serviceDetailsReducer.details);
  const freeCallsAvailable = useSelector((state) => state.serviceDetailsReducer.freeCalls.freeCallsAvailable);
  const wallet = useSelector((state) => state.userReducer.wallet);
  const { modelsList, modelId: selectedModelId } = useSelector((state) => state.serviceTrainingReducer);

  const [feedback, setFeedback] = useState({
    comment: "",
    rating: "",
  });
  const [callType, setCallType] = useState();
  const [serviceClient, setServiceClient] = useState();

  useEffect(() => {
    const getServiceClient = async () => {
      const callType = freeCallsAvailable > 0 ? callTypes.FREE : callTypes.REGULAR;
      const newServiceClient = await createServiceClient(
        org_id,
        service_id,
        groupInfo,
        onStart,
        onComplete,
        onError,
        callType,
        wallet
      );
      setServiceClient(newServiceClient);
    };
    getServiceClient();
    setupComponent();
    setCallType(callType);
  }, [org_id, service_id]);

  const setupComponent = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    fetchUserFeedback();
  };

  const fetchUserFeedback = async () => {
    const feedback = await dispatch(fetchFeedback(org_id, service_id));
    if (!feedback.data?.length > 0) {
      return;
    }
    const feedbackData = feedback.data[0];
    setFeedback({ comment: feedbackData.comment[0], rating: feedbackData.rating });
  };

  const getModelsIds = () => {
    if (isEmpty(modelsList)) {
      return [];
    }
    return modelsList
      .filter((model) => model.status === modelStatus.COMPLETED)
      .map((model) => {
        return {
          value: model.modelId,
          label: model.modelName,
        };
      });
  };

  const AIServiceCustomComponent = thirdPartyCustomUIComponents.componentFor(org_id, service_id);
  const modelsIds = getModelsIds();
  if (isEmpty(serviceClient) || !serviceClient) {
    return <div>Loading Service...</div>;
  }

  return (
    <div className={classes.serviceDetailsTab}>
      <Suspense fallback={<div>Loading Service...</div>}>
        <ThirdPartyServiceErrorBoundary>
          <AIServiceCustomComponent
            serviceClient={serviceClient}
            isComplete={isServiceExecutionComplete}
            sliderWidth="550px"
            modelsIds={modelsIds}
            selectedModelId={selectedModelId}
          />
        </ThirdPartyServiceErrorBoundary>
      </Suspense>
      <CompletedActions
        isComplete={isServiceExecutionComplete}
        feedback={feedback}
        orgId={org_id}
        serviceId={service_id}
        refetchFeedback={fetchUserFeedback}
        handleResetAndRun={handleResetAndRun}
        callType={callType}
      />
    </div>
  );
};

export default withStyles(useStyles)(ThirdPartyAIService);
