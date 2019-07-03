import Routes from "./Routes";

export const headerData = {
  SIGNUP: {
    headerTitle: "Already have an account?",
    linkPath: Routes.LOGIN,
    headerText: "Login",
  },
  LOGIN: {
    headerTitle: "New to singularityNET?",
    linkPath: Routes.SIGNUP,
    headerText: "SignUp",
  },
  FORGOT_PASSWORD: {
    headerTitle: "Switch to another account?",
    linkPath: Routes.LOGIN,
    headerText: "Login",
  },
  FORGOT_PASSWORD_SUBMIT: {
    headerTitle: "",
    linkPath: Routes.SIGNUP,
    headerText: "",
  },
  ONBOARDING: {
    headerTitle: "",
    linkPath: Routes.SIGNUP,
    headerText: "Log Out",
  },
};
