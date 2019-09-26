import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import CreateWalletPopup from "./CreateWalletPopup";

const GeneralAccountWallet = ({ classes }) => {
  const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);
  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        <StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
        <StyledButton type="blue" btnText="create wallet" onClick={() => setShowCreateWalletPopup(true)} />
      </div>
      <CreateWalletPopup open={showCreateWalletPopup} handleClose={() => setShowCreateWalletPopup(false)} />
    </Fragment>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
