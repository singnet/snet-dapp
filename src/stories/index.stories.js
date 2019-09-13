import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { ThemeProvider } from "@material-ui/styles";

import { Button, Welcome } from "@storybook/react/demo";
import theme from "../assets/Theme";

// Global Configs

const MUIDecorator = story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>;
addDecorator(MUIDecorator);

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
  .add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
