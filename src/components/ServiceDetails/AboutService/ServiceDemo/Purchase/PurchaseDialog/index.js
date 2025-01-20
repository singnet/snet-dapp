import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";

import { useStyles } from "./styles";
import MetamaskDetails from "../../../../../UserProfile/UserProfileAccount/MetamaskDetails/MetamaskDetails";

const DialogTitles = ["Deposit into Escrow", "Withdraw from Escrow"];

const PurchaseDialog = ({ classes, show, onClose }) => {
  const [title, setTitle] = useState(DialogTitles[0]);

  const handleTitleChange = (activeTab) => {
    setTitle(DialogTitles[activeTab]);
  };

  return (
    <Dialog onClose={onClose} open={show} className={classes.dialogBox}>
      <span className={classes.header}>{title}</span>
      <div className={classes.escrowAccountDetails}>
        <MetamaskDetails handleTitleChange={handleTitleChange} />
      </div>
    </Dialog>
  );
};

export default withStyles(useStyles)(PurchaseDialog);
