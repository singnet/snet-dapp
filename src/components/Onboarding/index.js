import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";
import ProgressBar from "./ProgressBar";
import Header from "../common/LoginOnboardingHeader";
import Authentication from "./Authentication";

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
    activeSection: 2
  };

  handleNextSection = () => {
    this.setState(prevState => ({
      activeSection: prevState.activeSection + 1
    }));
  };
  render() {
    const { classes } = this.props;
    const { activeSection } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <Header linkText="Log Out" />
        <div className={classes.topSection}>
          <h2>Welcome Username</h2>
          <p>
            You have successfully logged into your singularitynet account.
            <br /> You are just steps away from completing your activation.
          </p>
        </div>
        <ProgressBar activeSection={activeSection} />
        <Authentication handleNextSection={this.handleNextSection} />
      </div>
    );
  }
}

export default withStyles(useStyles)(Authorization);
