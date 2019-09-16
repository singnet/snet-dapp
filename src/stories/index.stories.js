import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/styles";

import theme from "../assets/Theme";

// Global Configs

const MUIDecorator = story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>;
addDecorator(MUIDecorator);
