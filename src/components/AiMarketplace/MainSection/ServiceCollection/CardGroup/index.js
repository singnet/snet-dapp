import React from "react";
import { Link } from "react-router-dom";

import ListViewItem from "./ListViewItem";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";
import Routes from "../../../../../utility/constants/Routes";
import GridViewItem from "./GridViewItem";

const CardGroup = ({ data, listView }) => {
  const classes = useStyles();

  if (listView) {
    return (
      <div className={classes.lisViewCardCollection}>
        {data.map(item => (
          <Link to={`/${Routes.SERVICE_DETAILS}/${item.service_row_id}`} className={classes.routerLink}>
            <ListViewItem
              key={item.service_id}
              cardMedia={CardImg}
              cardTitle={item.org_id}
              cardSubheader={item.display_name}
              ratingGiven={item.service_rating}
              totalRating=""
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
        <Link to={`/${Routes.SERVICE_DETAILS}/${item.service_row_id}`} className={classes.routerLink}>
          <GridViewItem
            key={item.service_id}
            cardMedia={CardImg}
            cardTitle={item.org_id}
            cardSubheader={item.display_name}
            ratingGiven={item.service_rating}
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
