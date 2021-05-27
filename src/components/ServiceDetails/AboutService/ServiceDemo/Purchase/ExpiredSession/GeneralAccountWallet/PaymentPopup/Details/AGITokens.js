import React from "react";
import Typography from "@material-ui/core/Typography";

const AGITokens = ({ amount }) => {
  if (!amount || isNaN(amount)) {
    return <Typography variant="body2">Enter an amount to view equivalent AGIX Tokens</Typography>;
  }
  return <Typography variant="body2">{amount} AGIX Tokens</Typography>;
};

export default AGITokens;
