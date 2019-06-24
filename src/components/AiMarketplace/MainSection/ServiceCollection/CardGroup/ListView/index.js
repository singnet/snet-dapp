import React from "react";

import StarRatingComponent from "react-star-rating-component";

// Material UI imports
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  cardItemsContainer: {
    flexWrap: "nowrap"
  },
  card: {
    width: "100%",
    padding: "10px 20px 10px 15px",
    display: "flex",
    alignItems: "center",
    boxShadow: "none",
    backgroundColor: theme.palette.text.gray8,
    "&:nth-child(2n)": {
      borderTop: 1,
      borderBottom: 1,
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopColor: theme.palette.text.gray13,
      borderBottomColor: theme.palette.text.gray13,
      borderRadius: 4,
      backgroundColor: theme.palette.text.white
    }
  },
  mediaContainer: {
    maxWidth: "100% !important"
  },
  CardMedia: {
    width: 214,
    height: 120
  },
  cardHeader: {
    padding: "0 18px"
  },
  cardTitle: {
    fontWeight: theme.typography.fontweight,
    fontSize: 12,
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: theme.typography.primary.main
  },
  cardSubheader: {
    color: theme.palette.text.black1,
    fontWeight: theme.typography.fontweight,
    fontSize: 20,
    letterSpacing: 0.25,
    fontFamily: theme.typography.primary.main
  },
  cardContent: { padding: "0 13px" },
  cardTypograpy: {
    marginTop: 5,
    color: theme.palette.text.gray2,
    fontFamily: theme.typography.secondary.main,
    fontSize: 14,
    lineHeight: "20px"
  },
  demoBtn: {
    padding: "0 30px 0 0",
    fontFamily: theme.typography.primary.main,
    fontSize: 14,
    fontWeight: theme.typography.fontweight,
    letterSpacing: "1.25px",
    color: theme.palette.text.primary
  },
  showMore: {
    padding: 0,
    margin: 0
  },
  ratedCount: {
    marginLeft: 10,
    display: "inline-block",
    color: theme.palette.text.secondary,
    fontSize: 12,
    fontWeight: theme.typography.fontweight,
    letterSpacing: 2,
    verticalAlign: "super"
  }
}));

function ListView(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container spacing={24} className={classes.cardItemsContainer}>
        {/* <Grid item xs={12} sm={1} md={1} lg={1} className={classes.mediaContainer}>
          <CardMedia
            className={classes.CardMedia}
            image={props.cardMedia}
            title={props.title}
          />
        </Grid> */}
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <CardHeader
            className={classes.cardHeader}
            classes={{
              title: classes.cardTitle
            }}
            title={props.cardTitle}
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.ratingSection}>
              <span className={classes.cardSubheader}>
                {props.cardSubheader}
              </span>
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
        </Grid>
        <Grid item xs={12} sm={1} md={1} lg={1}>
          <CardActions className={classes.cardActions}>
            <Button color="primary" className={classes.demoBtn}>
              demo
            </Button>
            <IconButton aria-label="Settings" className={classes.showMore}>
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ListView;
