import Routes from "./Routes";
import { signOut } from "../../Redux/actionCreators/UserActions";
import Settings from "@material-ui/icons/Settings";
export const UserMenuList = [
  {
    menuIcon: Settings,
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
