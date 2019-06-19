import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

//  import internal components
import Header from "../common/LoginOnboardingHeader";
import ProgressSection, { ProgressStatusList } from "./ProgressSection";

const useStyles = theme => ({
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
  },
  tabsContainer: {
    width: "41%",
    margin: "40px auto 0",
    "& ul": {
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "space-between"
    },
    "& li": {
      listStyle: "none",
      "&:first-of-type": {
        "&::before": {
          display: "none"
        }
      },
      "&::before": {
        content: '""',
        width: 90,
        height: 1,
        marginRight: 16,
        display: "inline-block",
        backgroundColor: theme.palette.text.gray12,
        verticalAlign: "middle"
      },
      "& i": {
        color: theme.palette.text.green,
        fontSize: 20
      }
    }
  },

  active: {
    "& span": {
      "&:first-of-type": { backgroundColor: theme.palette.text.primary },
      "&:last-of-type": { color: "#000" }
    }
  }
});

class ProgressBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header linkText="Log Out" />
        <div className={classes.topSection}>
          <h2>Welcome Username</h2>
          <p>
            You have successfully logged into your singularitynet account.
            <br /> You are just steps away from completing your activation.
          </p>
        </div>
        <div className={classes.tabsContainer}>
          <ul>
            <ProgressSection
              progressNumber={1}
              progressText="Authentication"
              progressStatus={ProgressStatusList.IDLE}
            />
            <ProgressSection
              progressNumber={2}
              progressText="Terms of use"
              progressStatus={ProgressStatusList.ACTIVE}
            />
            <ProgressSection
              progressNumber={3}
              progressText="Wallet key"
              progressStatus={ProgressStatusList.COMPLETED}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProgressBar);
