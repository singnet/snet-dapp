import React from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from './styles';

const PaymentInfoCard = ({ classes, title, value, unit }) => {
  return(
    <div className={classes.PaymentInfoCardContainer}>
      <div className={classes.TitleContainer}>
        <InfoIcon />
        <h5>{title}</h5>
      </div>
      <div>
        <h3>{value}</h3>
        { unit ? <span className={classes.unit}>AGI</span> : '' }        
      </div>
    </div>
  )
};

export default withStyles(useStyles)(PaymentInfoCard);
