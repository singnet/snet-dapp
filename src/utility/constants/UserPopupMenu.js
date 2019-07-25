import Routes from "./Routes";
import { signOut } from "../../Redux/actionCreators/UserActions";

import SettingIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const UserMenuList = [
  {
    menuIcon: SettingIcon,
    menuTitle: "Settings",
    menuLink: Routes.USER_PROFILE,
  },
];

export const UserMenuActionList = [
  {
    menuIcon: ExitToAppIcon,
    menuTitle: "Sign out",
    action: signOut,
  },
];
