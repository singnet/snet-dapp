import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import CodeSnippet from "./";
import Function from "./Function";
import Key from "./Key";
import ValueString from "./ValueString";
import ValueNumber from "./ValueNumber";

storiesOf("CodeSnippet", module)
  .addParameters({ props: { propTables: [CodeSnippet] } })
  .addDecorator(withLiveEditScope({ React, CodeSnippet, Function, Key, ValueNumber, ValueString }))
  .addLiveSource(
    "live source",
    `return (
    	<CodeSnippet> 
    		<Function text="Function" /> 
    		<Key text="Function" />
    		<ValueNumber number="25" />
    		<ValueString text="Function" />
    	</CodeSnippet>)`
  );
