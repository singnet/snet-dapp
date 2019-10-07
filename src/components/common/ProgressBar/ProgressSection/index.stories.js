import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import ProgressSection from "./";

storiesOf("Progress | ProgressSection", module)
  .addParameters({ props: { propTables: [ProgressSection] } })
  .addDecorator(withLiveEditScope({ React, ProgressSection }))
  .addLiveSource(
    "live source",
    `return <ProgressSection progressNumber="1" progressText="Progress Text" progressStatus="active"/>`
  );
