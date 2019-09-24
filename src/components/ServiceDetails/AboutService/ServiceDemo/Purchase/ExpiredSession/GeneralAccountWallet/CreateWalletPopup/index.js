import React from "react";
import { withStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import ProgressBar from "../../../../../../../common/ProgressBar";
import StyledButton from "../../../../../../../common/StyledButton";
import StyledDropdown from "../../../../../../../common/StyledDropdown";

import { useStyles } from "./styles";

const CreateWalletPopup = ({ classes, handleClose, open }) => {

	const handleCancel = () => {
    handleClose();
  };

	return (
		<div className={classes.generalAccWalletContainer}>
			<Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title="Create General Account Wallet"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="cancel" type="transparent" />
            <StyledButton btnText="Continue" type="blue"/>
          </CardActions>
        </Card>
      </Modal>
		</div>
	);
}

export default withStyles(useStyles)(CreateWalletPopup);
