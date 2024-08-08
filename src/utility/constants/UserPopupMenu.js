import { signOut } from "../../Redux/actionCreators/UserActions";

import SettingIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import TransactionIcon from "../../assets/images/transaction_icon.svg";
// import ModelsIcon from "../../assets/images/models_icon.svg";
import { userProfileRoutes } from "../../components/UserProfile";

export const UserMenuList = [
  {
    menuIcon: AccountCircleIcon,
    menuTitle: "Account",
    menuLink: userProfileRoutes.ACCOUNT,
  },
  {
    menuIcon: SettingIcon,
    menuTitle: "Settings",
    menuLink: userProfileRoutes.SETTINGS,
  },
  {
    menuIcon: SettingIcon,
    menuTitle: "Transactions",
    menuLink: userProfileRoutes.TRANSACTIONS,
  },
];

// if (process.env.REACT_APP_TRAINING_ENABLE === "true") {
//   UserMenuList.push({
//     menuIcon: SettingIcon,
//     menuTitle: "Models",
//     menuLink: `${Routes.USER_PROFILE}/models`,
//   });
// }

export const UserMenuActionList = [
  {
    menuIcon: ExitToAppIcon,
    menuTitle: "Sign out",
    action: signOut,
  },
];
