import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import thirdPartyCustomUIComponents from "../../../../assets/thirdPartyServices";
import { useStyles } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import CompletedActions from "./CompletedActions";
import { createServiceClient, callTypes } from "../../../../utility/sdk";
import ThirdPartyServiceErrorBoundary from "./ThirdPartyServiceErrorBoundary";

class ThirdPartyAIService extends Component {
  state = {
    feedback: {
      comment: "",
      rating: "",
    },
    loading: true,
  };

  componentDidMount = async () => {
    const { org_id, service_id, freeCallsRemaining, groupInfo, wallet } = this.props;
    const callType = freeCallsRemaining > 0 ? callTypes.FREE : callTypes.REGULAR;
    this.serviceClient = await createServiceClient(
      org_id,
      service_id,
      groupInfo,
      this.props.serviceRequestStartHandler,
      this.props.serviceRequestCompleteHandler,
      callType,
      wallet
    );
    await this.setupComponent();
    this.setState({ loading: false });
  };

  setupComponent = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    this.fetchUserFeedback();
  };

  fetchUserFeedback = async () => {
    const { org_id, service_id } = this.props;
    const feedback = await this.props.fetchFeedback(org_id, service_id);
    if (!feedback.data.length > 0) {
      return;
    }
    this.setState({ feedback: { comment: feedback.data[0].comment[0], rating: feedback.data[0].rating } });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    const {
      org_id,
      service_id,
      classes,
      stopLoader,
      isServiceExecutionComplete,
      handleResetAndRun,
      serviceRequestErrorHandler,
    } = this.props;
    const { feedback } = this.state;
    const { serviceClient } = this;
    const AIServiceCustomComponent = thirdPartyCustomUIComponents.componentFor(org_id, service_id);

    return (
      <div className={classes.serviceDetailsTab}>
        <Suspense fallback={<div>Loading Service...</div>}>
          <ThirdPartyServiceErrorBoundary stopLoader={stopLoader}>
            <AIServiceCustomComponent
              serviceClient={serviceClient}
              isComplete={isServiceExecutionComplete}
              sliderWidth={"550px"}
              serviceRequestErrorHandler={serviceRequestErrorHandler}
            />
          </ThirdPartyServiceErrorBoundary>
        </Suspense>
        <CompletedActions
          isComplete={isServiceExecutionComplete}
          feedback={feedback}
          orgId={org_id}
          serviceId={service_id}
          refetchFeedback={this.fetchUserFeedback}
          handleResetAndRun={handleResetAndRun}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isComplete: state.serviceReducer.serviceMethodExecution.isComplete,
  email: state.userReducer.email,
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  fetchFeedback: (orgId, serviceId) => dispatch(serviceActions.fetchFeedback(orgId, serviceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThirdPartyAIService));
