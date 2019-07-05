import React, { Component } from "react";
import { Root } from "protobufjs";

import SampleServices from "../../../../assets/services";
import { useStyles } from "./styles";
import GRPCProtoV3Spec from "../../../../assets/models/GRPCProtoV3Spec";
import { withStyles } from "@material-ui/styles";

class ServiceProvider extends Component {
  state = {
    serviceSpecJSON: undefined,
    protoSpec: undefined,
    grpcResponse: undefined,
    DemoComponent: props => <div></div>,
  };

  sampleServices = new SampleServices();

  componentDidUpdate = () => {
    const { org_id, service_id } = this.props;
    if (!org_id || !service_id || this.state.protoSpec) {
      return;
    }

    this.fetchServiceSpec(org_id, service_id);
  };

  fetchServiceSpec = (org_id, service_id) => {
    let _urlservicebuf = `https://protojs.singularitynet.io/ropsten/${org_id}/${service_id}`;
    return fetch(encodeURI(_urlservicebuf))
      .then(serviceSpecResponse => serviceSpecResponse.json())
      .then(
        serviceSpec =>
          new Promise(resolve => {
            const serviceSpecJSON = Root.fromJSON(serviceSpec[0]);
            const protoSpec = new GRPCProtoV3Spec(serviceSpecJSON);
            const DemoComponent = this.sampleServices.getComponent(org_id, service_id);
            this.setState({ serviceSpecJSON, protoSpec, DemoComponent });
            resolve({ serviceSpecJSON, protoSpec });
          })
      );
  };

  postData = (url, data = {}) => {
    return fetch(url, {
      method: "POST",
      mode: "CORS",
      body: JSON.stringify(data),
    }).then(response => response.json());
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

    this.postData(url, data);
  };

  render() {
    const { classes } = this.props;
    const { serviceSpecJSON, protoSpec, grpcResponse, DemoComponent } = this.state;

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
export default withStyles(useStyles)(ServiceProvider);
