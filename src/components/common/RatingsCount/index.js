import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const RatingsCount = ({ ratingGiven, totalRating }) => {
  const classes = useStyles();
  return (
    <p className={classes.ratedCount}>
      <span> {parseFloat(ratingGiven).toFixed(1)} </span>
      <span>({totalRating ? `${totalRating}` : 0}) </span>
    </p>
  );
};

RatingsCount.propTypes = {
  ratingGiven: PropTypes.number,
  totalRating: PropTypes.number,
};

export default RatingsCount;
