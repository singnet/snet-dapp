import React from "react";

import StarRatingComponent from "react-star-rating-component";

// Material UI imports
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  card: {
    width: 302,
    padding: "13px 0",
    margin: "0 20px 20px 0",
    display: "inline-block"
  },
  cardHeader: {
    padding: "0 18px"
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: theme.typography.primary.main
  },
  cardSubheader: {
    color: "rgba(0,0,0,.87)",
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: 0.25,
    fontFamily: theme.typography.primary.main
  },
  CardMedia: {
    height: 175,
    margin: "5px 0 13px"
  },
  cardContent: { padding: "0 13px" },
  cardTypograpy: {
    color: "rgba(0,0,0,0.6)",
    fontFamily: theme.typography.secondary.main,
    fontSize: 14,
    lineHeight: "20px"
  },
  cardActions: {
    padding: "16px 13px 0",
    justifyContent: "space-between"
  },
  detailsBtn: {
    padding: 0,
    fontFamily: theme.typography.primary.main,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "1.25px",
    color: theme.palette.primary.main
  },
  showMore: {
    padding: 0,
    margin: 0
  },
  ratedCount: {
    marginLeft: 10,
    display: "inline-block",
    color: theme.palette.secondary.main,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    verticalAlign: "super"
  }
}));

function StyledCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        classes={{
          title: classes.cardTitle,
          subheader: classes.cardSubheader
        }}
        title={props.cardTitle}
        subheader={props.cardSubheader}
      ></CardHeader>
      <CardMedia
        className={classes.CardMedia}
        image={props.cardMedia}
        title={props.title}
      ></CardMedia>
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
        <Button color="primary" className={classes.detailsBtn}>
          deatils
        </Button>
        <IconButton aria-label="Settings" className={classes.showMore}>
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default StyledCard;
