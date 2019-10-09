import React from "react";
import { storiesOf } from "@storybook/react";
import ValueNumber from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("Code Snippet | ValueNumber", module)
  .addParameters({ props: { propTables: [ValueNumber] } })
  .addDecorator(withLiveEditScope({ React, ValueNumber }))
  .addLiveSource("live source", `return <ValueNumber number="Value of the object - Number" />`);
