import React from "react";
import { withStyles } from "@material-ui/styles";

import NoConnectionImg from "../../../assets/images/error.svg";
import { useStyles } from "./styles";

const ErrorBox = ({ classes, errImg, errText }) => {
  return (
    <div className={classes.errorMsgContainer}>
      <img src={errImg || NoConnectionImg} alt="No connection" />
      <span>
        {errText ||
          `Unable to reach our servers. We have been notified of this.
        Please try again Later.`}
      </span>
      {/*<div className={classes.btnContainer}>
          <p>if this error is persisitng for some time, feel free to reach us.</p>
          <StyledButton type="transparent" btnText="submit error" />
          <StyledButton type="transparent" btnText="contact support" />
        </div>*/}
    </div>
  );
};

export default withStyles(useStyles)(ErrorBox);
