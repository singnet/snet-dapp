import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";

import VerifyKey from "./VerifyKey";
import PopupDetails from "../PopupDetails";

import { useStyles } from "./styles";

class LinkProviderPopup extends Component {
  state = {
    progressText: ["Verify Key", "Details", "Purchase", "Summary"],
    activeSection: 1,
  };

  handleCancel = () => {
    this.props.handleClose();
  };

  render() {
    const { classes, open } = this.props;
    const { progressText, activeSection } = this.state;

    const PopupProgressBarComponents = [{ component: <VerifyKey /> }];

    return (
      <div className={classes.generalAccWalletContainer}>
        <Modal open={open} onClose={this.handleCancel} className={classes.Modal}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.CardHeader}
              title="Link Provider to General Account Wallet"
              action={
                <IconButton onClick={this.handleCancel}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent className={classes.CardContent}>
              {PopupProgressBarComponents.map((item, index) => (
                <PopupDetails
                  item={item}
                  key={item}
                  active={activeSection === index + 1}
                  activeSection={activeSection}
                  progressText={progressText}
                />
              ))}
            </CardContent>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles)(LinkProviderPopup);
