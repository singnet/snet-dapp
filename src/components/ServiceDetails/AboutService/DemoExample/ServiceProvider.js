import React, { Component } from "react";
import { Root } from "protobufjs";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import SampleServices from "../../../../assets/services";
import { useStyles } from "./styles";
import GRPCProtoV3Spec from "../../../../assets/models/GRPCProtoV3Spec";

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: "10px", fontFamily: "Muli" }}>
      {props.children}
    </Typography>
  );
};

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
      input: requestObject,
      user_address: "",
      dapp_user_address: "0x8977EB7ae3082b3D5DcB32a3Db62073Bf2b4D6F7",
    };

    this.postData(url, data);
  };

  render() {
    const { classes } = this.props;
    const { serviceSpecJSON, protoSpec, grpcResponse, DemoComponent } = this.state;

    return (
      <div className={classes.serviceDetailsTab}>
        <TabContainer>
          <DemoComponent
            callApiCallback={this.handleJobInvocation}
            protoSpec={protoSpec}
            serviceSpec={serviceSpecJSON}
            isComplete={false}
            response={grpcResponse}
            sliderWidth={"550px"}
          />
        </TabContainer>
      </div>
    );
  }
}
export default withStyles(useStyles)(ServiceProvider);
