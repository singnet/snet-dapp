import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StarRatingComponent from "react-star-rating-component";

import StyledButton from "../common/StyledButton";
import { useStyles } from "./styles";

class ServiceDetails extends Component {
    state = {};

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24} className={classes.serviceDetailContainer}>
                <Grid item xs={12} sm={12} md={8} lg={8} className={classes.computerVision}>
                    <div>
                        <img src="http://placehold.it/229x129" alt="Image" />
                    </div>
                    <div>
                        <span>computer vision</span>
                        <h2>Colorful Image Colorization</h2>
                        <div>
                            <StarRatingComponent name="rate1" starCount={5} value={3} className={classes.ratingStars} />
                            <span className={classes.ratedCount}>3.0 (1500)</span>
                            <span>API Calls: 5,458,477</span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
                    <div className={classes.creditsAndToken}>
                        <div className={classes.credits}>
                            <span>credits</span>
                            <span>12</span>
                        </div>
                        <span>=</span>
                        <div className={classes.tokens}>
                            <span>agi tokens</span>
                            <span>0.000001</span>
                        </div>
                    </div>
                    <p>
                        <i className="fas fa-info-circle"></i>
                        <span>Fixed price per use</span>
                    </p>
                    <StyledButton btnText="demo" />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(ServiceDetails);
