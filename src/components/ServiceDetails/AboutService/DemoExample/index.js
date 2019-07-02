import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import ProgressBar from "./ProgressBar";
import { useStyles } from "./styles";

class DemoExample extends Component {
    state = {
        activeSection: 1,
    };

    render() {
        const { classes } = this.props;
        const { activeSection } = this.state;

        return (
            <div className={classes.demoExampleContainer}>
                <h4>Process</h4>
                <ProgressBar activeSection={activeSection} />
                <p>
                    Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You
                    can upload a a file from your computer, URL, or select image from the gallery. You can specify
                    additional parameters in the panel below. “Mouse over” for tool tips.
                </p>
            </div>
        );
    }
}

export default withStyles(useStyles)(DemoExample);
