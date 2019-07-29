import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { useStyles } from "./styles";
import AlertBox from "../../../common/AlertBox";
import StyledTextField from "../../../common/StyledTextField";
import StyledDropdown from "../../../common/StyledDropdown";
import StyledButton from "../../../common/StyledButton";

const ConfirmDelete = ({ open, handleClose, handleSubmit, list, message, icon: Icon }) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const classes = useStyles();

  const handleReasonChange = event => {
    setReason(event.target.value);
  };

  const handleCancel = () => {
    setReason("");
    setFeedback("");
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
           className={classes.CardHeader}
            title="Delete User"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <h2>Are you sure?</h2>
            <p>Deleting your account will go in affect immediately and you will not longer have access to your account
              data. </p>
            <div className={classes.BeforeYouGoContent}>
              <h2>Before you go...</h2>
              <div className={classes.WarningBoxConatiner}>
                {message.map(msg =>(
                  <div>
                  <Icon />
                    <AlertBox type="warning" message={msg} />
                  </div>
                ))}
              </div>
              <FormControl fullWidth className={classes.formControl}>
                <div className={classes.DropDownContainer}>
                  <span>Reason for deleting your account</span>
                  <StyledDropdown list={list} value={"hey"} labelTxt={"select item"} />
                </div>                  
                <StyledTextField
                  label="Your feedback matters.  Anything else you’d like share"
                  value={feedback}
                  fullWidth
                  multiline
                  rows="4"
                />
              </FormControl>                
            </div>            
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="cancel" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="Delete Your Account" type="redBg" onClick={() => handleSubmit(reason, feedback)} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
