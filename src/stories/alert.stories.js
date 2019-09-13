import React from "react";
import { muiTheme } from "storybook-addon-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { storiesOf, addDecorator } from "@storybook/react";
import AlertText from "../components/common/AlertText";
import { alertTypes } from "../components/common/AlertBox";
import theme from "../assets/Theme";

// const theme = theme;

storiesOf("Sample")
  //   .addDecorator(muiTheme([theme]))
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add("_default", () => <AlertText>Hello</AlertText>);
