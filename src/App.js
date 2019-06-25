import React, { Component } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Routes from "./utility/stringConstants/Routes";
import ForgotPasswordSubmit from "./components/Login/ForgotPasswordSubmit";
import { aws_config } from "./aws_config";
import theme from "./assets/Theme";
import asyncComponent from "./components/common/AsyncComponent";

const ForgotPassword = asyncComponent(() => import("./components/Login/ForgotPassword"));
const Onboarding = asyncComponent(() => import("./components/Onboarding"));
const PageNotFound = asyncComponent(() => import("./components/PageNotFound"));
const AiMarketplace = asyncComponent(() => import("./components/AiMarketplace"));
const SignUp = asyncComponent(() => import("./components/Login/Signup"));
const Login = asyncComponent(() => import("./components/Login"));

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
