import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import ServiceListItem from "./ServiceListItem";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";
import GridViewItem from "./GridViewItem";

const CardGroup = ({ data, listView, loading }) => {
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
      <div className={classes.lisViewCardCollection}>
        {data.map(item => (
          <Link
            to={`/${Routes.SERVICE_DETAILS}/${item.service_row_id}`}
            className={classes.routerLink}
            key={item.service_id}
          >
            <ServiceListItem
              cardMedia={JSON.parse(item.assets_url).hero_image ? JSON.parse(item.assets_url).hero_image : CardImg}
              cardTitle={item.org_id}
              cardSubheader={item.display_name}
              ratingGiven={item.service_rating}
              totalRating={item.total_users_rated}
              cardDescription={item.description}
            />
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className={classes.gridViewCardCollection}>
      {data.map(item => (
        <Link
          to={`/${Routes.SERVICE_DETAILS}/${item.service_row_id}`}
          className={classes.routerLink}
          key={item.service_id}
        >
          <GridViewItem
            cardMedia={JSON.parse(item.assets_url).hero_image ? JSON.parse(item.assets_url).hero_image : CardImg}
            cardTitle={item.org_id}
            cardSubheader={item.display_name}
            ratingGiven={item.service_rating}
            totalRating={item.total_users_rated}
            cardDescription={item.description}
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
