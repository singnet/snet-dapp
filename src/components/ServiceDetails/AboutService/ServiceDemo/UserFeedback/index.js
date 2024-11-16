import React, { useState, useEffect, Fragment } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Snackbar from "@mui/material/Snackbar";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import StyledTextField from "../../../../common/StyledTextField";
import RatingsCount from "../../../../common/RatingsCount";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import { serviceActions } from "../../../../../Redux/actionCreators";
import AlertBox from "../../../../common/AlertBox";

const UserFeedback = ({ open, handleClose, feedback, submitFeedback, orgId, serviceId, refetchFeedback }) => {
  const [comment, setComment] = useState(feedback.comment);
  const [openSnackbar, setOpenSnackbar] = useState(feedback.comment);
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
      refetchFeedback();
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
            <div className={classes.ratingConatiner}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
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
                rowsMax="4"
                onChange={handleCommentChange}
                inputProps={{ maxLength: 500 }}
                InputLabelProps={{ shrink: true }}
              />
              <span>{count} / 500 Characters</span>
            </div>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <StyledButton type="transparent" btnText="Cancel" onClick={handleCancel} />
            <StyledButton type="blue" btnText="Submit" onClick={handleSubmit} disabled={!shouldSubmitBeEnabled()} />
          </CardActions>
        </Card>
      </Modal>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} className={classes.snackbar}>
        <spna>Feedback updated successfully</spna>
      </Snackbar>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitFeedback: (orgId, serviceId, feedback) => dispatch(serviceActions.submitFeedback(orgId, serviceId, feedback)),
});

export default connect(null, mapDispatchToProps)(UserFeedback);
