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
                  <div className={classes.formCntrlGrup} key={item.key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={expansionItem.name}
                          checked={activeFilterItem[expansionItem.name].includes(item.key)}
                          onChange={handleChange}
                          value={item.key}
                        />
                      }
                      label={item.value}
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
        return <Fragment key={expansionItem.title} />;
      })}
    </Fragment>
  );
};

export default withStyles(useStyles)(StyledExpansionPanel);
