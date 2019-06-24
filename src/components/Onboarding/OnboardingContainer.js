import React, { Fragment } from "react";

import ProgressBar from "./ProgressBar";

const OnboardingContainer = ({ item, classes, active, activeSection }) => {
    if (!active) {
        return null;
    }
    return (
        <Fragment>
            <div className={classes.topSection}>
                <h2>{item.title}</h2>
                <span> {item.description}</span>
            </div>
            <ProgressBar activeSection={activeSection} />
            {item.component}
        </Fragment>
    );
};

export default OnboardingContainer;
