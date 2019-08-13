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

class TermsOfUse extends Component {
  state = {
    isTermsAccepted: false,
  };

  componentDidMount = () => {
    this.setState({ isTermsAccepted: this.props.isTermsAccepted });
  };

  handleChange = event => {
    this.setState({ isTermsAccepted: event.target.checked });
  };

  handleSubmit = async () => {
    const { updateUserProfile, history } = this.props;
    const updatedUserData = { terms_accepted: this.state.isTermsAccepted };
    await updateUserProfile(updatedUserData);
    if (history.location.state && history.location.state.sourcePath) {
      history.push(history.location.state.sourcePath);
      return;
    }
    history.push(`/${Routes.AI_MARKETPLACE}`);
  };

  render() {
    const { classes, handleNextSection } = this.props;
    const { isTermsAccepted } = this.state;
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
            <StyledButton btnText="accept" disabled={!isTermsAccepted} onClick={handleNextSection} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTermsAccepted: state.userReducer.isTermsAccepted,
});

const mapDispatchToProps = dispatch => ({
  updateUserProfile: updatedUserData => dispatch(userActions.updateUserProfile(updatedUserData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(TermsOfUse)));
