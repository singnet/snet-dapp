import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";

const NavItem = ({ title, link }) => {
  const classes = useStyles();

  return (
    <li className={classes.navLinks}>
      <NavLink to={link || "#"} className={classes.navLinksAnchor}>
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
