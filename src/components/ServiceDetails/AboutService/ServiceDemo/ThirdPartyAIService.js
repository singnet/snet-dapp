import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import SampleServices from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";
import Session from "../../../../utility/constants/Session";

class ThirdPartyAIService extends Component {
  state = {
    grpcResponse: undefined,
    AIServiceCustomComponent: undefined,
    serviceSpecJSON: undefined,
    protoSpec: undefined,
  };

  sampleServices = new SampleServices();

  componentDidUpdate = () => {
    const { org_id, service_id } = this.props;
    if (org_id && service_id && !this.state.AIServiceCustomComponent) {
      this.fetchServiceSpec(org_id, service_id);
      const AIServiceCustomComponent = this.sampleServices.getComponent(org_id, service_id);
      this.setState({ AIServiceCustomComponent });
    }
  };

  fetchServiceSpec = async (org_id, service_id) => {
    const servicebufURL = `${APIEndpoints.SERVICE_BUF.endpoint}/${org_id}/${service_id}`;
    const { serviceSpecJSON, protoSpec } = await this.props.fetchProtoSpec(servicebufURL);
    this.setState({ serviceSpecJSON, protoSpec });
  };

  handleServiceInvokation = (serviceName, methodName, requestObject) => {
    const { org_id, service_id } = this.props;
    const data = {
      org_id,
      service_id,
      method: methodName,
      service_name: serviceName,
      input: JSON.stringify(requestObject),
      user_address: "",
      username: sessionStorage.getItem(Session.USERNAME),
      isBase64Encoded: true,
    };
    this.props.invokeServiceMethod(data);
  };

  render() {
    const { classes, grpcResponse, isComplete } = this.props;
    const { AIServiceCustomComponent, serviceSpecJSON, protoSpec } = this.state;
    if (!AIServiceCustomComponent || !serviceSpecJSON || !protoSpec) {
      return null;
    }
    return (
      <div className={classes.serviceDetailsTab}>
        <AIServiceCustomComponent
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
});
const mapDispatchToProps = dispatch => ({
  fetchProtoSpec: servicebufURL => dispatch(serviceActions.fetchProtoSpec(servicebufURL)),
  invokeServiceMethod: data => dispatch(serviceActions.invokeServiceMethod(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThirdPartyAIService));
