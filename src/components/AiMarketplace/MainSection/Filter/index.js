import React from "react";

import StyledExpansionPanel from "./StyledExpansionPanel.js";

import { useStylesHook } from "./styles";

const Filter = () => {
    const classes = useStylesHook();
    return (
        <div className={classes.filterContainer}>
            <div className={classes.filterResetBtnContainer}>
                <h2 className={classes.h2}>Filters</h2>
                <button className={classes.resetBtn} type="reset" value="Reset">
                    Reset
                </button>
            </div>
            <StyledExpansionPanel />
        </div>
    );
};

export default Filter;
