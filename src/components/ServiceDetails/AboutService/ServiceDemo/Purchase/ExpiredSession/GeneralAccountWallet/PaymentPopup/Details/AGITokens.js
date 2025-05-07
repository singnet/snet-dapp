import React from "react";

const AGITokens = ({ amount }) => {
  if (!amount || isNaN(amount)) {
    return <span>Enter an amount to view equivalent {process.env.REACT_APP_TOKEN_NAME} Tokens</span>;
  }
  return (
    <span>
      {amount} {process.env.REACT_APP_TOKEN_NAME} Tokens
    </span>
  );
};

export default AGITokens;
