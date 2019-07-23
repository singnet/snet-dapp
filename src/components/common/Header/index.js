import React from "react";
import { connect } from "react-redux";

import Logo from "../../../assets/images/Logo_Footer_White.svg";
import { useStyles } from "./styles";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions";
import Title from "./Title";
import MobileHeader from "./MobileHeader";
import { NavData } from "../../../utility/constants/Header";

const Header = ({ isLoggedIn }) => {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoSection}>
          <MobileHeader data={NavData} isLoggedIn={isLoggedIn} />
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
