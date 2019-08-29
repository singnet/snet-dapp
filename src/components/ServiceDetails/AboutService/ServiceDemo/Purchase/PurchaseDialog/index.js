import React from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";

import { useStyles } from "./styles";
import MetamaskDetails from "../../../../../UserProfile/UserProfileAccount/MetamaskDetails";

const PurchaseDialog = ({ classes, show, onClose }) => {
  return (
    <Dialog onClose={onClose} open={show} className={classes.dialogBox}>
      <MetamaskDetails />
    </Dialog>
  );
};

export default withStyles(useStyles)(PurchaseDialog);
