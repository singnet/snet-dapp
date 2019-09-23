import React from "react";
import { addDecorator } from "@storybook/react";
import { createBrowserHistory } from "history";

import theme from "../assets/Theme";
import configureStore from "../Redux/Store";
import ProviderWrapper from "./Providers";

// Global Configs
const store = configureStore();
const history = createBrowserHistory();

const withProviders = story => (
  <ProviderWrapper store={store} theme={theme} history={history}>
    {story()}
  </ProviderWrapper>
);

addDecorator(withProviders);
