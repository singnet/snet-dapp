import React from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import { networks } from "../../../config/Network";
import AlertBox, { alertTypes } from "../AlertBox";
import { useStyles } from "./styles";
import { freeCalls } from "../../../Redux/reducers/ServiceDetailsReducer";

const NetworkChangeOverlay = ({ freeCallsRemaining }) => {
  const classes = useStyles();

  const shouldOverlayBeOpened = async () => {
    return true;
    //update hte network with actuall metamask network
    const network = await new Promise.resolve();
    return freeCallsRemaining <= 0 && network !== networks.MAINNET;
  };

  return (
    <Modal disableBackdropClick open={shouldOverlayBeOpened()}>
      <Card className={classes.card}>
        <AlertBox type={alertTypes.INFO} message="Please switch to mainnet to proceed." />
      </Card>
    </Modal>
  );
};

const mapStateToProps = state => ({
  freeCallsRemaining: freeCalls(state).remaining,
});

export default connect(mapStateToProps)(NetworkChangeOverlay);
