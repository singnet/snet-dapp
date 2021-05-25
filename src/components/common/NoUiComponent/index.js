import React from "react";
import { withStyles } from "@material-ui/styles";
import NoUiComponentImg from "../../../assets/images/NoUiComponent.png";
import { useStyles } from "./styles";

const NoUiComponent = ({ classes }) => {
  return (
    <div className={classes.noUiComponentContainer}>
      <img src={NoUiComponentImg} alt="No UI Component" loading="lazy" />
      <span>There is no UI Component for this service.</span>
    </div>
  );
};

export default withStyles(useStyles)(NoUiComponent);
