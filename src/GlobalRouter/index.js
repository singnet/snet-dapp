import { Suspense } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

import NavigateSetter from "@utility/HistoryHelper";
import PrivateRoute from "@components/common/PrivateRoute";
import AppCircularLoader from "@components/common/AppCircularLoader";
import { createRoutesConfig } from "./RouteConfig";
import { useSelector } from "react-redux";

ReactGA.initialize({ trackingId: process.env.REACT_APP_GA_TRACKING_ID });

const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const GlobalRouter = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const isTermsAccepted = useSelector((state) => state.userReducer.isTermsAccepted);

  const ROUTE_CONFIG = createRoutesConfig({ isLoggedIn, isTermsAccepted });

  return (
    <Router location={history}>
      <NavigateSetter />
      <Suspense fallback={<AppCircularLoader />}>
        <Switch>
          {ROUTE_CONFIG.map((route) =>
            route.isPrivate ? (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute
                    isAllowed={route.isAllowed}
                    component={route.component}
                    redirectTo={route.redirectTo}
                    path={route.path}
                  />
                }
              />
            ) : (
              <Route key={route.path} path={route.path} Component={route.component} />
            )
          )}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default GlobalRouter;
