import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import SampleServices from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";
import { createServiceClient } from '../../../../utility/sdk';

class ThirdPartyAIService extends Component {
  state = {
    loading: true,
    serviceRequestComplete: false,
  };

  sampleServices = new SampleServices();

  componentDidMount = async () => {
    const { org_id, service_id, username } = this.props;
    this.serviceClient = await createServiceClient(org_id, service_id, username, this.serviceRequestCompleteHandler);
    const { serviceSpecJSON, protoSpec } = await this.fetchServiceSpec(org_id, service_id);
    this.serviceSpecJSON = serviceSpecJSON;
    this.protoSpec = protoSpec;
    this.setState({ loading: false });
  };

  serviceRequestCompleteHandler = () => {
    this.setState({ serviceRequestComplete: true })
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
    const { loading } = this.state;
    if (loading) {
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThirdPartyAIService));
