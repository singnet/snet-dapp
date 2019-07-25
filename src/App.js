import React, { Component, lazy, Suspense } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";

import Routes from "./utility/constants/Routes";
import { aws_config } from "./config/aws_config";
import theme from "./assets/Theme";
import withRegistrationHeader from "./components/HOC/WithRegistrationHeader";
import { headerData } from "./utility/constants/Header";
import withInAppWrapper from "./components/HOC/WithInAppHeader";
import { userActions } from "./Redux/actionCreators";
import PrivateRoute from "./components/common/PrivateRoute";
import AppLoader from "./components/common/AppLoader";
import WalletReqdRoute from "./components/common/WalletReqdRoute";

const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const ForgotPasswordSubmit = lazy(() => import("./components/Login/ForgotPasswordSubmit"));
const Onboarding = lazy(() => import("./components/Onboarding"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const AiMarketplace = lazy(() => import("./components/AiMarketplace"));
const SignUp = lazy(() => import("./components/Login/Signup"));
const Login = lazy(() => import("./components/Login"));
const ServiceDetails = lazy(() => import("./components/ServiceDetails"));
const UserProfile = lazy(() => import("./components/UserProfile"));

Amplify.configure(aws_config);

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUserDetails();
  };

  componentDidMount = () => {
    this.props.fetchUserDetails();
  };

  render() {
    const { hamburgerMenu, isInitialized, isLoggedIn } = this.props;
    if (!isInitialized) {
      return <h2>Loading</h2>;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className={hamburgerMenu ? "hide-overflow" : null}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
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
                <WalletReqdRoute
                  path={`/${Routes.AI_MARKETPLACE}`}
                  {...this.props}
                  component={withInAppWrapper(AiMarketplace)}
                />
                <WalletReqdRoute
                  path={`/${Routes.SERVICE_DETAILS}/:service_row_id`}
                  {...this.props}
                  component={withInAppWrapper(ServiceDetails)}
                />
                <WalletReqdRoute
                  loginReqd
                  redirectTo={`/${Routes.LOGIN}`}
                  path={`/${Routes.USER_PROFILE}`}
                  {...this.props}
                  component={withInAppWrapper(UserProfile)}
                />
                <WalletReqdRoute path="/" exact {...this.props} component={withInAppWrapper(AiMarketplace)} />
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
  isWalletAssigned: state.userReducer.isWalletAssigned,
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
