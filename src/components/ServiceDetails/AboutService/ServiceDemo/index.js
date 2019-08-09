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
    freeCallsRemaining: 1,
  };

  componentDidMount = () => {
    this.fetchFreeCallsUsage();
  };

  fetchFreeCallsUsage = async () => {
    const { service, fetchMeteringData } = this.props;
    const usageData = await fetchMeteringData({
      orgId: service.org_id,
      serviceId: service.service_id,
      username: "n.vin95@gmail.com",
    });
    const freeCallsRemaining = usageData.free_calls_allowed - usageData.total_calls_made;
    this.setState({ freeCallsRemaining });
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
    const { classes, service } = this.props;
    const { progressText, purchaseCompleted, freeCallsRemaining } = this.state;
    return (
      <div className={classes.demoExampleContainer}>
        <h4>Process</h4>
        <ProgressBar activeSection={this.computeActiveSection()} progressText={progressText} />
        <PurchaseToggler
          purchaseCompleted={purchaseCompleted}
          purchaseProps={{ handleComplete: this.handlePurchaseComplete, freeCallsRemaining }}
          thirdPartyProps={{ service_id: service.service_id, org_id: service.org_id, freeCallsRemaining }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
});

const mapDispatchToProps = dispatch => ({
  fetchMeteringData: args => dispatch(serviceActions.fetchMeteringData({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDemo));
