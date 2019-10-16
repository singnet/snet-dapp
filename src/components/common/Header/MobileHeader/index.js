import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { stylesActions } from "../../../../Redux/actionCreators";
import CloseIcon from "@material-ui/icons/Close";

import HeaderActions from "../HeaderActions";
import NavItem from "../NavItem";
import { useStyles } from "./styles";

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
    <Fragment>
      <div className={classes.mobileNavContainer}>
        <div className={classes.closeMenuIcon}>
          <CloseIcon onClick={toggleMobileMenu} />
        </div>
        <nav className={classes.mobileNavigation}>
          <ul>
            {data.tabs.map(tab => (
              <NavItem key={tab.title} title={tab.title} link={tab.link} active={tab.active} />
            ))}
            {data.dropdowns.map(dropdown => (
              <div key={dropdown.label} className={classes.subMenues}>
                <Fragment>
                  <NavItem title={dropdown.label} subHeader />
                  {dropdown.list.map(item => (
                    <NavItem key={item.label} title={item.label} link={item.link} subListItem />
                  ))}
                </Fragment>
              </div>
            ))}
          </ul>
          <div className={`${classes.mobileActionBtns} ${isLoggedIn ? classes.loggedInState : ""}`}>
            <HeaderActions isLoggedIn={isLoggedIn} />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  updateHamburgerState: hamburgerState => dispatch(stylesActions.updateHamburgerState(hamburgerState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MobileHeader));
