import React from "react";
import { withStyles } from "@material-ui/styles";

import ProgressSection, { ProgressStatusList } from "./ProgressSection";
import { useStyles } from "./styles";

const ProgressBar = ({ classes, activeSection }) => {
    const computeProgressStatus = (progressNumber, activeSection) => {
        if (progressNumber < activeSection) {
            return ProgressStatusList.COMPLETED;
        } else if (progressNumber === activeSection) {
            return ProgressStatusList.ACTIVE;
        } else if (progressNumber > activeSection) {
            return ProgressStatusList.IDLE;
        }
    };

    return (
        <div className={classes.tabsContainer}>
            <ul>
                <ProgressSection
                    progressNumber={1}
                    progressText="Authentication"
                    progressStatus={computeProgressStatus(1, activeSection)}
                />
                <ProgressSection
                    progressNumber={2}
                    progressText="Terms of use"
                    progressStatus={computeProgressStatus(2, activeSection)}
                />
                <ProgressSection
                    progressNumber={3}
                    progressText="Wallet key"
                    progressStatus={computeProgressStatus(3, activeSection)}
                />
            </ul>
        </div>
    );
};

export default withStyles(useStyles)(ProgressBar);
