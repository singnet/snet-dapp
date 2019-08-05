import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import ServiceListItem from "./ServiceListItem";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";
import ServiceGridItem from "./ServiceGridItem";

const CardGroup = ({ services, loading, listView }) => {
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
  if (listView) {
    return (
      <div className={classes.cardCollection}>
        {services.map(service => (
          <Link
            key={service.service_row_id}
            to={`/${Routes.SERVICE_DETAILS}/${service.service_row_id}`}
            className={classes.routerLink}
          >
            <ServiceListItem
              cardMedia={
                JSON.parse(service.assets_url).hero_image ? JSON.parse(service.assets_url).hero_image : CardImg
              }
              cardTitle={service.org_id}
              cardSubheader={service.display_name}
              ratingGiven={service.service_rating}
              totalRating={service.total_users_rated}
              cardDescription={service.description}
            />
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className={classes.cardCollection}>
      {services.map(service => (
        <Link
          key={service.service_row_id}
          to={`/${Routes.SERVICE_DETAILS}/${service.service_row_id}`}
          className={classes.routerLink}
        >
          <ServiceGridItem
            cardMedia={JSON.parse(service.assets_url).hero_image ? JSON.parse(service.assets_url).hero_image : CardImg}
            cardTitle={service.org_id}
            cardSubheader={service.display_name}
            ratingGiven={service.service_rating}
            totalRating={service.total_users_rated}
            cardDescription={service.description}
          />
        </Link>
      ))}
    </div>
  );
};

CardGroup.defaultProps = {
  services: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.aiServieList,
});

export default connect(mapStateToProps)(CardGroup);
