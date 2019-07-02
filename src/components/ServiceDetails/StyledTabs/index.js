import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import AboutService from "../AboutService";
import { useStyles } from "./styles";

class StyledTabs extends Component {
    state = {
        activeTab: 0,
        tabsTitle: ["About", "Install and Run", "Reviews", "Tutorial", "Price Estimator", "Discussion"],
    };

    handleChange() {
        // this.setState({
        //   activeTab: this.state.activeTab + 1
        // })
    }

    render() {
        const { classes } = this.props;
        const { activeTab, tabsTitle } = this.state;

        function TabContainer(props) {
            return (
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    {props.children}
                </Typography>
            );
        }

        return (
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <AppBar position="static" className={classes.tabsHeader}>
                    <Tabs value={activeTab} onChange={this.handleChange}>
                        {tabsTitle.map((title, key) => (
                            <Tab key={key} label={title} />
                        ))}
                    </Tabs>
                </AppBar>
                {activeTab === 0 && <AboutService />}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(StyledTabs);
