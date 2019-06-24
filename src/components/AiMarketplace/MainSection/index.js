import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import Filter from "./Filter";
import ServiceCollection from "./ServiceCollection";

const useStyles = theme => ({
    mainSection: {
        padding: "40px 0 60px",
    },
});

class MainSection extends Component {
    render() {
        const { classes, servicesList } = this.props;
        return (
            <Grid container spacing={24} className={classes.mainSection}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Filter />
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}>
                    <ServiceCollection data={servicesList} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(MainSection);
