const Routes = {
  SIGNUP: "signup",
  LOGIN: "login",
  FORGOT_PASSWORD: "forgotpassword",
  FORGOT_PASSWORD_SUBMIT: "forgotpasswordsubmit",
  RESET_PASSWORD: "resetpassword",
  RESET_PASSWORD_SUBMIT: "resetpasswordsubmit",
  ONBOARDING: "onboarding",
  AI_MARKETPLACE: "aimarketplace",
  SERVICE_DETAILS: "servicedetails",
  SERVICE_DETAILS_BY_SERVICE_META: "servicedetails/org/:orgId/service/:serviceId",
  SERVICE_DETAILS_TAB: "/tab/:tabId",
  SERVICE_DETAILS_PAYMENT: "/order/:orderId/payment/:paymentId",
  SERVICE_DETAILS_PAYMENT_IN_PROGRESS: "/execute",
  SERVICE_DETAILS_PAYMENT_CANCEL: "/cancel",
  USER_PROFILE: "userprofile",
  USER_PROFILE_ACTIVE_TAB: "/:activeTab?/*",
  GET_STARTED: "getstarted",
  AI_REQUEST_FORM: "airequestform",
  hash: {
    SERVICE_DEMO: "#demo",
  },
};

export default Routes;
