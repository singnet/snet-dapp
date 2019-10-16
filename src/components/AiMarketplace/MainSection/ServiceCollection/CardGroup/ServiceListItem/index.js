import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { useStyles } from "./styles";
import RatingsCount from "../../../../../common/RatingsCount";
import CardImg from "../../../../../../assets/images/SnetDefaultServiceImage.png";
import SingularityLogo from "../../../../../../assets/images/avatar.png";
import ServiceAvailabilityToggler from "./ServiceAvailabilityToggler";

const ServiceListItem = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container spacing={24} className={classes.cardItemsContainer}>
        <Grid item xs={12} sm={1} md={1} lg={1} className={classes.mediaContainer}>
          <CardMedia className={classes.CardMedia} image={props.cardMedia || CardImg} title={props.title} />
        </Grid>

        <Grid item xs={12} sm={10} md={10} lg={10}>
          <CardHeader
            className={classes.cardHeader}
            avatar={<Avatar aria-label="recipe" className={classes.avatar} src={props.orgImg || SingularityLogo} />}
            classes={{ title: classes.cardTitle, subheader: classes.cardSubheader }}
            title={<h4>{props.cardTitle}</h4>}
            subheader={props.cardSubheader}
          />

          <CardContent className={classes.cardContent}>
            <div className={classes.ratingSection}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={Number(props.ratingGiven.rating)}
                className={classes.ratingStars}
              />
              <RatingsCount ratingGiven={props.ratingGiven.rating} totalRating={props.ratingGiven.total_users_rated} />
            </div>
            <Typography className={classes.cardTypograpy} component="p">
              {props.cardDescription}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <ServiceAvailabilityToggler isAvailable={props.isAvailable} />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ServiceListItem;
