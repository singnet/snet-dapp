import React from "react";
import { withStyles } from "@mui/styles";

import StyledTextField from "snet-dapp-components/components/StyledTextField";
import { useStyles } from "./styles";

const Deposit = ({ classes }) => {
  return <StyledTextField label="AGIX Token Amount" />;
};

export default withStyles(useStyles)(Deposit);
