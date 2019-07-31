import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import SampleServices from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";
import CompletedActions from "./CompletedActions";
import { createServiceClient } from "../../../../utility/sdk";

class ThirdPartyAIService extends Component {
  state = {
    AIServiceCustomComponent: undefined,
    serviceSpecJSON: undefined,
    protoSpec: undefined,
    feedback: {
      comment: "",
      rating: "",
    },
    loading: true,
    serviceRequestComplete: false,
  };

  sampleServices = new SampleServices();

  componentDidMount = async () => {
    const { org_id, service_id, username } = this.props;
    this.serviceClient = await createServiceClient(
      org_id,
      service_id,
      username,
      this.serviceRequestStartHandler,
      this.serviceRequestCompleteHandler
    );
    const { serviceSpecJSON, protoSpec } = await this.fetchServiceSpec(org_id, service_id);
    this.fetchAIServiceComponent();
    this.setState({ loading: false, serviceSpecJSON, protoSpec });
  };

  serviceRequestStartHandler = () => {
    this.setState({ serviceRequestComplete: false });
  };

  fetchAIServiceComponent = () => {
    const { org_id, service_id } = this.props;
    if (org_id && service_id && !this.state.AIServiceCustomComponent) {
      this.fetchServiceSpec(org_id, service_id);
      const AIServiceCustomComponent = this.sampleServices.getComponent(org_id, service_id);
      this.setState({ AIServiceCustomComponent });
      this.fetchUserFeedback();
    }
  };

  serviceRequestCompleteHandler = () => {
    this.setState({ serviceRequestComplete: true });
  };

  fetchUserFeedback = async () => {
    const { org_id, service_id } = this.props;
    const feedback = await this.props.fetchFeedback(org_id, service_id);
    this.setState(prevState => ({
      ...prevState,
      feedback: { comment: feedback.data[0].comment[0], rating: feedback.data[0].rating },
    }));
  };

  fetchServiceSpec = async (org_id, service_id) => {
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

  render() {
    const { org_id, service_id, classes, grpcResponse, isComplete } = this.props;
    const { AIServiceCustomComponent, serviceSpecJSON, protoSpec, feedback, serviceRequestComplete } = this.state;

    if (!AIServiceCustomComponent || !serviceSpecJSON || !protoSpec) {
      return null;
    }
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    const { serviceClient } = this;

    return (
      <div className={classes.serviceDetailsTab}>
        <AIServiceCustomComponent
          serviceClient={serviceClient}
          callApiCallback={this.handleServiceInvokation}
          protoSpec={protoSpec}
          serviceSpec={serviceSpecJSON}
          isComplete={isComplete}
          response={grpcResponse}
          sliderWidth={"550px"}
        />
        <CompletedActions
          isComplete={isComplete || serviceRequestComplete}
          feedback={feedback}
          orgId={org_id}
          serviceId={service_id}
          refetchFeedback={this.fetchUserFeedback}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grpcResponse: state.serviceReducer.serviceMethodExecution.response,
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  username: state.userReducer.username,
});
const mapDispatchToProps = dispatch => ({
  fetchProtoSpec: servicebufURL => dispatch(serviceActions.fetchProtoSpec(servicebufURL)),
  invokeServiceMethod: data => dispatch(serviceActions.invokeServiceMethod(data)),
  fetchFeedback: (orgId, serviceId) => dispatch(serviceActions.fetchFeedback(orgId, serviceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThirdPartyAIService));
