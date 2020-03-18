import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import StyledDropdown from "./";

const sampleList = [
  { label: "Sample tab 1", link: "https://github.com/singnet", newTab: false },
  { label: "Sample tab 2", link: "https://telegram.me/singularitynet", newTab: true },
];

storiesOf("StyledDropdown", module)
  .addParameters({ props: { propTables: [StyledDropdown] } })
  .addDecorator(withLiveEditScope({ React, StyledDropdown, sampleList }))
  .addLiveSource(
    "live source",
    `return <StyledDropdown labelTxt="Label Name" list={sampleList} inputLabel="Input Label" />`
  );
