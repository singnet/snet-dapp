import React from "react";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { stylesActions } from "../../../../Redux/actionCreators";
import CloseIcon from "@mui/icons-material/Close";

import HeaderActions from "../HeaderActions";
import NavItem from "../NavItem";
import { useStyles } from "./styles";
import NavigateToMainPortalButton from "../NavigateToMainPortalButton";

const MobileHeader = ({ classes, data, isLoggedIn, hamburgerMenu, updateHamburgerState }) => {
  const toggleMobileMenu = () => {
    updateHamburgerState(!hamburgerMenu);
  };

  if (!hamburgerMenu) {
    return (
      <div className={classes.hamburger} onClick={toggleMobileMenu}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className={classes.mobileNavContainer}>
      <div className={classes.closeMenuIcon}>
        <CloseIcon onClick={toggleMobileMenu} />
      </div>
      <nav className={classes.mobileNavigation}>
        <ul>
          {data.tabs.map((tab) => (
            <NavItem key={tab.title} title={tab.title} link={tab.link} active={tab.active} />
          ))}
          {data.dropdowns.map((dropdown) => (
            <div key={dropdown.label} className={classes.subMenues}>
              <NavItem title={dropdown.label} subHeader />
              {dropdown.list.map((item) => (
                <NavItem key={item.label} title={item.label} link={item.link} subListItem />
              ))}
            </div>
          ))}
          <div className={classes.mainPortalButton}>
            <NavigateToMainPortalButton />
          </div>
        </ul>
      </nav>
      <div className={`${classes.mobileActionBtns} ${isLoggedIn ? classes.loggedInState : ""}`}>
        <HeaderActions />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = (dispatch) => ({
  updateHamburgerState: (hamburgerState) => dispatch(stylesActions.updateHamburgerState(hamburgerState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MobileHeader));
