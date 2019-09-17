import React from "react";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";

const ProviderWrapper = ({ children, store, theme, history }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>{children}</Router>
    </ThemeProvider>
  </Provider>
);

export default ProviderWrapper;
