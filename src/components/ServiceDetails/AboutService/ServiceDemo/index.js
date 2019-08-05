import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import ThirdPartyAIService from "./ThirdPartyAIService";

class ServiceDemo extends Component {
  state = {
    error: "error state message",
    progressText: ["Configure", "Results"],
  };

  render() {
    const { classes, service, isComplete } = this.props;
    const { progressText } = this.state;
    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={isComplete ? 2 : 1} progressText={progressText} />
        <p>{this.props.tutorial}</p>
        <ThirdPartyAIService service_id={service.service_id} org_id={service.org_id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
});

export default connect(mapStateToProps)(withStyles(useStyles)(ServiceDemo));
