import React, { Component } from "react";
import { connect } from "react-redux";

import SampleServices from "../../../../assets/services";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";

class ServiceProvider extends Component {
  state = {
    grpcResponse: undefined,
    DemoComponent: undefined,
  };

  sampleServices = new SampleServices();

  componentDidUpdate = () => {
    const { org_id, service_id } = this.props;
    if (!org_id || !service_id || this.state.protoSpec) {
      return;
    }
    if (org_id && service_id && !this.state.DemoComponent) {
      const DemoComponent = this.sampleServices.getComponent(org_id, service_id);
      this.setState({ DemoComponent });
    }

    this.fetchServiceSpec(org_id, service_id);
  };

  fetchServiceSpec = (org_id, service_id) => {
    let servicebufURL = `https://protojs.singularitynet.io/ropsten/${org_id}/${service_id}`;
    this.props.fetchSpecDetails(servicebufURL);
  };

  handleJobInvocation = (serviceName, methodName, requestObject) => {
    const { org_id, service_id } = this.props;
    let url = "https://269wz9jke5.execute-api.us-east-1.amazonaws.com/ropsten/call-service";
    let data = {
      org_id,
      service_id,
      method: methodName,
      service_name: serviceName,
      input: JSON.stringify(requestObject),
      user_address: "",
      dapp_user_address: "0x4147BDE67b3b54E210d85CCf7709096756Ff55Bb",
      isBase64Encoded: true,
    };
    this.props.executeService(url, data);
  };

  render() {
    const { classes, serviceSpecJSON, protoSpec } = this.props;
    const { grpcResponse, DemoComponent } = this.state;
    if (!DemoComponent) {
      return null;
    }
    return (
      <div className={classes.serviceDetailsTab}>
        <DemoComponent
          callApiCallback={this.handleJobInvocation}
          protoSpec={protoSpec}
          serviceSpec={serviceSpecJSON}
          isComplete={false}
          response={grpcResponse}
          sliderWidth={"550px"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  protoSpec: state.serviceReducer.serviceExecution.protoSpec,
  serviceSpecJSON: state.serviceReducer.serviceExecution.serviceSpecJSON,
  grpcResponse: state.serviceReducer.serviceExecution.response,
});
const mapDispatchToProps = dispatch => ({
  fetchSpecDetails: servicebufURL => dispatch(serviceActions.fetchSpecDetails(servicebufURL)),
  executeService: (url, data) => dispatch(serviceActions.executeService(url, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceProvider));
