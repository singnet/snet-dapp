import React from "react";
import { addDecorator } from "@storybook/react";

import theme from "../assets/Theme";
import ProviderWrapper from "./Providers";

const withProviders = story => <ProviderWrapper theme={theme}>{story()}</ProviderWrapper>;

addDecorator(withProviders);
