import React from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from "./styles";

const PaymentInfoCard = ({ classes, title, value, unit, show = true }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={classes.PaymentInfoCardContainer}>
      <div className={classes.TitleContainer}>
        <InfoIcon />
        <h5>{title}</h5>
      </div>
      <div className={classes.content}>
        <h3>{Number(value)}</h3>
        {unit ? <span className={classes.unit}>AGIX</span> : ""}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PaymentInfoCard);
