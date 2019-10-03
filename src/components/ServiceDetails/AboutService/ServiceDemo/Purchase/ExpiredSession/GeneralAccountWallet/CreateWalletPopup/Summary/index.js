import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
// import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import StyledTable from "../../../../../../../../common/StyledTable";
import InfoIcon from "@material-ui/icons/Info";

const Summary = ({ classes, handleClose, amount, item, quantity }) => {
  const columns = [{ key: "item", label: "Total $USD spent" }, { key: "amount", label: `$${amount}` }];
  const rows = [
    {
      key: 1,
      values: [{ label: "Total AGI tokens", icon: InfoIcon }, { label: `${quantity} ${item}` }],
      highlight: true,
    },
  ];

  return (
    <div className={classes.summaryContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        Successfully Created Wallet for : Service Provider 1
      </Typography>
      <StyledTable title="Transaction Receipt" columns={columns} rows={rows} />
      <div className={classes.btnContainer}>
        <StyledButton type="blue" btnText="finish" onClick={handleClose} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Summary);
