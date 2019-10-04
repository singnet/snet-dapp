import React from "react";
import { storiesOf } from "@storybook/react";
import ValueString from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("Code Snippet | ValueString", module)
  .addParameters({ props: { propTables: [ValueString] } })
  .addDecorator(withLiveEditScope({ React, ValueString }))
  .addLiveSource("live source", `return <ValueString text="Value of the object - String" />`);
