import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import truncate from "lodash/truncate";

import ServiceListItem from "./ServiceListItem";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";
import GridViewItem from "./GridViewItem";

const maxDescriptionChars = 180;

const CardGroup = ({ data: cards, listView, loading }) => {
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
  if (cards.length === 0) {
    return (
      <div className={classes.NoResultContainer}>
        <span>No results to be displayed.</span>
        <span>Try different keywords or filters</span>
      </div>
    );
  }
  if (listView) {
    return (
      <div className={classes.lisViewCardCollection}>
        {cards.map(card => (
          <Link
            to={`/${Routes.SERVICE_DETAILS}/org/${card.org_id}/service/${card.service_id}`}
            className={classes.routerLink}
            key={card.service_id}
          >
            <ServiceListItem
              cardMedia={card.assets_url.hero_image}
              orgImg={card.org_assets_url.hero_image}
              cardTitle={card.display_name}
              cardSubheader={card.organization_name}
              ratingGiven={card.service_rating}
              totalRating={card.total_users_rated}
              cardDescription={truncate(card.short_description, { length: maxDescriptionChars })}
              isAvailable={Boolean(card.is_available)}
            />
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className={classes.gridViewCardCollection}>
      {cards.map(card => (
        <Link
          key={card.service_row_id}
          to={`/${Routes.SERVICE_DETAILS}/org/${card.org_id}/service/${card.service_id}`}
          className={classes.routerLink}
        >
          <GridViewItem
            cardMedia={card.assets_url.hero_image}
            orgImg={card.org_assets_url.hero_image}
            cardTitle={card.display_name}
            cardSubheader={card.organization_name}
            ratingGiven={card.service_rating}
            totalRating={card.total_users_rated}
            cardDescription={truncate(card.short_description, { length: maxDescriptionChars })}
            isAvailable={Boolean(card.is_available)}
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
