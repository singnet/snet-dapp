import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";

import UserMenuItem from "./UserMenuItem";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

class UserMenu extends Component {
  state = {
    userMenuItemList: [
      // {
      //   menuIcon: "fas fa-user-circle",
      //   menuTitle: "Account",
      //   menuLink: "/",
      // },
      {
        menuIcon: "fas fa-cog",
        menuTitle: "Settings",
        menuLink: Routes.USER_PROFILE,
      },
      // {
      //   menuIcon: "fas fa-project-diagram",
      //   menuTitle: "My AI Services",
      //   menuLink: "/",
      // },
      // {
      //   menuIcon: "fas fa-user-friends",
      //   menuTitle: "Teams",
      //   menuLink: "/",
      // },
      // {
      //   menuIcon: "fas fa-user-circle",
      //   menuTitle: "Request Developer's Account",
      //   menuLink: "/",
      // },
    ],
    userActions: [
      {
        menuIcon: "fas fa-sign-out-alt",
        menuTitle: "Sign out",
        menuLink: "/",
      },
    ],
  };

  render() {
    const { classes } = this.props;
    const { userMenuItemList, userActions } = this.state;
    return (
      <ul className={classes.userMenuItemList}>
        {userMenuItemList.map(menu => (
          <UserMenuItem key={menu.menuTitle} icon={menu.menuIcon} title={menu.menuTitle} linkTo={menu.menuLink} />
        ))}
        <Divider />
        {userActions.map(action => (
          <UserMenuItem key={action.Title} icon={action.menuIcon} title={action.menuTitle} linkTo={action.menuLink} />
        ))}
      </ul>
    );
  }
}

export default withStyles(useStyles)(UserMenu);
