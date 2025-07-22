import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import truncate from "lodash/truncate";

import ServiceListItem from "./ServiceListItem";
import { useStyles } from "./styles";
import Routes from "../../../../utility/constants/Routes";
import GridViewItem from "./GridViewItem";
import { useSelector } from "react-redux";

const maxDescriptionChars = 180;

const CardGroup = ({ listView }) => {
  const classes = useStyles();

  const services = useSelector((state) => state.serviceReducer.services);
  const loading = useSelector((state) => state.loaderReducer.aiServieList);

  const cards = services ? services : [];

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

  const cardPropsGenerate = (card) => {
    return {
      cardMedia: card.serviceImageUrl,
      orgImg: card.orgImageUrl,
      cardTitle: card.displayName,
      cardSubheader: card.organizationName,
      ratingGiven: { rating: card.rating, numberOfRatings: card.numberOfRatings },
      cardDescription: truncate(card.shortDescription, { length: maxDescriptionChars }),
      isAvailable: Boolean(card.isAvailable),
    };
  };

  return (
    <div className={listView ? classes.listViewCardCollection : classes.gridViewCardCollection}>
      {cards.map((card) => {
        const cardProps = cardPropsGenerate(card);

        return (
          <Link
            key={card.orgId + card.serviceId}
            to={`/${Routes.SERVICE_DETAILS}/org/${card.orgId}/service/${card.serviceId}/tab/0`} //TODO
            className={classes.routerLink}
          >
            {listView ? <ServiceListItem {...cardProps} /> : <GridViewItem {...cardProps} />}
          </Link>
        );
      })}
    </div>
  );
};

export default CardGroup;
