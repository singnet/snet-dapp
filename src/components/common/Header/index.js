import React from "react";
import { connect } from "react-redux";

import Logo from "../../../assets/images/Logo.png";
import { useStyles } from "./styles";
import { NavData } from "./data";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions";
import Title from "./Title";

const Header = ({ isLoggedIn }) => {
  const classes = useStyles();

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoSection}>
          <div className={classes.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Title Logo={Logo} title="SingularityNET" />
        </div>
        <div className={classes.navigationSection}>
          <NavBar data={NavData} />
        </div>
        <div className={classes.loginBtnsSection}>
          <HeaderActions isLoggedIn={isLoggedIn} />
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({ isLoggedIn: state.userReducer.login.isLoggedIn });

export default connect(mapStateToProps)(Header);
