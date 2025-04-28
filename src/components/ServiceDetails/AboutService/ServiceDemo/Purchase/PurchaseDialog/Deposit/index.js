import React from "react";
import StyledTextField from "../../../../../../common/StyledTextField";

const Deposit = () => {
  return <StyledTextField label={`${process.env.REACT_APP_TOKEN_NAME} Token Amount`} />;
};

export default Deposit;
