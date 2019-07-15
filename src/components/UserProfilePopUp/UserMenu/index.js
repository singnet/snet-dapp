import React from "react";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";

import UserMenuItem from "./UserMenuItem";
import { useStyles } from "./styles";
import { UserMenuList, UserMenuActionList } from "../../../utility/constants/UserPopupMenu";
import UserMenuAction from "./UserMenuAction";

const UserMenu = ({ classes }) => {
  return (
    <ul className={classes.userMenuItemList}>
      {UserMenuList.map(menu => (
        <UserMenuItem key={menu.menuTitle} icon={menu.menuIcon} title={menu.menuTitle} linkTo={menu.menuLink} />
      ))}
      <Divider />
      {UserMenuActionList.map(action => (
        <UserMenuAction key={action.Title} icon={action.menuIcon} title={action.menuTitle} action={action.action} />
      ))}
    </ul>
  );
};

export default withStyles(useStyles)(UserMenu);
