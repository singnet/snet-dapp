import React from "react";

const CallPriceInput = ({ classes, disabled, inputProps }) => {
  if (!inputProps) {
    return null;
  }

  return (
    <div>
      {!inputProps?.noInput && (
        <input type="text" disabled={disabled} value={inputProps.noOfServiceCalls} onChange={inputProps.onChange} />
      )}
      <span className={classes.value}>{Number(inputProps.totalPrice)}</span>
      <span className={classes.unit}>{inputProps.unit}</span>
    </div>
  );
};

export default CallPriceInput;
