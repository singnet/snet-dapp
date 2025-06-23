import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";

import thirdPartyCustomUIComponents from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions, loaderActions } from "../../../../Redux/actionCreators";
import CompletedActions from "./CompletedActions";
import { createServiceClient, callTypes } from "../../../../utility/sdk";
import ThirdPartyServiceErrorBoundary from "./ThirdPartyServiceErrorBoundary";
import { channelInfo } from "../../../../Redux/reducers/UserReducer";
import { isEmpty } from "lodash";
import { modelStatus } from "../../../../Redux/reducers/ServiceTrainingReducer";
import { groupInfo } from "../../../../Redux/reducers/ServiceDetailsReducer";

class ThirdPartyAIService extends Component {
  state = {
    feedback: {
      comment: "",
      rating: "",
    },
    loading: true,
  };

  componentDidMount = async () => {
    const { org_id, service_id, freeCallsAvailable, groupInfo, wallet } = this.props;
    const callType = freeCallsAvailable > 0 ? callTypes.FREE : callTypes.REGULAR;
    this.serviceClient = await createServiceClient(
      org_id,
      service_id,
      groupInfo,
      this.props.serviceRequestStartHandler,
      this.props.serviceRequestCompleteHandler,
      this.props.serviceRequestErrorHandler,
      callType,
      wallet
    );
    this.setupComponent();
    this.setState({ loading: false, callType });
  };

  setupComponent = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    this.fetchUserFeedback();
  };

  fetchUserFeedback = async () => {
    const { org_id, service_id } = this.props;
    const feedback = await this.props.fetchFeedback(org_id, service_id);
    if (!feedback.data?.length > 0) {
      return;
    }
    this.setState({ feedback: { comment: feedback.data[0].comment[0], rating: feedback.data[0].rating } });
  };

  getModelsIds() {
    const modelsList = this.props.modelsList;

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
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    const { selectedModelId, org_id, service_id, classes, stopLoader, isServiceExecutionComplete, handleResetAndRun } =
      this.props;
    const { feedback, callType } = this.state;
    const { serviceClient } = this;
    const AIServiceCustomComponent = thirdPartyCustomUIComponents.componentFor(org_id, service_id);
    const modelsIds = this.getModelsIds();

    return (
      <div className={classes.serviceDetailsTab}>
        <Suspense fallback={<div>Loading Service...</div>}>
          <ThirdPartyServiceErrorBoundary stopLoader={stopLoader}>
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
          refetchFeedback={this.fetchUserFeedback}
          handleResetAndRun={handleResetAndRun}
          callType={callType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedModelId: state.serviceTrainingReducer.currentModel.modelId,
  modelsList: state.serviceTrainingReducer.modelsList,
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  email: state.userReducer.email,
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state.userReducer.walletList),
  groupInfo: groupInfo(state),
  freeCallsAvailable: state.serviceDetailsReducer.freeCalls.freeCallsAvailable,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedback: (orgId, serviceId) => dispatch(serviceActions.fetchFeedback(orgId, serviceId)),
  stopLoader: () => dispatch(loaderActions.startAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ThirdPartyAIService));
