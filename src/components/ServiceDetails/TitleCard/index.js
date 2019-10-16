import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StarRatingComponent from "react-star-rating-component";
import Avatar from "@material-ui/core/Avatar";

import CardImg from "../../../assets/images/SnetDefaultServiceImage.png";
import { useStyles } from "./styles";
import RatingsCount from "../../common/RatingsCount";
import SingularityLogo from "../../../assets/images/avatar.png";
import Typography from "@material-ui/core/Typography";

const TitleCard = ({ classes, display_name, star_rating, organizationName, serviceImg, orgImg, totalRating }) => {
  return (
    <Grid item xs={12} sm={12} md={8} lg={8} className={classes.computerVisionContainer}>
      <div className={classes.titleImg}>
        <img src={serviceImg || CardImg} alt="service" width={229} height={129} />
      </div>

      <div className={classes.computerVisionContent}>
        <div className={classes.serviceCreatorDetails}>
          <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
          <div className={classes.companyName}>
            <p className={classes.providersName}>Provider</p>
            <Typography variant="h4" display="block">
              {organizationName}
            </Typography>
          </div>
        </div>

        <h2>{display_name}</h2>

        <div>
          <StarRatingComponent name="rate1" starCount={5} value={star_rating} className={classes.ratingStars} />
          <RatingsCount ratingGiven={star_rating} totalRating={totalRating} />
        </div>
      </div>
    </Grid>
  );
};

export default withStyles(useStyles)(TitleCard);
