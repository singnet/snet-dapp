import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import StyledTextField from "../../../../common/StyledTextField";
import RatingsCount from "../../../../common/RatingsCount";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import { serviceActions } from "../../../../../Redux/actionCreators";

const UserFeedback = ({ open, handleClose, feedback, submitFeedback, orgId, serviceId }) => {
  const [review, setReview] = useState(feedback.review);
  const [rating, setRating] = useState(feedback.rating);
  const classes = useStyles();

  const handleReviewChange = event => {
    setReview(event.target.value);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleCancel = () => {
    setReview(feedback.review);
    setRating(feedback.rating);
    handleClose();
  };

  const handleSubmit = () => {
    const feedback = { rating, review };
    submitFeedback(orgId, serviceId, feedback);
  };

  return (
    <Modal open={open}>
      <Card className={classes.card}>
        <CardHeader
          title={<h2>Write Your Own Review</h2>}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <div>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              className={classes.ratingStars}
              onStarClick={handleRatingChange}
            />
            <RatingsCount ratingGiven totalRating />
          </div>
          <StyledTextField
            label="Review"
            value={review}
            fullWidth
            multiline
            rowsMax="4"
            onChange={handleReviewChange}
          />
          <div className={classes.buttonsContainer}>
            <StyledButton type="transparent" btnText="Cancel" onClick={handleCancel} />
            <StyledButton type="blue" btnText="Submit" onClick={handleSubmit} />
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  submitFeedback: (orgId, serviceId, feedback) => dispatch(serviceActions.submitFeedback(orgId, serviceId, feedback)),
});

export default connect(
  null,
  mapDispatchToProps
)(UserFeedback);
