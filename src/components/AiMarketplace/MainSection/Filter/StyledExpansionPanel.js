import React, { Fragment } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const StyledExpansionPanel = ({ classes, expansionItems, handleChange, activeFilterItem }) => {
  return (
    <Fragment>
      {expansionItems.map(expansionItem => {
        if (expansionItem.items.length > 0) {
          return (
            <ExpansionPanel className={classes.filterExpansionPanel} key={expansionItem.title}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.filtersHeadingTitle}>{expansionItem.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.filterDetails}>
                {expansionItem.items.map(item => (
                  <div className={classes.formCntrlGrup} key={item.title}>
                    <FormControlLabel
                      control={
                        <Radio
                          name={expansionItem.name}
                          checked={item.title === activeFilterItem[expansionItem.name]}
                          onChange={handleChange}
                          value={item.title}
                        />
                      }
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
          );
        }
        return null;
      })}
    </Fragment>
  );
};

export default withStyles(useStyles)(StyledExpansionPanel);
