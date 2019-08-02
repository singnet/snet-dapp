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
    this.serviceSpecJSON = serviceSpecJSON;
    this.protoSpec = protoSpec;
    await this.fetchUserFeedback();
    this.setState({ loading: false });
  };

  serviceRequestStartHandler = () => {
    this.setState({ serviceRequestComplete: false });
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
    if (process.env.REACT_APP_SANDBOX) {
      return {};
    }

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
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    const { org_id, service_id, classes, grpcResponse, isComplete } = this.props;
    const { feedback, serviceRequestComplete } = this.state;
    const { serviceClient, serviceSpecJSON, protoSpec } = this;
    const AIServiceCustomComponent = this.sampleServices.getComponent(org_id, service_id);

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
