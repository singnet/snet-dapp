import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import StyledButton from "../../../../../common/StyledButton";
import { useStyles } from "./styles";

const ServiceListItem = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container spacing={24} className={classes.cardItemsContainer}>
        <Grid item xs={12} sm={1} md={1} lg={1} className={classes.mediaContainer}>
          <CardMedia className={classes.CardMedia} image={props.cardMedia} title={props.title} />
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <CardHeader
            className={classes.cardHeader}
            classes={{
              title: classes.cardTitle,
            }}
            title={props.cardTitle}
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.ratingSection}>
              <h4 className={classes.cardSubheader}>{props.cardSubheader}</h4>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={props.ratingGiven}
                className={classes.ratingStars}
              />
              <span className={classes.ratedCount}>
                {parseFloat(props.ratingGiven).toFixed(1)} ({props.totalRating})
              </span>
            </div>
            <Typography className={classes.cardTypograpy} component="p">
              {props.cardDescription}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={1} md={1} lg={1}>
          <CardActions className={classes.cardActions}>
            <StyledButton type="transparent" btnText="demo" />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ServiceListItem;
