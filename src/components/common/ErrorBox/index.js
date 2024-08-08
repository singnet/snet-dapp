import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import NoConnectionImg from "../../../assets/images/error.svg";
import { useStyles } from "./styles";

const ErrorBox = ({ classes, errImg, errText }) => {
  return (
    <div className={classes.errorMsgContainer}>
      <img src={errImg || NoConnectionImg} alt="No connection" loading="lazy" />
      <span>
        {errText ||
          `Unable to reach our servers. We have been notified of this.
        Please try again Later.`}
      </span>
    </div>
  );
};

ErrorBox.propTypes = {
  errImg: PropTypes.string,
  errText: PropTypes.string,
};

export default withStyles(useStyles)(ErrorBox);
