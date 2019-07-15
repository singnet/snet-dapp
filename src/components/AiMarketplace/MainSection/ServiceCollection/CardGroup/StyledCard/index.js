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
import Button from "@material-ui/core/Button";

import OfflineIndicator from "../../../../../common/OfflineIndicator";
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
        subheader={props.cardSubheader}
      ></CardHeader>
      <CardMedia className={classes.CardMedia} image={props.cardMedia} title={props.title}></CardMedia>
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
          <span className={classes.ratedCount}>
            {props.ratingGiven} {props.totalRating}
          </span>
        </div>
        <Typography className={classes.cardTypograpy} component="p">
          {props.cardDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <OfflineIndicator />
        {/*<Button color="primary" className={classes.detailsBtn}>
          deatils
        </Button> */}
        <IconButton aria-label="Settings" className={classes.showMore}>
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StyledCard;
