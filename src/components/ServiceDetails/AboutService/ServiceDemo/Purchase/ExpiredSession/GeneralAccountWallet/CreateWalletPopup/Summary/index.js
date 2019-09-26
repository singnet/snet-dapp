import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const Summary = ({ classes }) => {
  return (
    <div className={classes.summaryContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        Successfully Created Wallet for : Service Provider 1
      </Typography>
      <div className={classes.summaryTable}>
        <Typography variant="h5" className={classes.summaryTableHeader}>
          Transaction Receipt
        </Typography>
        <div className={classes.summaryTableContent}>
          <div className={classes.summaryTableColumn}>
            <Typography variant="body2">Total $USD spent</Typography>
            <Typography variant="body2">$4.00</Typography>
          </div>
          <div className={classes.summaryTableData}>
            <Typography variant="body2">AGI tokens issued</Typography>
            <Typography variant="body2">0.01000020 AGI</Typography>
          </div>
          <div className={classes.summaryTableColumn}>
            <Typography variant="body2">Conversion (gas) charges</Typography>
            <Typography variant="body2">-0.00000020 AGI</Typography>
          </div>
          <div className={classes.summaryTableDataTotal}>
            <Typography variant="body2">Total AGI tokens </Typography>
            <Typography variant="body2">0.01000000 AGI</Typography>
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <StyledButton type="blue" btnText="finish" />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Summary);
