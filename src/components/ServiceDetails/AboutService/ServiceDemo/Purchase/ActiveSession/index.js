import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import StyledLinearProgress from "../../../../../common/StyledLinearProgress";
import { useStyles } from "./styles";
import { getIsTrainingAvailable } from "../../../../../../Redux/actionCreators/ServiceDetailsActions";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingModels } from "../../../../../../Redux/actionCreators/ServiceTrainingActions";
import { isUndefined } from "lodash";
import { updateMetamaskWallet } from "../../../../../../Redux/actionCreators/UserActions";

const ActiveSession = ({ classes, freeCallsAvailable, handleComplete, freeCallsTotal }) => {
  const dispatch = useDispatch();
  const { detailsTraining } = useSelector((state) => state.serviceDetailsReducer);
  const { orgId, serviceId, isAvailable } = useSelector((state) => state.serviceDetailsReducer.details);
  const { modelsList } = useSelector((state) => state.serviceTrainingReducer);
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const [showTooltip, setShowTooltip] = useState(false);

  const progressValue = () => (freeCallsAvailable / freeCallsTotal) * 100;

  const handleTooltipOpen = () => {
    if (!isAvailable) {
      setShowTooltip(true);
    }
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  const isTrainingAvailable = getIsTrainingAvailable(detailsTraining, isLoggedIn);

  const handleRequestModels = async () => {
    try {
      const address = await dispatch(updateMetamaskWallet());
      await dispatch(getTrainingModels(orgId, serviceId, address));
    } catch (error) {
      console.error("handle request model: ", error);
    }
  };

  const isActionsDisabled = !isAvailable;

  return (
    <div className={classes.activeSessionContainer}>
      <AlertBox
        type="info"
        message={`You are free to use ${freeCallsAvailable} more API calls to tryout the service.
		 Post the limit you have to purchase to continue using the service.`}
      />
      <div className={classes.freeCallsInfo}>
        <span className={classes.FreeApiCallsText}>Free API Calls</span>
        <span className={classes.ReaminaingCallsNo}>{freeCallsAvailable}</span>
        <StyledLinearProgress value={progressValue()} />
      </div>
      <Tooltip
        title="Service is currently offline. Please try after sometime"
        aria-label="add-payment"
        open={showTooltip}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        classes={{ tooltip: classes.tooltip }}
      >
        <div className={classes.activeSectionButtons}>
          <StyledButton type="blue" btnText="run for free" onClick={handleComplete} disabled={isActionsDisabled} />
          {!!isTrainingAvailable && isUndefined(modelsList) && (
            <StyledButton
              type="transparent"
              btnText="request my models"
              onClick={handleRequestModels}
              disabled={isActionsDisabled}
            />
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default withStyles(useStyles)(ActiveSession);
