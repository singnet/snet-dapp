import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../AlertBox";
import { useStyles } from "./styles";
import { freeCalls } from "../../../Redux/reducers/ServiceDetailsReducer";

class NetworkChangeOverlay extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    window.addEventListener("snetMMAccountChanged", this.handleMetaMaskChange);
    window.addEventListener("snetMMNetworkChanged", this.handleMetaMaskChange);
  }

  componentWillUnmount() {
    window.removeEventListener("snetMMAccountChanged", this.handleMetaMaskChange);
    window.removeEventListener("snetMMNetworkChanged", this.handleMetaMaskChange);
  }

  shouldOverlayBeOpened = async () => {
    // return true;
    // //update hte network with actuall metamask network
    // const network = await new Promise.resolve();
    // return freeCallsRemaining <= 0 && network !== networks.MAINNET;
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal disableBackdropClick open={this.shouldOverlayBeOpened()}>
        <Card className={classes.card}>
          <CardHeader title={<h4>Incorrect Metamask Network</h4>} />
          <Divider />
          <CardContent>
            <AlertBox
              type="warning"
              message="Kindly check the channel which you have set on Metamask. Please switch it to Mainnet to continue using the services."
            />
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  freeCallsRemaining: freeCalls(state).remaining,
});

export default connect(mapStateToProps)(withStyles(useStyles)(NetworkChangeOverlay));
