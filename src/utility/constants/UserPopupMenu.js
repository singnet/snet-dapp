import Routes from "./Routes";
import { signOut } from "../../Redux/actionCreators/UserActions";
export const UserMenuList = [
  {
    menuIcon: "fas fa-cog",
    menuTitle: "Settings",
    menuLink: Routes.USER_PROFILE,
  },
];

export const UserMenuActionList = [
  {
    menuIcon: "fas fa-sign-out-alt",
    menuTitle: "Sign out",
    action: signOut,
  },
];
