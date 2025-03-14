import React from "react";

const AGITokens = ({ amount }) => {
  if (!amount || isNaN(amount)) {
    return <span>Enter an amount to view equivalent AGIX Tokens</span>;
  }
  return <span>{amount} AGIX Tokens</span>;
};

export default AGITokens;
