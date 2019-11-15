import React from "react";
import { storiesOf } from "@storybook/react";
import StyledButton from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("StyledButton", module)
  .addParameters({ props: { propTables: [StyledButton] } })
  .addDecorator(withLiveEditScope({ React, StyledButton }))
  .addLiveSource("live source", `return <StyledButton type="blue" btnText="Blue" />`);
