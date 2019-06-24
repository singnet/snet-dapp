import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useStyles } from "./styles";

const Filter = () => {
    const classes = useStyles();
    return (
        <div className={classes.filterContainer}>
            <div className={classes.filterResetBtnContainer}>
                <h2 className={classes.h2}>Filters</h2>
                <button className={classes.resetBtn} type="reset" value="Reset">
                    Reset
                </button>
            </div>
            <div>
                <ExpansionPanel className={classes.filterExpansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.filtersHeadingTitle}>Categories</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.filterDetails}>
                        <div className={classes.formCntrlGrup}>
                            <FormControlLabel
                                control={<Checkbox checked={true} value="textAnalysis" />}
                                label="Text Analysis"
                                classes={{
                                    label: classes.checkboxLabel,
                                }}
                            />
                            <span className={classes.count}>23</span>
                        </div>
                        <div className={classes.formCntrlGrup}>
                            <FormControlLabel
                                control={<Checkbox checked={false} value="computerVision" />}
                                label="Computer Vision"
                                classes={{
                                    label: classes.checkboxLabel,
                                }}
                            />
                            <span className={classes.count}>45</span>
                        </div>
                        <div className={classes.formCntrlGrup}>
                            <FormControlLabel
                                control={<Checkbox checked={false} value="deepLearning" />}
                                label="Deep Learning"
                                classes={{
                                    label: classes.checkboxLabel,
                                }}
                            />
                            <span className={classes.count}>14</span>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className={classes.filterExpansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.filtersHeadingTitle}>Price</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.filterDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={false} value="textAnalysis" />}
                            label="Text Analysis"
                            classes={{
                                label: classes.checkboxLabel,
                            }}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className={classes.filterExpansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.filtersHeadingTitle}>Vendors</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.filterDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={false} value="textAnalysis" />}
                            label="Text Analysis"
                            classes={{
                                label: classes.checkboxLabel,
                            }}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
};

export default Filter;
