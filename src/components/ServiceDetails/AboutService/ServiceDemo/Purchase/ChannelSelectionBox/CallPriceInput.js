import React, { Fragment } from "react";

const CallPriceInput = ({ classes, disabled, inputProps }) => {
  if (!inputProps) {
    return null;
  }

  return (
    <Fragment>
      {!inputProps?.noInput && (
        <input type="number" disabled={disabled} value={inputProps.noOfServiceCalls} onChange={inputProps.onChange} />
      )}
      <div className={classes.priceContainer}>
        <span className={classes.value}>{String(inputProps.totalPrice)}</span>
        <span className={classes.unit}>{inputProps.unit}</span>
      </div>
    </Fragment>
  );
};

export default CallPriceInput;
