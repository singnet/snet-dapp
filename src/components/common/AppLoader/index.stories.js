import React from "react";
import { storiesOf } from "@storybook/react";
import { AppLoader } from "./";

storiesOf("AppLoader", module).add("_default", () => (
  <AppLoader loading loaderHeader="Sample Header" loaderText="Sample Text" />
));
