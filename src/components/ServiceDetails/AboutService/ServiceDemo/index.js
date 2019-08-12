import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import ProgressBar from "../../../common/ProgressBar";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import PurchaseToggler from "./PurchaseToggler";

class ServiceDemo extends Component {
  state = {
    error: "error state message",
    progressText: ["Purchase", "Configure", "Results"],
    purchaseCompleted: false,
  };

  componentDidMount = () => {
    this.fetchFreeCallsUsage();
  };

  fetchFreeCallsUsage = async () => {
    const { service, fetchMeteringData, email } = this.props;
    fetchMeteringData({
      orgId: service.org_id,
      serviceId: service.service_id,
      username: email,
    });
  };

  computeActiveSection = () => {
    const { purchaseCompleted } = this.state;
    const { isComplete } = this.props;
    return purchaseCompleted ? (isComplete ? 3 : 2) : 1;
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
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  freeCallsRemaining: state.serviceReducer.freeCallsRemaining,
  freeCallsAllowed: state.serviceReducer.freeCallsAllowed,
  email: state.userReducer.email,
});

const mapDispatchToProps = dispatch => ({
  fetchMeteringData: args => dispatch(serviceActions.fetchMeteringData({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDemo));
