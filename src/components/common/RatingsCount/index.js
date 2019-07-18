import React from "react";

import { useStyles } from "./styles";

const RatingsCount = ({ ratingGiven, totalRating }) => {
  const classes = useStyles();
  return (
    <span className={classes.ratedCount}>
      {parseFloat(ratingGiven).toFixed(1)} {totalRating ? `(${totalRating})` : null}
    </span>
  );
};

export default RatingsCount;
