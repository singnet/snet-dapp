import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from "./styles";
import DialogTitle from "./DialogTitle";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import StyledTextField from "../../../../../common/StyledTextField";
import StyledButton from "../../../../../common/StyledButton";
import { txnTypes, agiToCogs } from "../../../../../../utility/PricingStrategy";
import { initSdk } from "../../../../../../utility/sdk";

let sdk = undefined;

const PurchaseDialog = ({ classes, show, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState({});
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: "" });

  const handleTabChange = (...args) => {
    setActiveTab(args[1]);
  };

  const handleDepositAmtChange = event => {
    setAmount({ ...amount, [txnTypes.DEPOSIT]: event.target.value });
  };

  const handleWithdrawAmtChange = event => {
    setAmount({ ...amount, [txnTypes.WITHDRAW]: event.target.value });
  };

  const handleDeposit = async () => {
    if (!sdk) {
      sdk = await initSdk();
    }
    const amountInAGI = amount[txnTypes.DEPOSIT];
    const amountInCogs = agiToCogs(amountInAGI);
    const response = await this.sdk.account.depositToEscrowAccount(amountInCogs);
    setAmount({});
    setAlert({ type: alertTypes.SUCCESS, message: "Successfully deposited" });
    //onFailure
    setAlert({ type: alertTypes.ERROR, message: "Unable to deposit amount" });
  };

  const handleWithdraw = async () => {
    if (!sdk) {
      sdk = await initSdk();
    }
    const amountInAGI = amount[txnTypes.WITHDRAW];
    const amountInCogs = agiToCogs(amountInAGI);
    const response = await this.sdk.account.withdrawFromEscrowAccount(amountInCogs);

    //onSuccess
    setAmount({});
    setAlert({ type: alertTypes.SUCCESS, message: "Successfully withdrawn" });
    //onFailure
    setAlert({ type: alertTypes.ERROR, message: "Unable to withdraw amount" });
  };

  const tabs = [
    {
      activeIndex: 0,
      name: "Deposit",
      title: "Deposit Into Escrow",
      icon: <InfoIcon />,
      submitAction: handleDeposit,
      component: (
        <StyledTextField label="AGI Token Amount" value={amount[txnTypes.DEPOSIT]} onChange={handleDepositAmtChange} />
      ),
    },
    {
      activeIndex: 1,
      name: "Withdraw",
      title: "Withdraw From Escrow",
      icon: <InfoIcon />,
      submitAction: handleWithdraw,
      component: (
        <StyledTextField
          label="AGI Token Amount"
          value={amount[txnTypes.WITHDRAW]}
          onChange={handleWithdrawAmtChange}
        />
      ),
    },
  ];

  const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0];

  return (
    <Dialog onClose={onClose} open={show} className={classes.dialogBox}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <h3>{activeComponent.title}</h3>
      </DialogTitle>
      <MuiDialogContent dividers className={classes.DialogContent}>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} icon={value.icon} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent.component}
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      </MuiDialogContent>
      <MuiDialogActions className={classes.dialogActions}>
        <StyledButton type="transparent" btnText="cancel" />
        <StyledButton type="blue" disabled btnText={activeComponent.name} onClick={activeComponent.submitAction} />
      </MuiDialogActions>
    </Dialog>
  );
};

export default withStyles(useStyles)(PurchaseDialog);
