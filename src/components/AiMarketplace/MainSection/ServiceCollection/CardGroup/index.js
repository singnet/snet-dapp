import React from "react";

import ListView from "./ListView";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";

const CardGroup = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardCollection}>
      {data.map(item => (
        <ListView
          key={item.service_id}
          cardMedia={CardImg}
          cardTitle={item.org_id}
          cardSubheader={item.display_name}
          ratingGiven=""
          totalRating=""
          cardDescription={item.description}
        />
      ))}
    </div>
  );
};

CardGroup.defaultProps = {
  data: [],
};

export default CardGroup;
