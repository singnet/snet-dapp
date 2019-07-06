import React, { Fragment } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const StyledExpansionPanel = ({ classes, expansionData }) => {
  return (
    <Fragment>
      {expansionData.map(val => (
        <ExpansionPanel className={classes.filterExpansionPanel} key={val.title}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.filtersHeadingTitle}>{val.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.filterDetails}>
            {val.items.map(item => (
              <div className={classes.formCntrlGrup} key={item.title}>
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
};

export default withStyles(useStyles)(StyledExpansionPanel);
