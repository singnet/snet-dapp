import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

//  import internal components
import Header from "../common/LoginOnboardingHeader";

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
  number: {
    borderRadius: 25,
    padding: "3px 10px",
    marginRight: 10,
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.text.white
  },
  TabTitle: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontFamily: theme.typography.secondary.main
  },
  active: {
    "& span": {
      "&:first-of-type": { backgroundColor: theme.palette.text.primary },
      "&:last-of-type": { color: "#000" }
    }
  }
});

class TopSection extends Component {
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
            <li className={classes.active}>
              {this.props.completed ? (
                <span>
                  <i className="fas fa-check-circle"></i>
                </span>
              ) : (
                <span className={classes.number}>1</span>
              )}
              <span className={classes.TabTitle}>Authentication</span>
            </li>
            <li>
              {this.props.completed ? (
                <span>
                  <i className="fas fa-check-circle"></i>
                </span>
              ) : (
                <span className={classes.number}>2</span>
              )}
              <span className={classes.TabTitle}>Terms of Use</span>
            </li>
            <li>
              {this.props.completed ? (
                <span>
                  <i className="fas fa-check-circle"></i>
                </span>
              ) : (
                <span className={classes.number}>3</span>
              )}
              <span className={classes.TabTitle}>Wallet Key</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TopSection);
