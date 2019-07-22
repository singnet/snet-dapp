import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CodeSnippet from "../../../common/CodeSnippet";

const Python = ({ classes }) => {
  return (
    <section>
      <h2>Install</h2>
      <div>
        Install the SDK using PIP <br />
        <CodeSnippet>pip install snet.sdk</CodeSnippet>
      </div>
      <br />
      <div>
        To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can
        install using pip
        <CodeSnippet>pip install snet-cli</CodeSnippet>
      </div>
      <br />
      <div>
        Once you have the CLI installed, run the following command to generate gRPC stubs for service <br />
        <CodeSnippet>snet sdk generate-client-library python &lt;org_id&gt; &lt;service_id&gt;</CodeSnippet>
      </div>
      <br />
      <div>
        Run the code
        <CodeSnippet>
          <div>
            from snet.sdk import SnetSDK <br />
            import &lt;stub&gt;_pb2 <br />
            import &lt;stub&gt;_pb2_grpc <br />
            from config import config <br /> <br />
            sdk = SnetSDK(config) <br />
            service_client = sdk.create_service_client( <br />
            &lt;org_id&gt;, &lt;service_id&gt;, example_service_pb2_grpc.CalculatorStub) <br />
            request = example_service_pb2.Numbers(a=20, b=3) <br />
          </div>
        </CodeSnippet>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(Python);
