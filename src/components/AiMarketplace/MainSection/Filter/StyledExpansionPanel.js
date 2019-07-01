import React, { Component, Fragment } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

class StyledExpansionPanel extends Component {
  state = {
    expansionData: [
      {
        title: "Categories",
        items: [
          {
            title: "Text Analysis",
            count: "25",
          },
          {
            title: "Computer Vision",
            count: "21",
          },
          {
            title: "Deep Learning",
            count: "17",
          },
        ],
      },
      {
        title: "Price",
        items: [
          {
            title: "Machine Learning",
            count: "29",
          },
          {
            title: "Sentiments Analysis",
            count: "18",
          },
          {
            title: "Microservices",
            count: "18",
          },
        ],
      },
      {
        title: "Vendors",
        items: [
          {
            title: "Time Series",
            count: "17",
          },
          {
            title: "Utilities",
            count: "18",
          },
        ],
      },
    ],
  };

  render() {
    const { classes } = this.props;
    const { expansionData } = this.state;

    return (
      <Fragment>
        {expansionData.map(val => (
          <ExpansionPanel className={classes.filterExpansionPanel}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.filtersHeadingTitle}>{val.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.filterDetails}>
              {val.items.map(item => (
                <div className={classes.formCntrlGrup}>
                  <FormControlLabel
                    control={<Checkbox checked={true} value="textAnalysis" />}
                    label={item.title}
                    classes={{
                      label: classes.checkboxLabel,
                    }}
                  />
                  <span className={classes.count}>{item.count}</span>
                </div>
              ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(StyledExpansionPanel);
