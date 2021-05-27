import React from "react";
import { Route } from "react-router-dom";
import Routes from "../src/utility/constants/Routes";

export default (
  <Route>
    <Route path={`/${Routes.SIGNUP}`} />
    <Route path={`/${Routes.LOGIN}`} />
    <Route path={`/${Routes.FORGOT_PASSWORD}`} />
    <Route path={`/${Routes.FORGOT_PASSWORD_SUBMIT}`} />
    <Route path={`/${Routes.RESET_PASSWORD}`} />
    <Route path={`/${Routes.RESET_PASSWORD_SUBMIT}`} />
    <Route path={`/${Routes.ONBOARDING}`} />
    <Route path={`/${Routes.AI_MARKETPLACE}`} />
    <Route path={`/${Routes.SERVICE_DETAILS}/org/:orgId/service/:serviceId`} />
    <Route path={`/${Routes.USER_PROFILE}/:activeTab?`} />
    <Route path="/" exact />
    <Route path={`/${Routes.GET_STARTED}`} />
  </Route>
);
