import React, { useState } from "react";

import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";
import UserFeedback from "../UserFeedback";

const CompletedActions = ({ isComplete, feedback, orgId, serviceId, refetchFeedback, handleResetAndRun }) => {
  const [openUserFeedback, setUserFeedback] = useState(false);

  const handleOpenUserFeedback = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    setUserFeedback(true);
  };

  const handleCloseUserFeedback = () => {
    setUserFeedback(false);
  };

  const classes = useStyles();
  if (!isComplete) {
    return null;
  }
  return (
    <div className={classes.buttonsContainer}>
      <UserFeedback
        open={openUserFeedback}
        handleClose={handleCloseUserFeedback}
        feedback={feedback}
        orgId={orgId}
        serviceId={serviceId}
        refetchFeedback={refetchFeedback}
      />
      <StyledButton type="transparent" btnText="Rate the service" onClick={handleOpenUserFeedback} />
      <StyledButton type="blue" btnText="Reset and Run" onClick={handleResetAndRun} />
    </div>
  );
};

export default CompletedActions;
