import React from "react";
import Typography from "@material-ui/core/Typography";

const AGITokens = ({ amount }) => {
  if (!amount || isNaN(amount)) {
    return <Typography variant="body2">Enter an amount to view equivalent AGI Tokens</Typography>;
  }
  return <Typography variant="body2">{amount} AGI Tokens</Typography>;
};

export default AGITokens;
