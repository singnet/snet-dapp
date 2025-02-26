import React, { useState, useEffect, Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import StyledTextField from "../../../../common/StyledTextField";
import RatingsCount from "../../../../common/RatingsCount";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import { serviceActions } from "../../../../../Redux/actionCreators";
import AlertBox from "../../../../common/AlertBox";
import SNETDialog from "../../../../common/SNETDialog";

const UserFeedback = ({ open, handleClose, feedback, submitFeedback, orgId, serviceId, refetchFeedback }) => {
  const [comment, setComment] = useState(feedback.comment);
  const [openSnackbar, setOpenSnackbar] = useState(Boolean(feedback.comment));
  const [count, setCount] = useState(feedback.comment.length);
  const [rating, setRating] = useState(feedback.rating);
  const [alert, setAlert] = useState({ type: "error", message: undefined });
  const classes = useStyles();

  useEffect(() => {
    setComment(feedback.comment);
    setRating(feedback.rating);
    setCount(feedback.comment.length);
  }, [feedback.comment, feedback.rating]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setCount(event.target.value.length);
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
      await refetchFeedback();

      if (response.status === "success") {
        handleClose();
        setOpenSnackbar(true);
      }
    } catch (error) {
      setAlert({ type: "error", message: JSON.stringify(error.message) });
    }
  };

  const shouldSubmitBeEnabled = () => {
    return rating > 0;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handlestartclick = (nextValue, _prevValue, _name) => {
    setRating(nextValue);
  };

  return (
    <Fragment>
      <SNETDialog showCloseButton isDialogOpen={open} onDialogClose={handleCancel} title="Write Your Own Review">
        <div className={classes.ratingConatiner}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={Number(rating)}
            className={classes.ratingStars}
            onStarClick={handlestartclick}
          />
          <RatingsCount ratingGiven={rating} />
        </div>
        <div className={classes.InputWrapper}>
          <StyledTextField
            label="Review"
            value={comment}
            fullWidth
            multiline
            rowsmax="4"
            onChange={handleCommentChange}
            inputProps={{ maxLength: 500 }}
            InputLabelProps={{ shrink: true }}
          />
          <span>{count} / 500 Characters</span>
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <StyledButton type="transparent" btnText="Cancel" onClick={handleCancel} />
        <StyledButton type="blue" btnText="Submit" onClick={handleSubmit} disabled={!shouldSubmitBeEnabled()} />
      </SNETDialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} className={classes.snackbar}>
        <span>Feedback updated successfully</span>
      </Snackbar>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitFeedback: (orgId, serviceId, feedback) => dispatch(serviceActions.submitFeedback(orgId, serviceId, feedback)),
});

export default connect(null, mapDispatchToProps)(UserFeedback);
