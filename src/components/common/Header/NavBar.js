import React from "react";
import { withRouter } from "react-router-dom";

//import StyledDropdown from "../StyledDropdown/";
import { useStyles } from "./styles";
import NavItem from "./NavItem";
import Routes from "../../../utility/constants/Routes";

const NavBar = ({ data, history }) => {
  const classes = useStyles();

  const isActiveTab = link => {
    if (history.location.pathname === "/") {
      return link === `/${Routes.AI_MARKETPLACE}`;
    }
    return link === history.location.pathname;
  };

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.tabs.map(tab => (
          <NavItem
            key={tab.title}
            title={tab.title}
            link={tab.link}
            active={isActiveTab(tab.link)}
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

export default withRouter(NavBar);
