import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import CreateWalletPopup from "./CreateWalletPopup";
import LinkProviderPopup from "./LinkProviderPopup";

const GeneralAccountWallet = ({ classes }) => {
  const [showCreateWalletPopup, showLinkProviderPopup, setShowLinkProviderPopup, setShowCreateWalletPopup] = useState(
    false
  );
  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
        <StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
        {/*<StyledButton type="blue" btnText="create wallet" onClick={() => setShowCreateWalletPopup(true)} /> */}
        <StyledButton type="blue" btnText="link provider" onClick={() => setShowLinkProviderPopup(true)} />
      </div>
      <LinkProviderPopup open={showLinkProviderPopup} handleClose={() => setShowLinkProviderPopup(false)} />
      <CreateWalletPopup open={showCreateWalletPopup} handleClose={() => setShowCreateWalletPopup(false)} />
    </Fragment>
  );
};

export default withStyles(useStyles)(GeneralAccountWallet);
