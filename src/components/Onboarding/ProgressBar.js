import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

//  import internal components
import ProgressSection, { ProgressStatusList } from "./ProgressSection";

const useStyles = theme => ({
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
        marginRight: 5,
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
  computeProgressStatus = (progressNumber, activeSection) => {
    if (progressNumber < activeSection) {
      return ProgressStatusList.COMPLETED;
    } else if (progressNumber === activeSection) {
      return ProgressStatusList.ACTIVE;
    } else if (progressNumber > activeSection) {
      return ProgressStatusList.IDLE;
    }
  };
  render() {
    const { classes, activeSection } = this.props;
    return (
      <div className={classes.tabsContainer}>
        <ul>
          <ProgressSection
            progressNumber={1}
            progressText="Authentication"
            progressStatus={this.computeProgressStatus(1, activeSection)}
          />
          <ProgressSection
            progressNumber={2}
            progressText="Terms of use"
            progressStatus={this.computeProgressStatus(2, activeSection)}
          />
          <ProgressSection
            progressNumber={3}
            progressText="Wallet key"
            progressStatus={this.computeProgressStatus(3, activeSection)}
          />
        </ul>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProgressBar);
