import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Switch from "@material-ui/core/Switch";

import StyledTextField from "../../../common/StyledTextField";
import StyledButton from "../../../common/StyledButton";
import ErrorMsgBox from "../../../common/ErrorMsgBox";
import ProgressBar from "../../../common/ProgressBar";
import ImageUpload from "./ImageUpload";
import { useStyles } from "./styles";
import ExampleService from "../../../common/Example-Service/ExampleService";
import ServiceProvider from "./ServiceProvider";

class DemoExample extends Component {
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
    const { activeSection, error, progressText, protoSpec, serviceSpecJSON, grpcResponse } = this.state;
    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={activeSection} progressText={progressText} />
        <p>{this.props.tutorial}</p>
        <ServiceProvider service_id={service.service_id} org_id={service.org_id} />
        {/* <div className={classes.uploadImageContainer}>
          <ImageUpload imageType="Content Image" />
          <ImageUpload imageType="Style Image" />
        </div>
        <div className={classes.parametersContainer}>
          <div className={classes.parameterHeader}>
            <h4>Parameters</h4>
            <IconButton aria-label="Settings" className={classes.showMore}>
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className={classes.parameters}>
            <div className={classes.switchContainer}>
              <i className="fas fa-info-circle" />
              <span className={classes.switchLabel}>
                Start from <br />
                Random
              </span>
              <Switch value={true} className={classes.switch} inputProps={{ "aria-label": "primary checkbox" }} />
            </div>
            <div>
              <StyledTextField label={"Output Image Size"} />
            </div>
            <div className={classes.optimationRounds}>
              <i className="fas fa-info-circle" />
              <StyledTextField label={"Optimation Rounds"} />
            </div>
            <div>
              <StyledTextField label={"Optimation Iterations"} />
            </div>
          </div>
          <ErrorMsgBox errorMsg={error} showErr={true} />
        </div>
        <div className={classes.demoContainerButtons}>
          <StyledButton type="transparent" btnText="reset inputs" />
          <StyledButton btnText="next" />
        </div> */}
      </div>
    );
  }
}

DemoExample.defaultProps = {
  tutorial: `Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload
  a a file from your computer, URL, or select image from the gallery. You can specify additional parameters in
  the panel below. “Mouse over” for tool tips.`,
};

export default withStyles(useStyles)(DemoExample);
