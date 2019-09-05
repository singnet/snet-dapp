import React from "react";

const CallPriceInput = ({ classes, disabled, inputProps }) => {
  if (inputProps) {
    return (
      <div>
        <input type="text" disabled={disabled} value={inputProps.noOfServiceCalls} onChange={inputProps.onChange} />
        <span className={classes.value}>{inputProps.totalPrice}</span>
        <span className={classes.unit}>{inputProps.unit}</span>
      </div>
    );
  }
  return null;
};

export default CallPriceInput;
