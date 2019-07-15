import Routes from "./Routes";

export const UserMenuList = [
  {
    menuIcon: "fas fa-user-circle",
    menuTitle: "Account",
    menuLink: "/",
  },
  {
    menuIcon: "fas fa-cog",
    menuTitle: "Settings",
    menuLink: Routes.USER_PROFILE,
  },
  {
    menuIcon: "fas fa-project-diagram",
    menuTitle: "My AI Services",
    menuLink: "/",
  },
  {
    menuIcon: "fas fa-user-friends",
    menuTitle: "Teams",
    menuLink: "/",
  },
  {
    menuIcon: "fas fa-user-circle",
    menuTitle: "Request Developer's Account",
    menuLink: "/",
  },
];

export const UserMenuActionList = [
  {
    menuIcon: "fas fa-sign-out-alt",
    menuTitle: "Sign out",
    menuLink: "/",
  },
];
