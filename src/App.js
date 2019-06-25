import React, { Component, lazy, Suspense } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Routes from "./utility/stringConstants/Routes";
import { aws_config } from "./aws_config";
import theme from "./assets/Theme";
import withRegistrationHeader from "./components/HOC/WithRegistrationHeader";
import { HeaderData } from "./utility/stringConstants/Header";
import withInAppWrapper from "./components/HOC/WithInAppHeader";

const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const ForgotPasswordSubmit = lazy(() => import("./components/Login/ForgotPasswordSubmit"));
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
                            <Route
                                path={`/${Routes.SIGNUP}`}
                                component={withRegistrationHeader(SignUp, { ...HeaderData.SIGNUP })}
                            />
                            <Route
                                path={`/${Routes.LOGIN}`}
                                component={withRegistrationHeader(Login, { ...HeaderData.LOGIN })}
                            />
                            <Route
                                path={`/${Routes.FORGOT_PASSWORD}`}
                                component={withRegistrationHeader(ForgotPassword, { ...HeaderData.FORGOT_PASSWORD })}
                            />
                            <Route
                                path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`}
                                component={withRegistrationHeader(ForgotPasswordSubmit, {
                                    ...HeaderData.FORGOT_PASSWORD_SUBMIT,
                                })}
                            />
                            <Route
                                path={`/${Routes.ONBOARDING}`}
                                component={withRegistrationHeader(Onboarding, { ...HeaderData.ONBOARDING })}
                            />
                            <Route path={`/${Routes.AI_MARKETPLACE}`} component={withInAppWrapper(AiMarketplace)} />
                            <Route path="/" exact component={withInAppWrapper(AiMarketplace)} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
