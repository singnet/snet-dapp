import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import AlertBox from "../AlertBox";

const Icon = {
  warning: <WarningIcon />,
};

const BulletPoint = ({ message, type }) => {
  return (
    <div>
      {Icon[type]}
      <AlertBox type={type} message={message} />
    </div>
  );
};

BulletPoint.defaultProps = {
  type: "warning",
};

export default BulletPoint;
