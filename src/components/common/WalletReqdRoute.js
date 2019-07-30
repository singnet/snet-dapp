import React from "react";
import { Route, Redirect } from "react-router-dom";

import Onboarding from "../Onboarding";
import Routes from "../../utility/constants/Routes";
import { headerData } from "../../utility/constants/Header";
import withRegistrationHeader from "../HOC/WithRegistrationHeader";

const WalletReqdRoute = ({
  loginReqd,
  isLoggedIn,
  isWalletAssigned,
  component: Component,
  path: sourcePath,
  ...rest
}) => {
  const OnboardingComponent = withRegistrationHeader(Onboarding, headerData.ONBOARDING);

  if (loginReqd && !isLoggedIn) {
    return <Redirect to={{ pathname: `/${Routes.LOGIN}`, state: { sourcePath } }} />;
  }
  if (isLoggedIn && !isWalletAssigned) {
    return <Route render={props => <OnboardingComponent {...props} enforcedWalletCreation />} />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default WalletReqdRoute;
