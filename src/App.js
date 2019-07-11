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

const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const ForgotPasswordSubmit = lazy(() => import("./components/Login/ForgotPasswordSubmit"));
const Onboarding = lazy(() => import("./components/Onboarding"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const AiMarketplace = lazy(() => import("./components/AiMarketplace"));
const SignUp = lazy(() => import("./components/Login/Signup"));
const Login = lazy(() => import("./components/Login"));

Amplify.configure(aws_config);

class App extends Component {
  componentDidMount = () => {
    this.props.setUserDetails();
  };

  render() {
    const { hamburgerMenu } = this.props;
    if (!this.props.isInitialized) {
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
                <PrivateRoute
                  path={`/${Routes.FORGOT_PASSWORD}`}
                  {...this.props}
                  component={withRegistrationHeader(ForgotPassword, {
                    ...headerData.FORGOT_PASSWORD,
                  })}
                />
                <PrivateRoute
                  path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`}
                  {...this.props}
                  component={withRegistrationHeader(ForgotPasswordSubmit, {
                    ...headerData.FORGOT_PASSWORD_SUBMIT,
                  })}
                />
                <PrivateRoute
                  path={`/${Routes.ONBOARDING}`}
                  {...this.props}
                  component={withRegistrationHeader(Onboarding, headerData.ONBOARDING)}
                />
                <Route path={`/${Routes.AI_MARKETPLACE}`} {...this.props} component={withInAppWrapper(AiMarketplace)} />
                <Route path="/" exact {...this.props} component={withInAppWrapper(AiMarketplace)} />
                <Route component={PageNotFound} />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  isInitialized: state.userReducer.isInitialized,
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  setUserDetails: () => dispatch(userActions.setUserDetails),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
