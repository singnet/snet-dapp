import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";

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
        <CardHeader title={<h4>Incorrect Metamask Channel</h4>} />
        <Divider />
        <CardContent>
          <AlertBox type="warning" message="Kindly check the channel which you have set on Metamask. Please switch it to {{channelname}} to continue using the services." />
        </CardContent>
      </Card>
    </Modal>
  );
};

const mapStateToProps = state => ({
  freeCallsRemaining: freeCalls(state).remaining,
});

export default connect(mapStateToProps)(NetworkChangeOverlay);
