import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import ServiceProvider from "./ThirdPartyAIService";

class ServiceDemo extends Component {
  state = {
    activeSection: 1,
    error: "error state message",
    progressText: ["Configure", "Purchase", "Results"],
    protoSpec: undefined,
    serviceSpecJSON: undefined,
    grpcResponse: undefined,
  };

  render() {
    const { classes, service } = this.props;
    const { activeSection, progressText } = this.state;
    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={activeSection} progressText={progressText} />
        <p>{this.props.tutorial}</p>
        <ServiceProvider service_id={service.service_id} org_id={service.org_id} />
      </div>
    );
  }
}

ServiceDemo.defaultProps = {
  tutorial: "",
};

export default withStyles(useStyles)(ServiceDemo);
