import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import PrivacyTerms from "./PrivacyTerms";
import { userActions } from "../../../Redux/actionCreators";
import Routes from "../../../utility/constants/Routes";
import AlertBox, { alertTypes } from "../../common/AlertBox";

class TermsOfUse extends Component {
  state = {
    isTermsAccepted: false,
    alertMessage: undefined,
  };

  handleChange = event => {
    this.setState({ isTermsAccepted: event.target.checked });
  };

  handleSubmit = async () => {
    this.setState({ alertMessage: undefined });
    const { updateUserProfile, history } = this.props;
    const updatedUserData = { is_terms_accepted: this.state.isTermsAccepted, email_alerts: false };
    try {
      await updateUserProfile(updatedUserData);
      if (history.location.state && history.location.state.sourcePath) {
        history.push(history.location.state.sourcePath);
        return;
      }
      history.push(`/${Routes.AI_MARKETPLACE}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        this.setState({ alertMessage: error.response.data.error });
        return;
      }

      this.setState({ alertMessage: String(error) });
    }
  };

  render() {
    const { classes } = this.props;
    const { isTermsAccepted, alertMessage } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <div className={classes.termsOfUseContainer}>
          <h3>Review and Accept the Terms of Service</h3>
          <div className={classes.termsAndConditions}>
            <PrivacyTerms />
          </div>
          <div className={classes.checkboxAndButton}>
            <FormControlLabel
              control={<Checkbox checked={isTermsAccepted} onChange={this.handleChange} color="primary" />}
              label="I agree to the Terms of Service"
            />
            <StyledButton type="blue" btnText="accept" disabled={!isTermsAccepted} onClick={this.handleSubmit} />
          </div>
          <AlertBox type={alertTypes.ERROR} message={alertMessage} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUserProfile: updatedUserData => dispatch(userActions.updateUserProfile(updatedUserData)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(TermsOfUse)));
