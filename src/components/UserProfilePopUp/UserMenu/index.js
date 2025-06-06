import React from "react";
import { withStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";

import UserMenuItem from "./UserMenuItem";
import { useStyles } from "./styles";
import { UserMenuList, UserMenuActionList } from "../../../utility/constants/UserPopupMenu";
import UserMenuAction from "./UserMenuAction";

const UserMenu = ({ classes, handleClick }) => {
  return (
    <ul className={classes.userMenuItemList} onClick={handleClick}>
      {UserMenuList.map((menu) => (
        <UserMenuItem key={menu.menuTitle} icon={menu.menuIcon} title={menu.menuTitle} linkTo={menu.menuLink} />
      ))}
      <Divider />
      {UserMenuActionList.map((action) => (
        <UserMenuAction key={action.menuTitle} icon={action.menuIcon} title={action.menuTitle} action={action.action} />
      ))}
    </ul>
  );
};

export default withStyles(useStyles)(UserMenu);
