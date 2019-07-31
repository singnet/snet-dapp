import React from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import BulletPoint from "../../../common/BulletPoint";
import AlertBox, { alertTypes } from "../../../common/AlertBox";

const warningMessage = [
  "Your wallet or any wallets you have used are always yours.  We do not have any connection to your wallet and cannot help you recover wallet keys for you. ",
  "Your remaining AGI tokens will remain in your wallet for you manage with your  3rd party wallet service.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ermentum dictum placerat nec",
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
            title="Delete User"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <h2>Are you sure?</h2>
            <p>
              Deleting your account will go in affect immediately and you will not longer have access to your account
              data.{" "}
            </p>
            <div className={classes.BeforeYouGoContent}>
              <h2>Before you go...</h2>
              <div className={classes.WarningBoxConatiner}>
                {warningMessage.map(msg => (
                  <BulletPoint key={msg} type="warning" message={msg} />
                ))}
              </div>
              {/* <FormControl fullWidth className={classes.formControl}>
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
              </FormControl> */}
              <AlertBox type={alertTypes.ERROR} message={error} />
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
