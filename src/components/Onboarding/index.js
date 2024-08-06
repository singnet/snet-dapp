import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Authentication from "./Authentication";
import TermsOfUse from "./TermsOfUse";
import { useStyles } from "./styles";
import OnboardingContainer from "./OnboardingContainer";
import Routes from "../../utility/constants/Routes";

class Onboarding extends Component {
  state = {
    verificationCode: "",
    activeSection: 1,
    progressText: [{ label: "Authentication" }, { label: "Terms of service" }],
  };

  componentDidMount = () => {
    this.initialChecks();
  };

  componentDidUpdate = () => {
    this.initialChecks();
  };

  initialChecks = () => {
    const { isEmailVerified, isTermsAccepted, history } = this.props;
    if (!isEmailVerified) {
      return;
    }
    if (this.state.activeSection === 1) {
      this.setState({ activeSection: 2 });
    }
    if (isTermsAccepted) {
      if (history.location.state && history.location.state.sourcePath) {
        history.push(history.location.state.sourcePath);
        return;
      }
      history.push(`/${Routes.AI_MARKETPLACE}`);
    }
  };

  handleNextSection = () => {
    this.setState((prevState) => ({
      activeSection: prevState.activeSection + 1,
    }));
  };

  render() {
    const { classes, nickname } = this.props;
    const { activeSection, progressText } = this.state;

    const OnboardingDetails = [
      {
        title: `Welcome ${nickname}`,
        description: (
          <p>
            You have successfully logged into your singularitynet account. <br />
            You are just steps away from completing your activation.
          </p>
        ),
        component: <Authentication handleNextSection={this.handleNextSection} />,
      },
      {
        title: `Step 2. Privacy and Terms of Service`,
        description: <p>Just one more step and you’ll be all set!</p>,
        component: <TermsOfUse />,
      },
    ];

    return (
      <div className={classes.onboardingContainer}>
        <Helmet>
          <meta
            name="description"
            content="Begin your journey into the AI Marketplace with SingularityNET. Access a world of AI services and solutions today."
          />
          <meta name="keywords" content="AI Marketplace, Onboarding, SingularityNET, AI Services, Get Started" />
        </Helmet>
        {OnboardingDetails.map((item, index) => (
          <OnboardingContainer
            key={item.title}
            classes={classes}
            item={item}
            active={activeSection === index + 1}
            activeSection={activeSection}
            progressText={progressText}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEmailVerified: state.userReducer.isEmailVerified,
  isTermsAccepted: state.userReducer.isTermsAccepted,
  nickname: state.userReducer.nickname,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Onboarding));
