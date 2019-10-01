import React from "react";
import { storiesOf } from "@storybook/react";
import Function from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("Function", module)
  .addParameters({ props: { propTables: [Function] } })
  .addDecorator(withLiveEditScope({ React, Function }))
  .addLiveSource("live source", `return <Function text="Function component of Code Snippet" />`);
