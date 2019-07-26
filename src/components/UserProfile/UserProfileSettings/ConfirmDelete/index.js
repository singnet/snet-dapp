import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { useStyles } from "./styles";
import AlertBox from "../../../common/AlertBox";
import StyledTextField from "../../../common/StyledTextField";
import StyledButton from "../../../common/StyledButton";

const ConfirmDelete = ({ open, handleClose, handleSubmit }) => {
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
      <Modal open={open} onClose={handleCancel}>
        <Card className={classes.card}>
          <CardHeader
            title="Delete User"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <strong>Are you sure?</strong>
            <p>
              Deleting your account will go in affect immediately and you will not longer have access to your account
              data.
            </p>
            <AlertBox
              message={`Deleting your account will go in affect immediately and you will not longer have access to your account data.
               \n Your remaining AGI tokens will remain in your wallet for you manage with your  3rd party wallet service. 
               \n Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ermentum dictum placerat nec`}
            />
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="outlined-reason-native-simple">Reason</InputLabel>
              <Select
                native
                displayEmpty
                value={reason}
                onChange={handleReasonChange}
                input={<OutlinedInput name="age" id="outlined-reason-native-simple" />}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <StyledTextField
              label="Your feedback matters.  Anything else you’d like share"
              value={feedback}
              fill
              multiline
              rows="4"
            />
            <div className={classes.btnContainer}>
              <StyledButton btnText="cancel" type="transparent" onClick={handleCancel} />
              <StyledButton btnText="Delete Your Account" type="red" onClick={() => handleSubmit(reason, feedback)} />
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
