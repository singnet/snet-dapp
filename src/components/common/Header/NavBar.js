import React from "react";
import { withRouter } from "react-router-dom";

import { useStyles } from "./styles";
import NavItem from "./NavItem";
import StyledMenu from "../StyledMenu";

const NavBar = ({ data, history }) => {
  const classes = useStyles();

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.tabs.map(tab => (
          <NavItem key={tab.title} title={tab.title} link={tab.link} />
        ))}
        {data.dropdowns.map(dropdown => (
          <div key={dropdown.label} className={classes.headerDropDown}>
            <StyledMenu label={dropdown.label} list={dropdown.list} />
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
