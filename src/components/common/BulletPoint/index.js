import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import PropTypes from "prop-types";

import AlertBox, { alertTypes } from "../AlertBox";

const Icon = {
  warning: <WarningIcon />,
};

const BulletPoint = ({ message, type = alertTypes.WARNING }) => {
  return (
    <div>
      <div>{Icon[type]}</div>
      <AlertBox type={type} message={message} />
    </div>
  );
};

BulletPoint.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(Object.values(alertTypes)),
};

export default BulletPoint;
