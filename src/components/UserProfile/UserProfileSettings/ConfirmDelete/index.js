import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";

import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import BulletPoint from "../../../common/BulletPoint";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import StyledDropdown from "@common/StyledDropdown";

const warningMessage = [
  "Your wallet or any wallets you have used will remain in your possession. We do not have any access to your wallet and cannot help you recover wallet keys.",
  `Any remaining ${process.env.REACT_APP_TOKEN_NAME} tokens on your SingularityNET account will remain yours. Your account balance is linked to your wallet and can thus be accessed directly via the third party wallet service you have been using.`,
  "All personal data associated with your account will be deleted from our records.",
];

const reasonsForLeaving = [
  { label: "I want to create another account", value: "0" },
  { label: "I am dissatisfied with the platform", value: "1" },
  { label: "There were not enough services", value: "2" },
  { label: "It is too difficult to use", value: "3" },
  { label: "It is too slow to use", value: "4" },
  { label: "Other (Please describe below)", value: "5" },
];

const ConfirmDelete = ({ open, handleClose, handleSubmit, error }) => {
  const classes = useStyles();
  const [reasonForLeaving, setReasonForLeaving] = useState();

  const handleCancel = () => {
    setReasonForLeaving("");
    handleClose();
  };

  const handleChange = (event) => {
    setReasonForLeaving(event.target.value);
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title="Deleting Your Account"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <h2>We are sad to see you go</h2>
            <p>
              You are about to delete your account forever. Are you sure that is what you want to do? Once you click on
              DELETE MY ACCOUNT you will immediately loose access to all of your account data.
            </p>
            <div className={classes.BeforeYouGoContent}>
              <h2>Before you go...</h2>
              <div className={classes.WarningBoxConatiner}>
                {warningMessage.map((msg) => (
                  <BulletPoint key={msg} type="warning" message={msg} />
                ))}
              </div>
              <AlertBox type={alertTypes.ERROR} message={error} />
            </div>
            <StyledDropdown
              list={reasonsForLeaving}
              value={reasonForLeaving}
              inputLabel="Help us improve, tell us why you are leaving"
              name="resonForLeaving"
              onChange={handleChange}
            />
            <TextField
              label="Your feedback matters. Anything else you’d like share"
              multiline
              rows="7"
              variant="outlined"
            />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="cancel" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="Delete Your Account" type="redBg" onClick={handleSubmit} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
