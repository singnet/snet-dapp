import { useRef, useCallback } from "react";
import { SANDBOX_CONFIG } from "./data";
import { usePostMessageChannel } from "./PostMessageChannel/usePostMessageChannel";
import { useFds } from "./useFds";
import { useGrpcRequestQueue } from "./useGrpcRequestQueue";
import { unaryDynamic } from "./grpcUtils";
import { configuration } from "../mock/configuration";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
// import "./Sandbox.css";

function Sandbox({ classes, serviceClient, serviceUrl, serviceFdsUrl, onError }) {
  const iframeRef = useRef(null);
  const url = new URL(serviceUrl);
  const serviceOrigin = url.origin;

  const { fds, isFdsLoadStateErrored, fdsLoadStateId } = useFds(serviceFdsUrl, onError);
  const callGrpc = useCallback(
    /**
     * @param {*} send - from usePostMessageChannel; request - TODO: describe request
     */
    (fds, { send, payload }) => {
      console.log("callGrpc: payload=", payload, "fds=", fds);
      //TODO: unart args by fds and request
      const onActionEnd = (response) => {
        const { message, status, statusMessage } = response;
        send("CALL_GRPC_RESPONSE", {
          correlationId: payload.postMessageMetadata.correlationId, //must be presented in response
          status, //must be presented in response
          statusMessage,
          data: message.getValue(),
        });
      };
      unaryDynamic(serviceClient, fds, payload.serviceFqn, payload.methodName, payload.requestObj, onActionEnd);
    },
    [serviceClient]
  );
  const { addRequest } = useGrpcRequestQueue(fds, callGrpc);

  /* /fds loading */

  const { isConnected } = usePostMessageChannel({
    channel: "sandbox-channel",
    getTargetWindow: () => iframeRef.current?.contentWindow ?? null,
    targetOrigin: serviceOrigin,
    handlers: {
      PING_FROM_IFRAME(send, payload) {
        console.log("Parent received PING_FROM_IFRAME:", payload);
      },
      SOME_EVENT(send, payload) {
        console.log("Parent received SOME_EVENT:", payload);
      },
      CALL_GRPC_REQUEST(send, payload) {
        console.log("[Sandbox outer] CALL_GRPC_REQUEST: payload=", payload);
        console.log(payload);
        addRequest({ send, payload });
      },
    },
    debug: true,
    debugPrefix: "Parent-",
  });

  return (
    <>
      {configuration.debug.showConnectionInfo && (
        <>
          fdsLoadState: <span className={isFdsLoadStateErrored ? classes.bad : classes.good}>{fdsLoadStateId}</span>
          <br />
        </>
      )}

      {configuration.debug.showConnectionInfo && (
        <>
          isConnected: <span className={isConnected ? classes.good : classes.bad}>{isConnected.toString()}</span>
          <br />
        </>
      )}
      <iframe
        title="service"
        className={classes.serviceIframe}
        ref={iframeRef}
        src={serviceUrl}
        sandbox={SANDBOX_CONFIG.SANDBOX_ATTRIBUTE}
        allow={SANDBOX_CONFIG.ALLOW_ATTRIBUTE}
      />
    </>
  );
}
export default withStyles(useStyles)(Sandbox);
