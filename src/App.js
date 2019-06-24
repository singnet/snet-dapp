import React, { Component } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import "./App.css";
import Routes from "./utility/stringConstants/Routes";
import ForgotPassword from "./components/Login/ForgotPassword";
import ForgotPasswordSubmit from "./components/Login/ForgotPasswordSubmit";
import Onboarding from "./components/Onboarding";
import PageNotFound from "./components/PageNotFound";
import AiMarketplace from "./components/AiMarketplace";
import SignUp from "./components/Login/Signup";
import Login from "./components/Login";
import { aws_config } from "./aws_config";
import theme from "./assets/Theme";

Amplify.configure(aws_config);

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path={`/${Routes.SIGNUP}`} component={SignUp} />
                        <Route path={`/${Routes.LOGIN}`} component={Login} />
                        <Route path={`/${Routes.FORGOT_PASSWORD}`} component={ForgotPassword} />
                        <Route path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`} component={ForgotPasswordSubmit} />
                        <Route path={`/${Routes.ONBOARDING}`} component={Onboarding} />
                        <Route path={`/${Routes.AI_MARKETPLACE}`} component={AiMarketplace} />
                        <Route path="/" exact component={AiMarketplace} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
