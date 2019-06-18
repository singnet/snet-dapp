import React, { Component } from "react";
import Amplify from "aws-amplify";
import { aws_config } from "./aws_config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import AiMarketplace from "./components/AiMarketplace/index.js";
import SignUp from "./components/Login/signup.js";
import Login from "./components/Login";

//  material ui theme
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme.js";

import "./App.css";
import Routes from "./utility/stringConstants/routes";
import Verify from "./components/Login/Verify";
import ForgotPassword from "./components/Login/forgotpassword";
import ForgotPasswordSubmit from "./components/Login/ForgotPasswordSubmit";
import PageNotFound from "./components/PageNotFound";

Amplify.configure(aws_config);

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path={`/${Routes.SIGNUP}`} component={SignUp} />
            <Route path={`/${Routes.LOGIN}`} component={Login} />
            <Route path={`/${Routes.VERIFY}`} component={Verify} />
            <Route
              path={`/${Routes.FORGOT_PASSWORD}`}
              component={ForgotPassword}
            />
            <Route
              path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`}
              component={ForgotPasswordSubmit}
            />
            <Route
              path={`/${Routes.AI_MARKETPLACE}`}
              component={AiMarketplace}
            />
            <Route path="/" exact component={AiMarketplace} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
