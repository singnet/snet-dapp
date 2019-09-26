import React from "react";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const GeneralAccountWallet = ({ classes }) => (
  <div className={classes.btnsContainer}>
    <StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
    <StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
    <StyledButton
      type="blue"
      btnText="create wallet"
      //    onClick={this.handleCreateWallet}
    />
  </div>
);

export default withStyles(useStyles)(GeneralAccountWallet);
