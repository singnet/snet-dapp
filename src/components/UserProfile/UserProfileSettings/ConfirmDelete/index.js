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
  "Your wallet or any wallets you have used will remain in your possession. We do not have any access to your wallet and cannot help you recover wallet keys.",
  "Any remaining AGI tokens on your SingularityNET account will remain yours. Your account balance is linked to your wallet and can thus be accessed directly via the third party wallet service you have been using.",
  "All personal data associated with your account will be deleted from our records.",
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
