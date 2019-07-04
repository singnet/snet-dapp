import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import UserMenuItem from "./UserMenuItem";
import { useStyles } from "./styles";

class UserMenu extends Component {
  state = {
    userMenuItemList: [
      {
        menuIcon: "fas fa-user-circle",
        menuTitle: "Account",
        menuLink: "/",
      },
      {
        menuIcon: "fas fa-cog",
        menuTitle: "Settings",
        menuLink: "/",
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
      {
        menuIcon: "fas fa-sign-out-alt",
        menuTitle: "Sign out",
        menuLink: "/",
      },
    ],
  };

  render() {
    const { classes } = this.props;
    const { userMenuItemList } = this.state;
    return (
      <ul className={classes.userMenuItemList}>
        {userMenuItemList.map((item, index) => (
          <UserMenuItem icon={item.menuIcon} title={item.menuTitle} linkTo={item.menuLink} />
        ))}
      </ul>
    );
  }
}

export default withStyles(useStyles)(UserMenu);
