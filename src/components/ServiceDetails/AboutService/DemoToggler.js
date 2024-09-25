import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";

import StyledButton from "snet-dapp-components/components/StyledButton";
import ServiceDemo from "./ServiceDemo";
import Routes from "../../../utility/constants/Routes";
import serviceOfflineImg from "../../../assets/images/Artboard.png";
import signInImg from "../../../assets/images/signIn.png";
import NoDemoComponent from "../../common/NoDemoComponent";

import { useStyles } from "./styles";

const DemoToggler = ({
  classes,
  showDemo,
  onClick,
  service,
  serviceAvailable,
  // scrollToView,
  demoComponentRequired,
}) => {
  if (!showDemo) {
    return (
      <div className={classes.serviceOffline}>
        <div className={classes.imgContainer}>
          <img src={signInImg} title="Login" alt="SignIn" loading="lazy" />
        </div>
        <div className={classes.offDemoTitle}>
          <p>Please login or sign up to run this demo for free.</p>
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
    );
  }

  if (!serviceAvailable) {
    return (
      <div className={classes.serviceOffline}>
        <div className={classes.imgContainer}>
          <img
            src={serviceOfflineImg}
            title="Service Not Available"
            alt="Service Not Available due to poor connection "
            loading="lazy"
          />
        </div>
        <div className={classes.offDemoTitle}>
          <p>Service temporary offline by provider.</p>
          <p>Please try again Later.</p>
          <span>If this error is continuing for some time, feel free to reach us.</span>
        </div>
        <div className={classes.btnContainer}>
          <StyledButton btnText="submit error" type="transparent" />
          <StyledButton btnText="contact support" type="transparent" />
        </div>
      </div>
    );
  }

  if (process.env.REACT_APP_SANDBOX !== "true" && !demoComponentRequired) {
    return <NoDemoComponent />;
  }

  return <ServiceDemo service={service} />;
};

export default withStyles(useStyles)(DemoToggler);
