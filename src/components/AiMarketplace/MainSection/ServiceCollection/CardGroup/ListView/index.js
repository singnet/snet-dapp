import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { useStyles } from "./styles";

const ListView = props => {
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
              <span className={classes.cardSubheader}>{props.cardSubheader}</span>
              <StarRatingComponent name="rate1" starCount={5} value={3} className={classes.ratingStars} />
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
};

export default ListView;
