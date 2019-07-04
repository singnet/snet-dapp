import React from "react";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserProfileTabs = ({ classes }) => {
  return (
    <div className={classes.ProfileTabsContainer}>
      <ul>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
          <Link>Account</Link>
        </li>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-cog")} />
          <Link>Settings</Link>
        </li>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-project-diagram")} />
          <Link>My AI Services</Link>
        </li>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-user-friends")} />
          <Link>Teams</Link>
        </li>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
          <Link>Request Developer's Account</Link>
        </li>
        <li>
          <Icon className={clsx(classes.icon, "fas fa-sign-out-alt")} />
          <Link>Sign out</Link>
        </li>
      </ul>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileTabs);
