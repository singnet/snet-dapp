import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { APIEndpoints } from "../../utility/stringConstants/APIEndpoints";
import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";

import { useStyles } from "./styles";
import Routes from "../../utility/stringConstants/Routes";

class AiMarketplace extends Component {
    state = {
        servicesList: [],
    };

    componentDidMount = () => {
        Auth.currentSession().then(res => {
            console.log("token", res);
            let apiName = APIEndpoints.GET_SERVICES_LIST.name;
            let path = "/org/snet/service";
            API.get(apiName, path)
                .then(res => {
                    this.setState({ servicesList: res.data.result });
                })
                .catch(err => {
                    console.log("service err", err);
                });
        });
    };

    render() {
        const { classes } = this.props;
        const { servicesList } = this.state;
        return (
            <div className={classes.aiMarketPlaceContainer}>
                <div className={classes.mainWrapper}>
                    <Grid container spacing={24} className={classes.topSectionCotainer}>
                        <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
                            <h2 className={classes.title}>AI Marketplace</h2>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} lg={9} className={classes.descriptionContainer}>
                            <p className={classes.description}>
                                Want to find the right AI service for your project? You’ve come to the right place.{" "}
                                We’ve got a growing marketplace with hundreds of AI services for you to utilize. They’re
                                powered by a community of amazing developers from all over the globe.
                            </p>
                            <Link to={Routes.SIGNUP} className={classes.signupLink}>
                                <StyledButton type="blue" btnText="Sign up for free credits" />
                            </Link>
                        </Grid>
                    </Grid>
                    <div>
                        <MainSection servicesList={servicesList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(AiMarketplace);
