import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import ServiceDemo from "./ServiceDemo";
import Routes from "../../../utility/constants/Routes";
import serviceOfflineImg from "../../../assets/images/Artboard.png";
import signInImg from "../../../assets/images/signIn.png";

import { useStyles } from "./styles";

const DemoToggler = ({ classes, showDemo, onClick, service, history, serviceAvailable }) => {
  if (!showDemo) {
    return (
      <div className={classes.demoContainer}>
        <h3>Demo Example</h3>
        <div className={classes.demoToggler}>
          <div className={classes.imgContainer}>
            <img src={signInImg} title="Login" />
            <p>Please login or sign up to run this demo fr free.</p>
          </div>
          <div className={classes.btnContainer}>
            <Link to={`/${Routes.LOGIN}`}>
              <StyledButton btnText="login" type="transparent" onClick={onClick} />
            </Link>
            <Link to={`/${Routes.SIGNUP}`}>
              <StyledButton btnText="sign up free" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!serviceAvailable) {
    return (
      <div className={classes.serviceOfflineContainer}>
        <h3>Demo Example</h3>
        <div className={classes.serviceOffline}>
          <div className={classes.imgContainer}>
            <img src={serviceOfflineImg} title="Service Not Available" />
            <p>Service temporary offline by provider.</p>
            <p>Please try again Later.</p>
            <span>If this error is continuing for some time, feel free to reach us.</span>
          </div>
          <div className={classes.btnContainer}>
            <StyledButton btnText="submit error" type="transparent" />
            <StyledButton btnText="contact support" type="transparent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.demoContainer}>
      <h3>Service Demo</h3>
      <ServiceDemo service={service} history={history} />
    </div>
  );
};

export default withStyles(useStyles)(DemoToggler);
