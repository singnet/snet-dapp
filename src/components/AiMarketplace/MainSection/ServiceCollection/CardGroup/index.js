import React from "react";
import { Link } from "react-router-dom";

import ServiceListItem from "./ServiceListItem";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";

const CardGroup = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardCollection}>
      {data.map(item => (
        <Link to={`/${Routes.SERVICE_DETAILS}/${item.service_row_id}`} className={classes.routerLink}>
          <ServiceListItem
            key={item.service_id}
            cardMedia={CardImg}
            cardTitle={item.org_id}
            cardSubheader={item.display_name}
            ratingGiven=""
            totalRating=""
            cardDescription={item.description}
          />
        </Link>
      ))}
    </div>
  );
};

CardGroup.defaultProps = {
  data: [],
};

export default CardGroup;
