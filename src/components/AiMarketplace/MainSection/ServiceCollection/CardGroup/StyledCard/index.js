import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import StyledButton from "../../../../../common/StyledButton";
import RatingsCount from "../../../../../common/RatingsCount";
import { useStyles } from "./styles";

const StyledCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        classes={{
          title: classes.cardTitle,
          subheader: classes.cardSubheader,
        }}
        title={props.cardTitle}
        subheader={<h4>{props.cardSubheader}</h4>}
      />
      <CardMedia className={classes.CardMedia} image={props.cardMedia} title={props.title} />
      <CardContent className={classes.cardContent}>
        <div className={classes.ratingSection}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={3}
            starColor={"#FFC200"}
            emptyStarColor={"rgba(161,163,168,0.35)"}
            className={classes.ratingStars}
          />
          <RatingsCount ratingGiven={props.ratingGiven} totalRating={totalRating} />
          <span className={classes.ratedCount}>
            {props.ratingGiven} {props.totalRating}
          </span>
        </div>
        <Typography className={classes.cardTypograpy} component="p">
          {props.cardDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <StyledButton type="transparent" btnText="demo" />
        <IconButton aria-label="Settings" className={classes.showMore}>
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StyledCard;
