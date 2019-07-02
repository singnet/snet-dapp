import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

class ProjectDetails extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.projectDetailsContainer}>
                <h3>Project Details</h3>
                <div>
                    <h5>Project URL</h5>
                    <a href="#" alt="URL">
                        singnet.github.io/time-s…
                    </a>
                </div>
                <div>
                    <h5>Latest Version</h5>
                    <p>
                        <a href="#" alt="Version">
                            v1.1.0
                        </a>
                        (last updated 2019-23-04)
                    </p>
                </div>
                <div>
                    <h5>License type</h5>
                    <a href="#" alt="Type">
                        CC BY 4.0
                    </a>
                </div>
                <div className={classes.contributors}>
                    <h5>Contributors</h5>
                    <p>Bolei Zhou, Hang Zhao, Xavier Puig, Tete Xiao, Sanja Fidler</p>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(ProjectDetails);
