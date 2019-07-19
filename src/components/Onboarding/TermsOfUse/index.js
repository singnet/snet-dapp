import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import PrivacyTerms from "./PrivacyTerms";

class TermsOfUse extends Component {
  state = {
    hasAcceptedTerms: false,
  };

  handleAcceptTerms = event => {
    this.setState({ hasAcceptedTerms: event.target.checked });
  };

  render() {
    const { classes, handleNextSection } = this.props;
    const { hasAcceptedTerms } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <div className={classes.termsOfUseContainer}>
          <h3>Review and Accept Terms of Service</h3>
          <div className={classes.termsAndConditions}>
            <PrivacyTerms />
          </div>
          <div className={classes.checkboxAndButton}>
            <FormControlLabel
              control={<Checkbox checked={hasAcceptedTerms} onChange={this.handleAcceptTerms} color="primary" />}
              label="I agree to the Terms of Service"
            />
            <StyledButton btnText="accept" disabled={!hasAcceptedTerms} onClick={handleNextSection} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TermsOfUse);
