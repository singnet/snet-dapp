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
      cardMedia: card.media.url,
      orgImg: card.org_assets_url.hero_image,
      cardTitle: card.display_name,
      cardSubheader: card.organization_name,
      ratingGiven: card.service_rating,
      cardDescription: truncate(card.short_description, { length: maxDescriptionChars }),
      isAvailable: Boolean(card.is_available),
    };
  };

  return (
    <div className={listView ? classes.listViewCardCollection : classes.gridViewCardCollection}>
      {cards.map((card) => {
        const cardProps = cardPropsGenerate(card);

        return (
          <Link
            key={card.org_id + card.service_id}
            to={`/${Routes.SERVICE_DETAILS}/org/${card.org_id}/service/${card.service_id}/tab/0`} //TODO
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
