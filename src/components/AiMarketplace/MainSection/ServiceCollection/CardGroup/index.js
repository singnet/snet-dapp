import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import ServiceListItem from "./ServiceListItem";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";

const CardGroup = ({ cards, loading }) => {
  const classes = useStyles();
  if (loading) {
    return (
      <div className={classes.circularProgressContainer}>
        <div className={classes.loaderChild}>
          <CircularProgress className={classes.circularProgress} />
          <p className={classes.loaderText}>LOADING AI..</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.cardCollection}>
      {cards.map(card => (
        <Link
          key={card.service_row_id}
          to={`/${Routes.SERVICE_DETAILS}/${card.service_row_id}`}
          className={classes.routerLink}
        >
          <ServiceListItem
            key={card.service_id}
            cardMedia={JSON.parse(card.assets_url).hero_image ? JSON.parse(card.assets_url).hero_image : CardImg}
            cardTitle={card.org_id}
            cardSubheader={card.display_name}
            ratingGiven={card.service_rating}
            totalRating={card.total_users_rated}
            cardDescription={card.description}
          />
        </Link>
      ))}
    </div>
  );
};

CardGroup.defaultProps = {
  cards: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.aiServieList,
});

export default connect(mapStateToProps)(CardGroup);
