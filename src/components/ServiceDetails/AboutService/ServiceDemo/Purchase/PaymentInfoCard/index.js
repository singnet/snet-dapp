import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const PaymentInfoCard = ({ classes, title, value, unit, show = true }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={classes.PaymentInfoCardContainer}>
      <div className={classes.TitleContainer}>
        <h5>{title}</h5>
      </div>
      <div className={classes.content}>
        <h3>{String(value)}</h3>
        {unit ? <span className={classes.unit}>{process.env.REACT_APP_TOKEN_NAME}</span> : ""}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PaymentInfoCard);
