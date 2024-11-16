import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import RatingsCount from "../../../../common/RatingsCount";
import CardImg from "../../../../../assets/images/SnetDefaultServiceImage.png";
import SingularityLogo from "../../../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import ServiceAvailabilityToggler from "../ServiceListItem/ServiceAvailabilityToggler";

const StyledCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <Avatar aria-label="recipe" className={classes.avatar} src={props.orgImg || SingularityLogo} />
        <div className={classes.cardHeaderContent}>
          <div className={classes.cardTitle}>
            <span>{props.cardTitle}</span>
          </div>
          <div className={classes.cardSubheader}>
            <span>{props.cardSubheader}</span>
          </div>
        </div>
      </div>
      <CardMedia className={classes.CardMedia} image={props.cardMedia || CardImg} title={props.title} />
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
        <IconButton aria-label="Settings" className={classes.showMore}>
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StyledCard;
