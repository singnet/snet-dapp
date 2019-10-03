import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import CreateWalletPopup from "./CreateWalletPopup";
import NextAction from "./NextAction";

// TODO channelDetails from wallet
const channel = { balance: 23 };

const GeneralAccountWallet = ({ classes }) => {
  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        <StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
        <NextAction channel={channel} setShowCreateWalletPopup={setShowCreateWalletPopup} />
      </div>
      <CreateWalletPopup open={showCreateWalletPopup} setShowCreateWalletPopup={setShowCreateWalletPopup} />
    </Fragment>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
