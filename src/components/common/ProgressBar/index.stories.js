import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import ProgressBar from "./";

const sampleList = ["completed", "active", "idle"];

storiesOf("Progress | ProgressBar", module)
  .addParameters({ props: { propTables: [ProgressBar] } })
  .addDecorator(withLiveEditScope({ React, ProgressBar, sampleList }))
  .addLiveSource("live source", `return <ProgressBar activeSection="2" progressText={sampleList} />`);
