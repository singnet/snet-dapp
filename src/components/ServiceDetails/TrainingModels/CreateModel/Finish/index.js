import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { userProfileRoutes } from "../../../../UserProfile";
import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

const Finish = ({ classes }) => {
  const { modelId } = useSelector((state) => state.serviceDetailsReducer.currentModel);

  return (
    <div className={classes.finishContaienr}>
      <CheckCircleIcon />
      <span>Training Request Submitted</span>
      <p>Your model request has been submitted and will be processed soon.</p>
      <p>
        Model Request Reference ID:<span>{modelId}</span>
      </p>
      <div className={classes.btnContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS} className={classes.routerLink}>
          <StyledButton type="transparentBlueBorder" btnText="transaction history" />
        </Link>
        <StyledButton btnText="View Models" />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Finish);
