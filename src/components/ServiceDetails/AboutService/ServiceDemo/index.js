import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import { serviceDetailsActions } from "../../../../Redux/actionCreators";
import PurchaseToggler from "./PurchaseToggler";

const demoProgressStatus = {
  purchasing: 1,
  executingAIservice: 2,
  displayingResponse: 3,
};

class ServiceDemo extends Component {
  state = {
    error: "error state message",
    progressText: ["Purchase", "Configure", "Results"],
    purchaseCompleted: false,
  };

  componentDidMount = async () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    await this.fetchFreeCallsUsage();
  };

  fetchFreeCallsUsage = () => {
    const { service, fetchMeteringData, email } = this.props;
    return fetchMeteringData({
      orgId: service.org_id,
      serviceId: service.service_id,
      username: email,
    });
  };

  computeActiveSection = () => {
    const { purchaseCompleted } = this.state;
    const { isServiceExecutionComplete } = this.props;
    const { purchasing, executingAIservice, displayingResponse } = demoProgressStatus;

    return purchaseCompleted ? (isServiceExecutionComplete ? displayingResponse : executingAIservice) : purchasing;
  };

  handlePurchaseComplete = () => {
    this.setState({ purchaseCompleted: true });
  };

  render() {
    const { classes, service, freeCallsRemaining, freeCallsAllowed } = this.props;
    const { progressText, purchaseCompleted } = this.state;
    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={this.computeActiveSection()} progressText={progressText} />
        <PurchaseToggler
          purchaseCompleted={purchaseCompleted}
          purchaseProps={{ handleComplete: this.handlePurchaseComplete, freeCallsRemaining, freeCallsAllowed }}
          thirdPartyProps={{ service_id: service.service_id, org_id: service.org_id, freeCallsRemaining }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isServiceExecutionComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  freeCallsRemaining: state.serviceDetailsReducer.freeCallsRemaining,
  freeCallsAllowed: state.serviceDetailsReducer.freeCallsAllowed,
  email: state.userReducer.email,
});

const mapDispatchToProps = dispatch => ({
  fetchMeteringData: args => dispatch(serviceDetailsActions.fetchMeteringData({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDemo));
