import React from "react";
import { withStyles } from "@material-ui/styles";

import ProgressSection, { ProgressStatusList } from "./ProgressSection";

const useStyles = theme => ({
    tabsContainer: {
        width: 630,
        margin: "40px auto 0",
        "& ul": {
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width:470px)": {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        "& li": {
            listStyle: "none",
            "&:first-of-type": {
                "&::before": {
                    display: "none",
                },
            },
            "&::before": {
                content: '""',
                width: 90,
                height: 1,
                marginRight: 16,
                display: "inline-block",
                backgroundColor: theme.palette.text.gray12,
                verticalAlign: "middle",
                "@media (max-width:724px)": {
                    display: "none",
                },
            },
            "& i": {
                marginRight: 5,
                color: theme.palette.text.green,
                fontSize: 20,
            },
            "@media (max-width:470px)": {
                marginBottom: 20,
            },
        },
        "@media (max-width:724px)": {
            width: "90%",
        },
    },
    active: {
        "& span": {
            "&:first-of-type": { backgroundColor: theme.palette.text.primary },
            "&:last-of-type": { color: "#000" },
        },
    },
});

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
