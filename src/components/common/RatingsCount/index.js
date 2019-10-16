import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const RatingsCount = ({ ratingGiven, totalRating }) => {
  const classes = useStyles();
  return (
    <span className={classes.ratedCount}>
      {parseFloat(ratingGiven).toFixed(1)} ({totalRating ? `${totalRating}` : 0})
    </span>
  );
};

RatingsCount.propTypes = {
  ratingGiven: PropTypes.number,
  totalRating: PropTypes.number,
};

export default RatingsCount;
