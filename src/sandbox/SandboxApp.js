import React, { Component, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";

import Routes from "../utility/constants/Routes";
import theme from "../assets/Theme";
import withInAppWrapper from "../components/HOC/WithInAppHeader";
import ServiceDetails from "../components/ServiceDetails";

class SandboxApp extends Component {
  render() {
    const { hamburgerMenu } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={hamburgerMenu ? "hide-overflow" : null}>
          <Router>
            <Switch>
              <Route
                path={`/${Routes.SERVICE_DETAILS}/:service_row_id`}
                {...this.props}
                component={withInAppWrapper(ServiceDetails)}
              />
              <Redirect exact from="/" to={`/${Routes.SERVICE_DETAILS}/1`} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

export default connect(mapStateToProps)(SandboxApp);
