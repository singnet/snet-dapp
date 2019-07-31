import React from "react";
import { Link } from "react-router-dom";
const UserMenuItem = ({ classes, icon: Icon, title, linkTo }) => {
  return (
    <li>
      <Link to={`/${linkTo}`}>
        <Icon className={classes.icon} />
        <span className={classes.title}>{title}</span>
      </Link>
    </li>
  );
};
export default UserMenuItem;
