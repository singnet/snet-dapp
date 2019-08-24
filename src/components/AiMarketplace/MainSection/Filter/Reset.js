import React from "react";

const Reset = ({ classes, handleFilterReset, disabled }) => {
  if (disabled) {
    return null;
  }

  return (
    <button className={classes.resetBtn} type="reset" value="Reset" onClick={handleFilterReset}>
      Reset
    </button>
  );
};

export default Reset;
