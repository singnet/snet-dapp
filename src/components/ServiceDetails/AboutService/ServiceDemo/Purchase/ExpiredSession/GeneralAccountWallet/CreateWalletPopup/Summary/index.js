import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import StyledTable from "../../../../../../../../common/StyledTable";
import InfoIcon from "@material-ui/icons/Info";
import Routes from "../../../../../../../../../utility/constants/Routes";

const Summary = props => {
  const {
    classes,
    amount,
    item,
    quantity,
    history,
    match: {
      params: { orgId, serviceId },
    },
    handleClose,
  } = props;

  const columns = [{ key: "item", label: "Total $USD spent" }, { key: "amount", label: `$${amount}` }];
  const rows = [
    {
      key: 1,
      values: [{ label: "Total AGI tokens", icon: InfoIcon }, { label: `${quantity} ${item}` }],
      highlight: true,
    },
  ];

  const handleFinish = () => {
    handleClose();
    history.push(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  };

  return (
    <div className={classes.summaryContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        Successfully Created Wallet for : Service Provider 1
      </Typography>
      <StyledTable title="Transaction Receipt" columns={columns} rows={rows} />
      <div className={classes.btnContainer}>
        <StyledButton type="blue" btnText="finish" onClick={handleFinish} />
      </div>
    </div>
  );
};

export default withRouter(withStyles(useStyles)(Summary));
