import React from "react";

//import StyledDropdown from "../StyledDropdown/";
import { useStyles } from "./styles";
import NavItem from "./NavItem";

const NavBar = ({ data }) => {
  const classes = useStyles();
  return (
    <nav>
      <ul className={classes.navUl}>
        {data.tabs.map(tab => (
          <NavItem
            key={tab.title}
            title={tab.title}
            link={tab.link}
            active={tab.active}
            openInNewTab={tab.openInNewTab}
          />
        ))}
        {/*data.dropdowns.map(dropdown => (
          <li key={dropdown.label} className={classes.navLinksDropDown}>
            <StyledDropdown labelTxt={dropdown.label} list={dropdown.list} />
          </li>
        ))*/}
      </ul>
    </nav>
  );
};

export default NavBar;
