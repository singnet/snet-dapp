import React from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import StarRatingComponent from "react-star-rating-component";

import StyledTextField from "../../../../common/StyledTextField";
import RatingsCount from "../../../../common/RatingsCount";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

const UserFeedback = ({ open, handleClose }) => {
  const classes = useStyles();
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
            <StarRatingComponent name="rate1" starCount={5} value className={classes.ratingStars} />
            <RatingsCount ratingGiven totalRating />
          </div>
          <StyledTextField label="Review Title" fullWidth />
          <StyledTextField label="Review" fullWidth />
          <div className={classes.buttonsContainer}>
            <StyledButton type="transparent" btnText="Cancel" />
            <StyledButton type="blue" btnText="Submit" />
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default UserFeedback;
