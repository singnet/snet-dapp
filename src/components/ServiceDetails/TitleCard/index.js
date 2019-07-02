import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StarRatingComponent from "react-star-rating-component";

import { useStyles } from "./styles";

class TitleCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.computerVisionContainer}>
        <div>
          <img src="http://placehold.it/229x129" alt="Image" />
        </div>
        <div className={classes.computerVisionContent}>
          <span>computer vision</span>
          <h2>Colorful Image Colorization</h2>
          <div>
            <StarRatingComponent name="rate1" starCount={5} value={3} className={classes.ratingStars} />
            <span className={classes.ratedCount}>3.0 (1500)</span>
            <span className={classes.apiCall}>API Calls: 5,458,477</span>
          </div>
        </div>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(TitleCard);
