import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import StyledTextField from "../../../../common/StyledTextField";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import { serviceActions } from "../../../../../Redux/actionCreators";
import AlertBox from "../../../../common/AlertBox";

const UserFeedback = ({ open, handleClose, feedback, submitFeedback, orgId, serviceId, refetchFeedback }) => {
  const [comment, setComment] = useState(feedback.comment);
  const [rating, setRating] = useState(feedback.rating);
  const [alert, setAlert] = useState({ type: "error", message: undefined });
  const classes = useStyles();

  useEffect(() => {
    setComment(feedback.comment);
    setRating(feedback.rating);
  }, [feedback.comment, feedback.rating]);

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleCancel = () => {
    setComment(feedback.comment);
    setRating(feedback.rating);
    setAlert({ type: "error", message: undefined });
    handleClose();
  };

  const handleSubmit = async () => {
    setAlert({ type: "error", message: undefined });
    const feedback = { rating, comment };
    try {
      const response = await submitFeedback(orgId, serviceId, feedback);
      refetchFeedback();
      if (response.status === "success") {
        setAlert({ type: "success", message: "feedback updated successfully" });
      }
    } catch (error) {
      setAlert({ type: "error", message: JSON.stringify(error.message) });
    }
  };

  const shouldSubmitBeEnabled = () => {
    return rating !== feedback.rating || comment !== feedback.comment;
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={<h2>Write Your Own Review</h2>}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.RatingConatiner}>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              className={classes.ratingStars}
              onStarClick={handleRatingChange}
            />
          </div>
          <div className={classes.InputWrapper}>
            <StyledTextField
              label="Review Title"
              value={comment}
              fullWidth
              multiline
              rowsMax="4"
              onChange={handleCommentChange}
              className={classes.ReviewTitle}
            />
            <StyledTextField
              label="Review"
              value={comment}
              fullWidth
              multiline
              rowsMax="4"
              onChange={handleCommentChange}
            />
          </div>
          <AlertBox type={alert.type} message={alert.message} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <StyledButton type="transparent" btnText="Cancel" onClick={handleCancel} />
          <StyledButton type="blue" btnText="Submit" onClick={handleSubmit} disabled={!shouldSubmitBeEnabled()} />
        </CardActions>
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
