import React, { lazy, Suspense, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Routes from "./utility/constants/Routes";
import NavigateSetter from "./utility/HistoryHelper";
import { aws_config } from "./config/aws_config";
import theme from "./assets/Theme";
import withRegistrationHeader from "./components/HOC/WithRegistrationHeader";
import { headerData } from "./utility/constants/Header";
import withInAppWrapper from "./components/HOC/WithInAppHeader";
import { userActions } from "./Redux/actionCreators";
import PrivateRoute from "./components/common/PrivateRoute";
import { CircularProgress } from "@mui/material";
import initHotjar from "./assets/externalScripts/hotjar";
import initGDPRNotification from "./assets/externalScripts/gdpr";
import PaymentCancelled from "./components/ServiceDetails/PaymentCancelled";

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
const AiRequestForm = lazy(() => import("./components/AiRequestForm"));

Amplify.configure(aws_config);

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

if (process.env.REACT_APP_HOTJAR_ID && process.env.REACT_APP_HOTJAR_SV) {
  initHotjar(process.env.REACT_APP_HOTJAR_ID, process.env.REACT_APP_HOTJAR_SV);
}
initGDPRNotification();

const App = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const isTermsAccepted = useSelector((state) => state.userReducer.isTermsAccepted);
  const isInitialized = useSelector((state) => state.userReducer.isInitialized);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.fetchUserDetails());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="loader-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router location={history}>
        <NavigateSetter />
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route path={`/${Routes.SIGNUP}`} Component={withRegistrationHeader(SignUp, headerData.SIGNUP)} />
            <Route
              replace
              path={`/${Routes.LOGIN}`}
              // {...this.props}
              Component={withRegistrationHeader(Login, headerData.LOGIN)}
            />
            <Route
              path={`/${Routes.FORGOT_PASSWORD}`}
              // {...this.props}
              Component={withRegistrationHeader(ForgotPassword, headerData.FORGOT_PASSWORD)}
            />
            <Route
              path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`}
              // {...this.props}
              Component={withRegistrationHeader(ForgotPasswordSubmit, headerData.FORGOT_PASSWORD_SUBMIT)}
            />
            <Route
              path={`/${Routes.RESET_PASSWORD}`}
              // {...this.props}
              Component={withRegistrationHeader(ForgotPassword, headerData.FORGOT_PASSWORD)}
            />
            <Route
              path={`/${Routes.RESET_PASSWORD_SUBMIT}`}
              // {...this.props}
              Component={withRegistrationHeader(ForgotPasswordSubmit, headerData.FORGOT_PASSWORD_SUBMIT)}
            />
            <Route
              path={`/${Routes.ONBOARDING}`}
              element={
                <PrivateRoute
                  isAllowed={isLoggedIn}
                  component={withRegistrationHeader(Onboarding, headerData.ONBOARDING)}
                  redirectTo={`/${Routes.LOGIN}`}
                  path={`/${Routes.ONBOARDING}`}
                />
              }
            />
            <Route
              path={`/${Routes.AI_MARKETPLACE}`}
              element={
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  component={withInAppWrapper(AiMarketplace)}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.AI_MARKETPLACE}`}
                />
              }
            />
            <Route
              path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId`}
              element={
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  component={withInAppWrapper(ServiceDetails)}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId`}
                />
              }
            />
            <Route
              path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId/order/:orderId/payment/:paymentId/execute`}
              element={
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  component={withInAppWrapper(ServiceDetails)}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId/order/:orderId/payment/:paymentId/execute`}
                />
              }
            />
            <Route
              path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId/order/:orderId/payment/:paymentId/cancel`}
              element={
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  component={PaymentCancelled}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId/order/:orderId/payment/:paymentId/cancel`}
                />
              }
            />
            <Route
              path={`/${Routes.USER_PROFILE}/:activeTab?/*`}
              element={
                <PrivateRoute
                  isAllowed={isLoggedIn && isTermsAccepted}
                  component={withInAppWrapper(UserProfile)}
                  redirectTo={isLoggedIn ? `/${Routes.ONBOARDING}` : `/${Routes.LOGIN}`}
                  path={`/${Routes.USER_PROFILE}/:activeTab?`}
                />
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAllowed={isTermsAccepted}
                  component={withInAppWrapper(AiMarketplace)}
                  redirectTo={`/${Routes.ONBOARDING}`}
                  path="/"
                />
              }
            />
            <Route path={`/${Routes.AI_REQUEST_FORM}`} Component={AiRequestForm} />
            <Route path={`/${Routes.GET_STARTED}`} Component={withInAppWrapper(GetStarted)} />
            <Route path="*" Component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
