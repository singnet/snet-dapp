import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import CreateWalletPopup from "./CreateWalletPopup";
import NextAction from "./NextAction";
import { channelInfo } from "../../../../../../../Redux/reducers/UserReducer";

const GeneralAccountWallet = ({ classes, channelInfo }) => {
  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        <StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
        <NextAction channel={channelInfo} setShowCreateWalletPopup={setShowCreateWalletPopup} />
      </div>
      <CreateWalletPopup open={showCreateWalletPopup} setShowCreateWalletPopup={setShowCreateWalletPopup} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  channelInfo: channelInfo(state),
});

export default connect(mapStateToProps)(withStyles(useStyles)(GeneralAccountWallet));
