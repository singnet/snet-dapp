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
  { title: "AI Marketplace", link: `/${Routes.AI_MARKETPLACE}` },
  { title: "Get Started", link: `/${Routes.GET_STARTED}` },
];

const dropdowns = [
  {
    label: "Resources",
    list: [
      { label: "Documentation", link: "https://github.com/singnet", newTab: true },
      { label: "Telegram", link: "https://telegram.me/singularitynet", newTab: true },
      { label: "Forum", link: "https://community.singularitynet.io/", newTab: true },
      { label: "Blog", link: "http://blog.singularitynet.io/", newTab: true },
    ],
  },
];

export const NavData = {
  tabs,
  dropdowns,
};
