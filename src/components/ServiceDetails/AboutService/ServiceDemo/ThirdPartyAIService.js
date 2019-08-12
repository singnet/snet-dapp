import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import thirdPartyCustomUIComponents from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions, loaderActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";
import CompletedActions from "./CompletedActions";
import { createServiceClient, callTypes } from "../../../../utility/sdk";
import ThirdPartyServiceErrorBoundary from "./ThirdPartyServiceErrorBoundary";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";

class ThirdPartyAIService extends Component {
  state = {
    feedback: {
      comment: "",
      rating: "",
    },
    loading: true,
    serviceRequestComplete: false,
  };

  componentDidMount = async () => {
    const { org_id, service_id, freeCallsRemaining, serviceMetadata } = this.props;
    const callType = freeCallsRemaining > 0 ? callTypes.FREE : callTypes.REGULAR;
    this.serviceClient = await createServiceClient(
      org_id,
      service_id,
      serviceMetadata,
      this.serviceRequestStartHandler,
      this.serviceRequestCompleteHandler,
      callType
    );
    await this.setupComponent();
    this.setState({ loading: false });
  };

  setupComponent = async () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    const { serviceSpecJSON, protoSpec } = await this.fetchServiceSpec();
    this.serviceSpecJSON = serviceSpecJSON;
    this.protoSpec = protoSpec;
    this.fetchUserFeedback();
  };

  serviceRequestStartHandler = () => {
    this.props.startLoader();
    this.setState({ serviceRequestComplete: false });
  };

  serviceRequestCompleteHandler = () => {
    this.setState({ serviceRequestComplete: true });
    this.props.stopLoader();
  };

  fetchUserFeedback = async () => {
    const { org_id, service_id } = this.props;
    const feedback = await this.props.fetchFeedback(org_id, service_id);
    if (!feedback.data.length > 0) {
      return;
    }
    this.setState({ feedback: { comment: feedback.data[0].comment[0], rating: feedback.data[0].rating } });
  };

  fetchServiceSpec = async () => {
    const { org_id, service_id } = this.props;
    const servicebufURL = `${APIEndpoints.SERVICE_BUF.endpoint}/${org_id}/${service_id}`;
    return this.props.fetchProtoSpec(servicebufURL);
  };

  handleServiceInvokation = (serviceName, methodName, requestObject) => {
    const { org_id, service_id, username } = this.props;
    const data = {
      org_id,
      service_id,
      method: methodName,
      service_name: serviceName,
      input: JSON.stringify(requestObject),
      user_address: "",
      username,
      isBase64Encoded: true,
    };
    this.props.invokeServiceMethod(data);
  };

  handleResetAndRun = () => {
    const { isComplete, resetServiceExecution } = this.props;
    if (isComplete) {
      resetServiceExecution();
      return;
    }
    this.setState({ serviceRequestComplete: false });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    const { org_id, service_id, classes, grpcResponse, isComplete } = this.props;
    const { feedback, serviceRequestComplete } = this.state;
    const { serviceClient, serviceSpecJSON, protoSpec } = this;
    const AIServiceCustomComponent = thirdPartyCustomUIComponents.componentFor(org_id, service_id);

    return (
      <div className={classes.serviceDetailsTab}>
        <Suspense fallback={<div>Loading Service...</div>}>
          <ThirdPartyServiceErrorBoundary>
            <AIServiceCustomComponent
              serviceClient={serviceClient}
              callApiCallback={this.handleServiceInvokation}
              protoSpec={protoSpec}
              serviceSpec={serviceSpecJSON}
              isComplete={isComplete | serviceRequestComplete}
              response={grpcResponse}
              sliderWidth={"550px"}
            />
          </ThirdPartyServiceErrorBoundary>
        </Suspense>
        <CompletedActions
          isComplete={isComplete || serviceRequestComplete}
          feedback={feedback}
          orgId={org_id}
          serviceId={service_id}
          refetchFeedback={this.fetchUserFeedback}
          handleResetAndRun={this.handleResetAndRun}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grpcResponse: state.serviceReducer.serviceMethodExecution.response,
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  username: state.userReducer.username,
  serviceMetadata: state.serviceReducer.serviceMetadata,
});
const mapDispatchToProps = dispatch => ({
  fetchProtoSpec: servicebufURL => dispatch(serviceActions.fetchProtoSpec(servicebufURL)),
  invokeServiceMethod: data => dispatch(serviceActions.invokeServiceMethod(data)),
  startLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
  resetServiceExecution: () => dispatch(serviceActions.resetServiceExecution),
  fetchFeedback: (orgId, serviceId) => dispatch(serviceActions.fetchFeedback(orgId, serviceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThirdPartyAIService));
