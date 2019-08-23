import React, { Component, lazy, Suspense } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Routes from "./utility/constants/Routes";
import { aws_config } from "./config/aws_config";
import theme from "./assets/Theme";
import withRegistrationHeader from "./components/HOC/WithRegistrationHeader";
import { headerData } from "./utility/constants/Header";
import withInAppWrapper from "./components/HOC/WithInAppHeader";
import { userActions } from "./Redux/actionCreators";
import PrivateRoute from "./components/common/PrivateRoute";
import AppLoader from "./components/common/AppLoader";
import { initSdk } from "./utility/sdk";
import { CircularProgress } from "@material-ui/core";

const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const ForgotPasswordSubmit = lazy(() => import("./components/Login/ForgotPasswordSubmit"));
const Onboarding = lazy(() => import("./components/Onboarding"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const AiMarketplace = lazy(() => import("./components/AiMarketplace"));
const SignUp = lazy(() => import("./components/Login/Signup"));
const Login = lazy(() => import("./components/Login"));
const ServiceDetails = lazy(() => import("./components/ServiceDetails"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const GetStarted = lazy(() => import("./components/GetStarted"));

Amplify.configure(aws_config);

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUserDetails();
  };

  componentDidUpdate = () => {
    initSdk();
  };

  render() {
    const { hamburgerMenu, isInitialized, isLoggedIn, isTermsAccepted } = this.props;
    if (!isInitialized) {
      return <CircularProgress />;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className={hamburgerMenu ? "hide-overflow" : null}>
          <Router history={history}>
            <Suspense fallback={<CircularProgress thickness={10} />}>
              <Switch>
                <Route path={`/${Routes.SIGNUP}`} component={withRegistrationHeader(SignUp, headerData.SIGNUP)} />
                <Route
                  path={`/${Routes.LOGIN}`}
                  {...this.props}
                  component={withRegistrationHeader(Login, headerData.LOGIN)}
                />
                <Route
                  path={`/${Routes.FORGOT_PASSWORD}`}
                  {...this.props}
                  component={withRegistrationHeader(ForgotPassword, headerData.FORGOT_PASSWORD)}
                />
                <Route
                  path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`}
                  {...this.props}
                  component={withRegistrationHeader(ForgotPasswordSubmit, headerData.FORGOT_PASSWORD_SUBMIT)}
                />
                <PrivateRoute
                  isAllowed={isLoggedIn}
                  redirectTo={`/${Routes.LOGIN}`}
                  path={`/${Routes.ONBOARDING}`}
                  {...this.props}
                  component={withRegistrationHeader(Onboarding, headerData.ONBOARDING)}
                />
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.AI_MARKETPLACE}`}
                  {...this.props}
                  component={withInAppWrapper(AiMarketplace)}
                />
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId`}
                  {...this.props}
                  component={withInAppWrapper(ServiceDetails)}
                />
                <PrivateRoute
                  isAllowed={isLoggedIn && isTermsAccepted}
                  redirectTo={isLoggedIn ? `/${Routes.ONBOARDING}` : `/${Routes.LOGIN}`}
                  path={`/${Routes.USER_PROFILE}`}
                  {...this.props}
                  component={withInAppWrapper(UserProfile)}
                />
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path="/"
                  exact
                  {...this.props}
                  component={withInAppWrapper(AiMarketplace)}
                />
                <Route path={`/${Routes.GET_STARTED}`} component={withInAppWrapper(GetStarted)} />
                <Route component={PageNotFound} />
              </Switch>
            </Suspense>
          </Router>
        </div>
        <AppLoader />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  isTermsAccepted: state.userReducer.isTermsAccepted,
  wallet: state.userReducer.wallet,
  isInitialized: state.userReducer.isInitialized,
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(userActions.fetchUserDetails),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
