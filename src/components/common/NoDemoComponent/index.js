import React from "react";
import { withStyles } from "@material-ui/styles";
import NoDemoComponentImg from "../../../assets/images/NoUiComponent.png";
import { useStyles } from "./styles";

const NoDemoComponent = ({ classes }) => {
  return (
    <div className={classes.noDemoComponentContainer}>
      <img src={NoDemoComponentImg} alt="No UI Component" loading="lazy" />
    </div>
  );
};

export default withStyles(useStyles)(NoDemoComponent);
