import React, { Component } from "react";
import { connect } from "react-redux";

import SampleServices from "../../../../assets/thirdPartyServices";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import { APIEndpoints } from "../../../../config/APIEndpoints";

class ServiceProvider extends Component {
  state = {
    grpcResponse: undefined,
    DemoComponent: undefined,
    serviceSpecJSON: undefined,
    protoSpec: undefined,
  };

  sampleServices = new SampleServices();

  componentDidUpdate = () => {
    const { org_id, service_id } = this.props;
    if (org_id && service_id && !this.state.DemoComponent) {
      this.fetchServiceSpec(org_id, service_id);
      const DemoComponent = this.sampleServices.getComponent(org_id, service_id);
      this.setState({ DemoComponent });
      return;
    }
    if (org_id && service_id && this.state.DemoComponent) {
      return;
    }
  };

  fetchServiceSpec = async (org_id, service_id) => {
    let servicebufURL = `${APIEndpoints.SERVICE_BUF.endpoint}/${org_id}/${service_id}`;
    const { serviceSpecJSON, protoSpec } = await this.props.fetchProtoSpec(servicebufURL);
    this.setState({ serviceSpecJSON, protoSpec });
  };

  handleJobInvocation = (serviceName, methodName, requestObject) => {
    const { org_id, service_id } = this.props;
    let data = {
      org_id,
      service_id,
      method: methodName,
      service_name: serviceName,
      input: JSON.stringify(requestObject),
      user_address: "",
      username: "Vivek205",
      isBase64Encoded: true,
    };
    this.props.invokeServiceMethod(data);
  };

  render() {
    const { classes, grpcResponse, isComplete } = this.props;
    const { DemoComponent, serviceSpecJSON, protoSpec } = this.state;
    if (!DemoComponent || !serviceSpecJSON || !protoSpec) {
      return null;
    }
    return (
      <div className={classes.serviceDetailsTab}>
        <DemoComponent
          callApiCallback={this.handleJobInvocation}
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
  grpcResponse: state.serviceReducer.serviceExecution.response,
  isComplete: state.serviceReducer.serviceExecution.isComplete,
});
const mapDispatchToProps = dispatch => ({
  fetchProtoSpec: servicebufURL => dispatch(serviceActions.fetchProtoSpec(servicebufURL)),
  invokeServiceMethod: data => dispatch(serviceActions.invokeServiceMethod(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceProvider));
