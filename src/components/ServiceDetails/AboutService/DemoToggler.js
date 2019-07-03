import React from "react";
import { Link } from "react-router-dom";

import StyledButton from "../../common/StyledButton";
import DemoExample from "./DemoExample";
import Routes from "../../../utility/constants/Routes";

const DemoToggler = ({ showDemo, onClick }) => {
  if (showDemo) {
    return <DemoExample />;
  }
  return (
    <div>
      <Link to={Routes.LOGIN}>
        <StyledButton btnText="login" type="transparent" onClick={onClick} />
      </Link>
      <Link to={Routes.SIGNUP}>
        <StyledButton btnText="signup and run for free" />
      </Link>
    </div>
  );
};

export default DemoToggler;
