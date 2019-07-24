import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import SampleServices from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";
import { createServiceClient } from "../../../../utility/sdk";
import CompletedActions from "./CompletedActions";

class ThirdPartyAIService extends Component {
  state = {
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
    this.setState({ loading: false });
  };

  serviceRequestStartHandler = () => {
    this.setState({ serviceRequestComplete: false });
  };

  serviceRequestCompleteHandler = () => {
    this.setState({ serviceRequestComplete: true });
  }

  fetchAIServiceComponent = () => {
    const { org_id, service_id, fetchFeedback } = this.props;
    if (org_id && service_id && !this.state.AIServiceCustomComponent) {
      this.fetchServiceSpec(org_id, service_id);
      const AIServiceCustomComponent = this.sampleServices.getComponent(org_id, service_id);
      this.setState({ AIServiceCustomComponent });
      fetchFeedback(org_id, service_id);
    }
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
    const { classes, grpcResponse, isComplete, feedback, org_id, service_id } = this.props;
    const { AIServiceCustomComponent, serviceSpecJSON, protoSpec } = this.state;
    if (!AIServiceCustomComponent || !serviceSpecJSON || !protoSpec) {
      return null;
    }

    const { org_id, service_id, classes, grpcResponse, isComplete } = this.props;
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
        <CompletedActions isComplete feedback={feedback} orgId={org_id} serviceId={service_id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grpcResponse: state.serviceReducer.serviceMethodExecution.response,
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  username: state.userReducer.username,
  feedback: state.serviceReducer.feedback,
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
