import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import ServiceDemo from "./ServiceDemo";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

const DemoToggler = ({ classes, showDemo, onClick, service, history }) => {
  if (showDemo) {
    return (
      <div className={classes.demoContainer}>
        <h3>Service Demo</h3>
        <ServiceDemo service={service} history={history} />
      </div>
    );
  }
  return (
    <div className={classes.demoContainer}>
      <h3>Service Demo</h3>
      <div className={classes.demoToggler}>
        <Link to={`/${Routes.LOGIN}`}>
          <StyledButton btnText="login" type="transparent" onClick={onClick} />
        </Link>
        <Link to={`/${Routes.SIGNUP}`}>
          <StyledButton btnText="signup and run for free" />
        </Link>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(DemoToggler);
