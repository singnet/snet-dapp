import React from "react";
import WarningIcon from "@material-ui/icons/Warning";

import AlertBox from "../AlertBox";

const Icon = {
  warning: <WarningIcon />,
};

const BulletPoint = ({ message, type }) => {
  return (
    <div>
      <div>{Icon[type]}</div>
      <AlertBox type={type} message={message} />
    </div>
  );
};

BulletPoint.defaultProps = {
  type: "warning",
};

export default BulletPoint;
