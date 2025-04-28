import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StyledButton from "../../../common/StyledButton";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import { agiToCogs, txnTypes } from "../../../../utility/PricingStrategy";
import { sdkActions } from "../../../../Redux/actionCreators";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledTextField from "../../../common/StyledTextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const successAlert = {
  [txnTypes.WITHDRAW]: "Successfully withdrawn",
  [txnTypes.DEPOSIT]: "Successfully deposited",
};

const errorAlert = {
  [txnTypes.WITHDRAW]: "Unable to withdraw amount",
  [txnTypes.DEPOSIT]: "Unable to deposit amount",
};

const MPEActions = {
  [txnTypes.WITHDRAW]: "withdrawFromEscrowAccount",
  [txnTypes.DEPOSIT]: "depositToEscrowAccount",
};

const MPEActionTabs = ({ classes }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState({});
  const [alert, setAlert] = useState({});
  const [isActionInProgress, setIsActionInProgress] = useState({
    [txnTypes.WITHDRAW]: false,
    [txnTypes.DEPOSIT]: false,
  });

  const dispatch = useDispatch();

  const onTabChange = (event, newValue) => {
    setAlert({});
    setActiveTab(newValue);
  };

  const handleAmountChange = (event, txnType) => {
    const { value } = event.target;
    setAmount({ ...amount, [txnType]: value });
  };

  const MPEAction = async (txnType, amountInCogs) => {
    const sdk = await dispatch(sdkActions.getSdk());
    return await sdk.account[MPEActions[txnType]](amountInCogs);
  };

  const handleMPEAction = async () => {
    const txnType = activeComponent.name;
    if (isActionInProgress[txnType]) {
      return;
    }

    setIsActionInProgress({ ...isActionInProgress, [txnType]: true });
    setAlert({});
    try {
      const amountInAGI = amount[txnType];
      const amountInCogs = agiToCogs(amountInAGI);
      await MPEAction(txnType, amountInCogs);
      setAlert({ type: alertTypes.SUCCESS, message: successAlert[txnType] });
    } catch (error) {
      console.error(error);
      setAlert({ type: alertTypes.ERROR, message: errorAlert[txnType] });
    } finally {
      setIsActionInProgress({ ...isActionInProgress, [txnType]: false });
    }
  };

  const tabs = [
    {
      name: txnTypes.DEPOSIT,
      activeIndex: 0,
      component: (
        <StyledTextField
          label={`Amount to be deposited in ${process.env.REACT_APP_TOKEN_NAME}`}
          value={amount[txnTypes.DEPOSIT] || ""}
          onChange={(event) => handleAmountChange(event, txnTypes.DEPOSIT)}
        />
      ),
    },
    {
      name: txnTypes.WITHDRAW,
      activeIndex: 1,
      component: (
        <StyledTextField
          label={`Amount to be withdrawn in ${process.env.REACT_APP_TOKEN_NAME}`}
          value={amount[txnTypes.WITHDRAW] || ""}
          onChange={(event) => handleAmountChange(event, txnTypes.WITHDRAW)}
        />
      ),
    },
  ];
  const activeComponent = tabs[activeTab];
  const activeComponentType = activeComponent.name;

  return (
    <Fragment>
      <div className={classes.tabsContainer}>
        <AppBar position="static" className={classes.tabsHeader}>
          <Tabs value={activeTab} onChange={onTabChange}>
            {tabs.map((value) => (
              <Tab key={value.name} label={value.name} />
            ))}
          </Tabs>
        </AppBar>
        {activeComponent.component}
        <AlertBox type={alert.type} message={alert.message} />
      </div>
      <div className={classes.btnContainer}>
        <StyledButton
          type="blue"
          btnText={
            isActionInProgress[activeComponentType] ? (
              <CircularProgress className={classes.circularProgress} />
            ) : (
              activeComponentType
            )
          }
          onClick={() => handleMPEAction(activeComponentType)}
          disabled={!Number(amount[activeComponentType]) || isActionInProgress[activeComponentType]}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(MPEActionTabs);
