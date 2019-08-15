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

const txnTypes = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

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

  const handleDepositSubmit = async () => {
    //deposit the amount into the escrow and increment escrow balance
    // await deposit action
    //onSuccess
    setAmount({});
    setAlert({ type: alertTypes.SUCCESS, message: "Successfully deposited" });
    //onFailure
    setAlert({ type: alertTypes.ERROR, message: "Unable to deposit amount" });
  };

  const handleWithdrawSubmit = async () => {
    //withdraw the amount from the escrow and decrement escrow balance
    // await withdraw action
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
      submitAction: handleDepositSubmit,
      component: (
        <StyledTextField label="AGI Token Amount" value={amount[txnTypes.DEPOSIT]} onChange={handleDepositAmtChange} />
      ),
    },
    {
      activeIndex: 1,
      name: "Withdraw",
      title: "Withdraw From Escrow",
      icon: <InfoIcon />,
      submitAction: handleWithdrawSubmit,
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
        <StyledButton type="blue" disabled btnText="deposit" onClick={activeComponent.submitAction} />
      </MuiDialogActions>
    </Dialog>
  );
};

export default withStyles(useStyles)(PurchaseDialog);
