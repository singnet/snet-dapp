import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import DialogTitle from "./DialogTitle";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import StyledTextField from "../../../../../common/StyledTextField";
import StyledButton from "../../../../../common/StyledButton";
import { txnTypes, agiToCogs } from "../../../../../../utility/PricingStrategy";
import { initSdk } from "../../../../../../utility/sdk";
import { loaderActions } from "../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../utility/constants/LoaderContent";

const PurchaseDialog = ({
  classes,
  show,
  onClose,
  startDepositLoader,
  startWithdrawLoader,
  stopLoader,
  refetchAccBalance,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState({});
  const [alert, setAlert] = useState({});

  const handleTabChange = (event, value) => {
    setActiveTab(value);
  };

  const handleDepositAmtChange = event => {
    setAmount({ ...amount, [txnTypes.DEPOSIT]: event.target.value });
  };

  const handleWithdrawAmtChange = event => {
    setAmount({ ...amount, [txnTypes.WITHDRAW]: event.target.value });
  };

  const handleDeposit = async () => {
    startDepositLoader();
    const sdk = await initSdk();
    try {
      const amountInAGI = amount[txnTypes.DEPOSIT];
      const amountInCogs = agiToCogs(amountInAGI);
      await sdk.account.depositToEscrowAccount(amountInCogs);
      setAmount({ [txnTypes.DEPOSIT]: "" });
      setAlert({ type: alertTypes.SUCCESS, message: "Successfully deposited" });
      await refetchAccBalance();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: `Unable to deposit amount: ${err}` });
    }
    stopLoader();
  };

  const handleWithdraw = async () => {
    startWithdrawLoader();
    const sdk = await initSdk();
    try {
      const amountInAGI = amount[txnTypes.WITHDRAW];
      const amountInCogs = agiToCogs(amountInAGI);
      await sdk.account.withdrawFromEscrowAccount(amountInCogs);
      setAmount({ [txnTypes.WITHDRAW]: "" });
      setAlert({ type: alertTypes.SUCCESS, message: "Successfully withdrawn" });
      await refetchAccBalance();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: `Unable to withdraw amount: ${err}` });
    }
    stopLoader();
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
        <StyledButton type="blue" btnText={activeComponent.name} onClick={activeComponent.submitAction} />
      </MuiDialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = dispatch => ({
  startDepositLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.DEPOSIT)),
  startWithdrawLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(PurchaseDialog));
