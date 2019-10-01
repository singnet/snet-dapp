import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import InlineLoader from "./";

storiesOf("InlineLoader", module)
  .addParameters({ props: { propTables: [InlineLoader] } })
  .addDecorator(withLiveEditScope({ React, InlineLoader }))
  .addLiveSource("live source", `return <InlineLoader loading="true" />`);
