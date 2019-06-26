import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import { Icon } from "@material-ui/core";

export const ProgressStatusList = {
    IDLE: "idle",
    ACTIVE: "active",
    COMPLETED: "completed",
};

const ProgressSection = ({ progressNumber, progressText, progressStatus }) => {
    const classes = useStyles();

    return (
        <li>
            {progressStatus === ProgressStatusList.COMPLETED ? (
                <span>
                    <Icon className="fas fa-check-circle" />
                </span>
            ) : (
                <span className={classes.number}>{progressNumber}</span>
            )}
            <span className={classes.TabTitle}>{progressText}</span>
        </li>
    );
};

ProgressSection.propTypes = {
    progressNumber: PropTypes.number.isRequired,
    progressText: PropTypes.string.isRequired,
    progressStatus: PropTypes.oneOf(Object.values(ProgressStatusList)),
};

export default ProgressSection;
