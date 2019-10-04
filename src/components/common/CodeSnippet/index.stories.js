import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import CodeSnippet from "./";
import Function from "./Function";
import Key from "./Key";
import ValueString from "./ValueString";
import ValueNumber from "./ValueNumber";

storiesOf("Code Snippet | Snippet", module)
  .addParameters({ props: { propTables: [CodeSnippet] } })
  .addDecorator(withLiveEditScope({ React, CodeSnippet, Function, Key, ValueNumber, ValueString }))
  .addLiveSource(
    "live source",
    `return (
    	<CodeSnippet> 
          const <Function text="acitveWallets" />  = () => [
          <br />
          {"{"}"<Key text="address" />":"<ValueString text="1aa5cmqmvQq8YQTEqcTmW7dfBNuFwgdCD" />"{"}"}
          <br />
          {"{"}"<Key text="balance" />":"<ValueNumber number="0.005" />"{"}"},
    	  <br />
   		  {"{"}"<Key text="address" />":"<ValueString text="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" />"{"}"}
          <br />
          {"{"}"<Key text="balance" />":"<ValueNumber number="2.325" />"{"}"},
    	  <br />
          ]
      </CodeSnippet>
     )`
  );
