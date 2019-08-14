import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../../../../common/StyledButton";
import Deposit from "./Deposit";
import { useStyles } from "./styles";
import DialogTitle from "./DialogTitle";

const tabs = [
  { name: "Deposit", icon: <InfoIcon />, activeIndex: 0, component: <Deposit /> },
  // { name: "Withdraw", icon: <InfoIcon />, activeIndex: 1, component: <Deposit /> },
];

const PurchaseDialog = ({ classes, show, handleClose: onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = value => {
    setActiveTab(value.activeIndex);
  };

  const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;

  return (
    <Dialog onClose={onClose} open={show} className={classes.dialogBox}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <h3>Deposit Into Escrow</h3>
      </DialogTitle>
      <MuiDialogContent dividers className={classes.DialogContent}>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} icon={value.icon} onClick={handleTabChange} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent}
        </div>
      </MuiDialogContent>
      <MuiDialogActions className={classes.DialogActions}>
        <StyledButton type="transparent" btnText="cancel" />
        <StyledButton type="blue" disabled btnText="deposit" />
      </MuiDialogActions>
    </Dialog>
  );
};

export default withStyles(useStyles)(PurchaseDialog);
