import React from "react";
import { withStyles } from "@material-ui/styles";

import FreeApiCalls from "./FreeApiCalls";
import { useStyles } from "./styles";

const Purchase = ({ classes, handleComplete }) => {
  const handleClick = () => {
    handleComplete();
  };

  return (
    <div>
      <p className={classes.PurchaseDescription} onClick={handleClick}>
        Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below. You can upload a
        file from your computer, URL, or select image from the gallery. You can specify additional parameters in the
        panel below. “Mouse over” for tool tips.{" "}
      </p>
      <FreeApiCalls />
    </div>
  );
};

export default withStyles(useStyles)(Purchase);
