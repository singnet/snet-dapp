import React, { Component, lazy, Suspense } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Routes from "./utility/stringConstants/Routes";
import ForgotPasswordSubmit from "./components/Login/ForgotPasswordSubmit";
import { aws_config } from "./aws_config";
import theme from "./assets/Theme";

const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const Onboarding = lazy(() => import("./components/Onboarding"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const AiMarketplace = lazy(() => import("./components/AiMarketplace"));
const SignUp = lazy(() => import("./components/Login/Signup"));
const Login = lazy(() => import("./components/Login"));

Amplify.configure(aws_config);

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
