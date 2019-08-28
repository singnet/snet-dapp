import Routes from "./Routes";
import { signOut } from "../../Redux/actionCreators/UserActions";

import SettingIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export const UserMenuList = [
  {
    menuIcon: AccountCircleIcon,
    menuTitle: "Account",
    menuLink: `${Routes.USER_PROFILE}/account`,
  },
  {
    menuIcon: SettingIcon,
    menuTitle: "Settings",
    menuLink: `${Routes.USER_PROFILE}/settings`,
  },
];

export const UserMenuActionList = [
  {
    menuIcon: ExitToAppIcon,
    menuTitle: "Sign out",
    action: signOut,
  },
];
