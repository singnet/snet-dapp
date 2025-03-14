import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const RatingsCount = ({ ratingGiven, totalRating }) => {
  const classes = useStyles();

  return (
    <p className={classes.ratedCount}>
      <span> {ratingGiven ? parseFloat(ratingGiven).toFixed(1) : 0} </span>
      <span>({totalRating ? `${totalRating}` : 0}) </span>
    </p>
  );
};

RatingsCount.propTypes = {
  ratingGiven: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RatingsCount;
