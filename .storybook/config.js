import { configure, setAddon, addDecorator } from "@storybook/react";
import LiveEdit, { setOptions } from "storybook-addon-react-live-edit";
import { withPropsTable } from "storybook-addon-react-docgen";

// React-live-edit
setOptions({ theme: "darcula", presets: ["react"] });
setAddon(LiveEdit);

//React-docgen
addDecorator(withPropsTable);

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
