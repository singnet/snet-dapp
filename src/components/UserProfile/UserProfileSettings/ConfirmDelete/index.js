import React from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import BulletPoint from "../../../common/BulletPoint";
import AlertBox, { alertTypes } from "../../../common/AlertBox";

const warningMessage = [
  "Your wallet or any wallets you have used will remain in your possession. We do not have any access to your wallet and cannot help you recover wallet keys.",
  "Any remaining AGI tokens on your SingularityNET account will remain yours. Your account balance is linked to your wallet and can thus be accessed directly via the third party wallet service you have been using.",
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

  const handleCancel = () => {
    handleClose();
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
                {warningMessage.map(msg => (
                  <BulletPoint key={msg} type="warning" message={msg} />
                ))}
              </div>
              <AlertBox type={alertTypes.ERROR} message={error} />
            </div>
            <div className={classes.inputFieldContainer}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-simple">Help us improve, tell us why you are leaving</InputLabel>
                <Select
                  value={"Help us improve, tell us why you are leaving"}
                  input={<OutlinedInput labelWidth={320} name="age" id="outlined-age-simple" />}
                >
                  {resonForLeaving.map(item => (
                    <MenuItem className={classes.menuItem} key={item.value} value={item.value}>
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
