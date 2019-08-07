import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";
import { useStyles } from "./styles";

const Purchase = ({ classes }) =>{
  return (
    <div>
      <p className={classes.PurchaseDescription}>Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below.  You can upload a file from your computer, URL, or select image from the gallery.  You can specify additional parameters in the panel below.  “Mouse over” for tool tips. </p>
      <ExpiredSession />
    </div>
  )
}

export default withStyles(useStyles)(Purchase);
