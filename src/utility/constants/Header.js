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
    headerText: "Sign Up",
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

const tabs = [
  {
    title: "AI Marketplace",
    active: true,
    link: `/${Routes.AI_MARKETPLACE}`,
    openInNewTab: false,
  },
  {
    title: "Get Started",
    active: false,
    link: `/${Routes.GET_STARTED}`,
    openInNewTab: true,
  },
];

const dropdowns = [
  {
    label: "Resources",
    list: [
      { value: "", label: "Documentation" },
      { value: "", label: "Dataset Download" },
      { value: "", label: "API Library" },
      { value: "", label: "Telegram" },
      { value: "", label: "Forum" },
      { value: "", label: "Blog" },
    ],
  },
];

export const NavData = {
  tabs,
  dropdowns,
};
