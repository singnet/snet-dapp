import React, { lazy } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Routes from "../../utility/stringConstants/Routes";
import withRegistrationHeader from "../HOC/WithRegistrationHeader";
import { HeaderData } from "../../utility/stringConstants/Header";

const Login = lazy(() => import("../Login"));

const PrivateRoute = props => {
    if (props.isLoggedIn) {
        return <Route {...props} />;
    }
    return <Route path={`/${Routes.LOGIN}`} component={withRegistrationHeader(Login, { ...HeaderData.LOGIN })} />;
};

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
