import React from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import BulletPoint from "../../../common/BulletPoint";
import AlertBox, { alertTypes } from "../../../common/AlertBox";

const warningMessage = [
  "Your wallet or any wallets you have used will remain in your possession. We do not have any access to your wallet and cannot help you recover wallet keys.",
  `Any remaining ${process.env.REACT_APP_TOKEN_NAME} tokens on your SingularityNET account will remain yours. Your account balance is linked to your wallet and can thus be accessed directly via the third party wallet service you have been using.`,
  "All personal data associated with your account will be deleted from our records.",
];

const resonForLeaving = [
  { label: "I want to create another account", value: " " },
  { label: "I am dissatisfied with the platform", value: " " },
  { label: "There were not enough services", value: " " },
  { label: "It is too difficult to use", value: " " },
  { label: "It is too slow to use", value: " " },
  { label: "Other (Please describe below)", value: " " },
];

const ConfirmDelete = ({ open, handleClose, handleSubmit, error }) => {
  const classes = useStyles();
  const [reasonForLeaving, setReasonForLeaving] = React.useState("");

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
            <div className={classes.inputFieldContainer}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-simple">Help us improve, tell us why you are leaving</InputLabel>
                <Select value={reasonForLeaving} onChange={handleChange} input={<OutlinedInput />}>
                  {resonForLeaving.map((item) => (
                    <MenuItem className={classes.menuItem} key={item.label} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Your feedback matters. Anything else you’d like share "
                multiline
                rows="7"
                variant="outlined"
              />
            </div>
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
