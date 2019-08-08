import React from "react";
import { withStyles } from "@material-ui/styles";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import FreeApiCalls from "./FreeApiCalls";
import { useStyles } from "./styles";

const Purchase = ({ classes, handleComplete, freeCallsRemaining }) => {
  const handleClick = () => {
    handleComplete();
  };
  if (freeCallsRemaining > 0) {
    return (
      <div>
        <p className={classes.PurchaseDescription} onClick={handleClick}>
          Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload
          a file from your computer, URL, or select image from the gallery. You can specify additional parameters in the
          panel below. “Mouse over” for tool tips.{" "}
        </p>
        <FreeApiCalls freeCallsRemaining={freeCallsRemaining} />
      </div>
    );
  }
  return (
    <p className={classes.PurchaseDescription} onClick={handleClick}>
      Free calls limit expired.{" "}
    </p>
  );
};

export default withStyles(useStyles)(Purchase);
