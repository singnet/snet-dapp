import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

import ProgressBar from "./ProgressBar";
import Header from "../common/LoginOnboardingHeader";
import Authentication from "./Authentication";
import TermsOfUse from "./termsOfUse";
import Session from "../../utility/stringConstants/session";
import { Auth } from "aws-amplify";
import WalletKey from "./WalletKey";

const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.gray8
  },
  topSection: {
    textAlign: "center",
    "& h2": {
      color: theme.palette.text.black1,
      fontSize: 32,
      fontWeight: theme.typography.fontweight
    },
    "& p": {
      margin: "20px 0 0",
      color: theme.palette.text.gray3,
      fontFamily: theme.typography.secondary.main,
      fontSize: 20,
      lineHeight: "30px"
    }
  }
});

class Authorization extends Component {
  state = {
    verificationCode: "",
    activeSection: 1
  };

  componentDidMount = () => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(res => {
        console.log("onboarding page", res);
        if (res.attributes.email_verified) {
          this.setState({ activeSection: 2 });
        }
      })
      .catch(err => {
        console.log("onboarding err", err);
      });
  };

  componentDidUpdate = () => {
    console.log("session", sessionStorage.getItem(Session.USERNAME));
    if (
      sessionStorage.getItem(Session.USERNAME) &&
      this.state.activeSection === 1
    ) {
      Auth.currentAuthenticatedUser({ bypassCache: true })
        .then(res => {
          if (res.attributes.email_verified) {
            this.setState({ activeSection: 2 });
          }
        })
        .catch(err => {});
    }
  };

  handleNextSection = () => {
    this.setState(prevState => ({
      activeSection: prevState.activeSection + 1
    }));
  };
  handleLogout = () => {
    Auth.signOut()
      .then(data => {
        sessionStorage.removeItem(Session.USERNAME);
      })
      .catch(err => console.log(err));
  };
  render() {
    const { classes } = this.props;
    const { activeSection } = this.state;

    let username = sessionStorage.getItem(Session.USERNAME);
    const headings = [`Welcome ${username}`, "Step 2", "Step 3"];
    const components = [
      <Authentication handleNextSection={this.handleNextSection} />,
      <TermsOfUse handleNextSection={this.handleNextSection} />,
      <WalletKey />
    ];
    return (
      <div className={classes.onboardingContainer}>
        <Header linkText="Log Out" linkClick={this.handleLogout} />
        <div className={classes.topSection}>
          <h2>{headings[activeSection - 1]}</h2>
          <p>
            You have successfully logged into your singularitynet account.
            <br /> You are just steps away from completing your activation.
          </p>
        </div>
        <ProgressBar activeSection={activeSection} />
        {components[activeSection - 1]}
      </div>
    );
  }
}

export default withStyles(useStyles)(Authorization);
