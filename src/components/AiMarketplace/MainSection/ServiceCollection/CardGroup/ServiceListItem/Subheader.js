import React from "react";
import StarRatingComponent from "react-star-rating-component";

import RatingsCount from "../../../../../common/RatingsCount";

const Subheader = ({ classes, cardSubheader, ratingGiven, totalRating }) => {
  return (
    <div>
      {cardSubheader}
      <div className={classes.ratingSection}>
        <StarRatingComponent name="rate1" starCount={5} value={Number(ratingGiven)} className={classes.ratingStars} />
        <RatingsCount ratingGiven={ratingGiven} totalRating={totalRating} />
      </div>
    </div>
  );
};

export default Subheader;
