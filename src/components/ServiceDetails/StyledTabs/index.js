import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

class StyledTabs extends Component {
    state = {
        value: 0,
    };

    handleChange() {
        // this.setState({
        //   value: this.state.value + 1
        // })
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

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
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="About" />
                        <Tab label="Install and Run" />
                        <Tab label="Reviews" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(StyledTabs);
