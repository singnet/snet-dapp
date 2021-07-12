import React from "react";
import { withStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";
import CodeSnippet from "../../../common/CodeSnippet";
import StyledButton from "../../../common/StyledButton";
import DownloadMedia from "../../../../utility/MediaHelper";

const Python = ({ classes, description, orgId, serviceId }) => {
const { media } = useSelector(state => state.serviceDetailsReducer.details);

const downloadIntegrationFiles = () => {
   DownloadMedia(media, "grpc-stub/python", "python.zip");
};

  return (
    <section className={classes.languageTabSection}>
      <div className={classes.descriptionBtnsContainer}>
        <p>{description}</p>
        <div className={classes.btnContainer}>
          <StyledButton type="blue" btnText="Download Integration files" onClick={downloadIntegrationFiles} />
          <StyledButton type="transparent" btnText="view tutorial" href="https://dev.singularitynet.io/docs/ai-consumers/sdk-tutorial/" target="_blank"/>
        </div> 
      </div>
      <div className={classes.setingUpFilesContainer}>
        <h3>Setting Up Files</h3>
        <div>
          <span>Install the SDK using PIP</span>
          <CodeSnippet>pip install snet.sdk</CodeSnippet>
        </div>
        <div>
          <span>
            To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you
            can install using pip
          </span>
          <CodeSnippet>pip install snet-cli</CodeSnippet>
        </div>
        <div>
          <span>Run the code</span>
          <CodeSnippet>
            from snet.sdk import SnetSDK <br />
            # Download and copy the stubs in the root folder. <br />
            # /root_folder/&#60;stub&#62;_pb2.py <br />
            # /root_folder/&#60;stub&#62;_pb2_grpc.py <br />
            import &#60;stub&#62;_pb2 <br />
            import &#60;stub&#62;_pb2_grpc <br />
            <br />
            def invoke_service(): <br />
            &nbsp;&nbsp;&nbsp;&nbsp;config =&#123; <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"private_key": "&#60;your wallet's private key&#62;", <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"eth_rpc_endpoint": "https://ropsten.infura.io/v3/&#60;your infura
            key&#62;", <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org_id": "{orgId}", <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"service_id": "{serviceId}", <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;sdk = SnetSDK(config=config) <br />
            &nbsp;&nbsp;&nbsp;&nbsp;# Initiate service client with your organization and sevice details and the service
            stub you want to invoke <br />
            &nbsp;&nbsp;&nbsp;&nbsp;service_client = sdk.create_service_client( <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;org_id=config["org_id"], <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service_id=config["service_id"], <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service_stub=&#60;stub&#62;_pb2_grpc.&#60;service_stub&#62; <br />
            &nbsp;&nbsp;&nbsp;&nbsp;) <br />
            &nbsp;&nbsp;&nbsp;&nbsp;request = &#60;stub&#62;_pb2.&#60;method_name&#62;(&#60;arguments&#62;) <br />
            &nbsp;&nbsp;&nbsp;&nbsp;response = service_client.service.add(request) <br />
            &nbsp;&nbsp;&nbsp;&nbsp;print("service invoked successfully") <br />
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(Python);
