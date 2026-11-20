import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import * as Sentry from "@sentry/react";

import "./assets/icomoon.css";
import configureStore from "./Redux/Store";
import SnetApp from "./SnetApp";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [Sentry.replayIntegration()],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export const store = configureStore();

export const startApp = (root) => {
  root.render(
    <ReduxProvider store={store}>
      <SnetApp />
    </ReduxProvider>
  );
};
