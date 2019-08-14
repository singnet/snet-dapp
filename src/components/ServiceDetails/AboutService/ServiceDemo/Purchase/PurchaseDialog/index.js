import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../../../../common/StyledButton";
import Deposit from "./Deposit";
import { useStyles } from './styles';

const DialogTitle = withStyles(useStyles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class PurchaseDialog extends Component {
  state = {
    dialogOpen: true,
    activeTab: 0
  };

  handleClose(){
    this.setState({ dialogOpen: false })
  }

  render(){
    const { classes } = this.props;
    const { dialogOpen, activeTab } = this.state;

    const tabs = [
      { name: "Deposit", icon: <InfoIcon />, activeIndex: 0, component: <Deposit /> }, 
      { name: "Withdraw", icon: <InfoIcon />, activeIndex: 1 }
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;

    return(
      <Dialog onClose={this.handleClose} open={dialogOpen} className={classes.dialogBox}>
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          <h3>Deposit Into Escrow</h3>
        </DialogTitle>
        <MuiDialogContent dividers className={classes.DialogContent}>
          <div className={classes.tabsContainer}>
            <AppBar position="static" className={classes.tabsHeader}>
              <Tabs value={activeTab}>
                {tabs.map(value => (
                  <Tab key={value.name} label={value.name} icon={value.icon} onClick={() => this.onTabChange(value.activeIndex)} />
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
    )
  } 
}

export default withStyles(useStyles)(PurchaseDialog);
