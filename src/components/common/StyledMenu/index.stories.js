import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import StyledMenu from "./";

const sampleList = [
  { label: "Sample Same tab", link: "https://github.com/singnet", newTab: false },
  { label: "Sample New tab", link: "https://telegram.me/singularitynet", newTab: true },
];

storiesOf("StyledMenu", module)
  .addParameters({ props: { propTables: [StyledMenu] } })
  .addDecorator(withLiveEditScope({ React, StyledMenu, sampleList }))
  .addLiveSource("live source", `return <StyledMenu label="Button Label" list={sampleList} />`);
