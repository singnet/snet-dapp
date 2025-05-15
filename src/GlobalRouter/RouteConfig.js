import { lazy } from "react";
import PropTypes from "prop-types";

import Routes from "@utility/constants/Routes";
import { headerData } from "@utility/constants/Header";
import withRegistrationHeader from "@components/HOC/WithRegistrationHeader";
import withInAppWrapper from "@components/HOC/WithInAppHeader";
import PaymentCancelled from "@components/ServiceDetails/PaymentCancelled";

const ForgotPassword = lazy(() => import("@components/Login/ForgotPassword"));
const ForgotPasswordSubmit = lazy(() => import("@components/Login/ForgotPasswordSubmit"));
const Onboarding = lazy(() => import("@components/Onboarding"));
const PageNotFound = lazy(() => import("@components/PageNotFound"));
const AiMarketplace = lazy(() => import("@components/AiMarketplace"));
const SignUp = lazy(() => import("@components/Login/Signup"));
const Login = lazy(() => import("@components/Login"));
const ServiceDetails = lazy(() => import("@components/ServiceDetails"));
const UserProfile = lazy(() => import("@components/UserProfile"));
const GetStarted = lazy(() => import("@components/GetStarted"));
const AiRequestForm = lazy(() => import("@components/AiRequestForm"));

const createRoutesConfig = ({ isLoggedIn, isTermsAccepted }) => {
  const isLoggedInAndTermsAccepted = isLoggedIn && isTermsAccepted;
  const isNotLoggedInPageAvailable = !isLoggedIn || isTermsAccepted;

  const redirectLink = isLoggedIn ? Routes.ONBOARDING : Routes.LOGIN;

  return [
    {
      isPrivate: false,
      path: "*",
      component: PageNotFound,
    },
    {
      isPrivate: false,
      path: `/${Routes.SIGNUP}`,
      component: withRegistrationHeader(SignUp, headerData.SIGNUP),
    },
    {
      isPrivate: false,
      path: `/${Routes.LOGIN}`,
      component: withRegistrationHeader(Login, headerData.LOGIN),
    },
    {
      isPrivate: false,
      path: `/${Routes.FORGOT_PASSWORD}`,
      component: withRegistrationHeader(ForgotPassword, headerData.FORGOT_PASSWORD),
    },
    {
      isPrivate: false,
      path: `/${Routes.FORGOT_PASSWORD_SUBMIT}`,
      component: withRegistrationHeader(ForgotPasswordSubmit, headerData.FORGOT_PASSWORD),
    },
    {
      isPrivate: false,
      path: `/${Routes.AI_REQUEST_FORM}`,
      component: AiRequestForm,
    },
    {
      isPrivate: false,
      path: `/${Routes.GET_STARTED}`,
      component: withInAppWrapper(GetStarted),
    },
    {
      isPrivate: true,
      path: `/${Routes.ONBOARDING}`,
      isAllowed: isLoggedIn,
      component: withRegistrationHeader(Onboarding, headerData.ONBOARDING),
      redirectTo: Routes.LOGIN,
    },
    {
      isPrivate: true,
      path: `/${Routes.AI_MARKETPLACE}`, // TODO: redirect to home path
      isAllowed: isNotLoggedInPageAvailable,
      component: withInAppWrapper(AiMarketplace),
      redirectTo: redirectLink,
    },
    {
      isPrivate: true,
      path: "/",
      isAllowed: isNotLoggedInPageAvailable,
      component: withInAppWrapper(AiMarketplace),
      redirectTo: redirectLink,
    },
    {
      isPrivate: true,
      path: `/${Routes.SERVICE_DETAILS_BY_SERVICE_META + Routes.SERVICE_DETAILS_TAB}`,
      isAllowed: isNotLoggedInPageAvailable,
      component: withInAppWrapper(ServiceDetails),
      redirectTo: redirectLink,
    },
    {
      isPrivate: true,
      path: `/${Routes.SERVICE_DETAILS_BY_SERVICE_META + Routes.SERVICE_DETAILS_PAYMENT_IN_PROGRESS}`,
      isAllowed: isLoggedInAndTermsAccepted,
      component: withInAppWrapper(ServiceDetails),
      redirectTo: redirectLink,
    },
    {
      isPrivate: true,
      path: `/${Routes.SERVICE_DETAILS_BY_SERVICE_META + Routes.SERVICE_DETAILS_PAYMENT_CANCEL}`,
      isAllowed: isLoggedInAndTermsAccepted,
      component: PaymentCancelled,
      redirectTo: redirectLink,
    },
    {
      isPrivate: true,
      path: `/${Routes.USER_PROFILE + Routes.USER_PROFILE_ACTIVE_TAB}`,
      isAllowed: isLoggedInAndTermsAccepted,
      component: withInAppWrapper(UserProfile),
      redirectTo: redirectLink,
    },
  ];
};

createRoutesConfig.propTypes = {
  isLoggedIn: PropTypes.bool,
  isTermsAccepted: PropTypes.bool,
};
export { createRoutesConfig };
