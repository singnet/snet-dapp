import { useRef, useCallback, useEffect } from "react";
import { SANDBOX_CONFIG } from "./data";
import { usePostMessageChannel } from "sandbox-common/src/PostMessageChannel/usePostMessageChannel";
import { useFds } from "./useFds";
import { useGrpcRequestQueue } from "./useGrpcRequestQueue";
import { unaryDynamic } from "./grpcUtils";
import { configuration } from "../mock/configuration";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import ServiceLoadingProgress from "./ServiceLoadingProgress";

function setHeightOfIframe(iframeRef, iframeMaxHeight) {
  const iframeStyles = window.getComputedStyle(iframeRef.current);
  const height =
    iframeMaxHeight +
    Number(iframeStyles.borderTopWidth.slice(0, -2)) +
    Number(iframeStyles.borderBottomWidth.slice(0, -2)) +
    Number(iframeStyles.paddingTop.slice(0, -2)) +
    Number(iframeStyles.paddingBottom.slice(0, -2));
  iframeRef.current.style.height = `${height}px`;
}

function Sandbox({ classes, serviceClient, serviceUrl, serviceFdsUrl, onError, isComplete, serviceName }) {
  const iframeRef = useRef(null);
  const url = new URL(serviceUrl);
  const serviceOrigin = url.origin;

  const { fds, isFdsLoadStateErrored, fdsLoadStateId } = useFds(serviceFdsUrl, onError);
  const callGrpc = useCallback(
    /**
     *
     * @param {*} fds the root of reflection tree created by protobufjs from FileDescriptorSet. Contains the described types (messages, services). Provides methods for encoding and decoding gRPC binary requests/responses.
     * @param {*} send from usePostMessageChannel. Allows sending messages to sandboxed iframe.
     * @param {Object} payload payload from sandboxed iframe
     * @param payload.serviceFqn service Full Qualified Name for grpc
     * @param payload.methodName grpc method name
     * @param payload.requestObj js plain object which is used to build grpc request
     * @param payload.postMessageMetadata metadata which is used by postMessage channel for consistency. This is not related to grpc.
     * @param payload.options grpc options (not implemented yet)
     */
    (fds, { send, payload }) => {
      console.log("callGrpc: payload=", payload, "fds=", fds);
      //TODO: unart args by fds and request
      const onActionEnd = (response) => {
        console.log("onActionEnd: response=", response);
        const { message, status, statusMessage } = response;
        send("CALL_GRPC_RESPONSE", {
          correlationId: payload.postMessageMetadata.correlationId, //must be presented in response
          status, //must be presented in response
          statusMessage,
          messageAsObject: message, //plain js object representing a grpc response for further transmission via postMessage
        });
      };
      unaryDynamic(serviceClient, fds, payload.serviceFqn, payload.methodName, payload.requestObj, onActionEnd);
    },
    [serviceClient]
  );
  const { addRequest } = useGrpcRequestQueue(fds, callGrpc);

  /* /fds loading */

  const { isConnected, send } = usePostMessageChannel({
    channel: "sandbox-channel",
    getTargetWindow: useCallback(() => iframeRef.current?.contentWindow ?? null, []),
    targetOrigin: serviceOrigin,
    handlers: {
      CALL_GRPC_REQUEST(send, payload) {
        console.log("[Sandbox outer] CALL_GRPC_REQUEST: payload=", payload);
        console.log(payload);
        addRequest({ send, payload });
      },
      SET_IFRAME_HEIGHT(send, payload) {
        setHeightOfIframe(iframeRef, payload);
      },
    },
    debug: true,
    debugPrefix: "Parent-",
  });

  useEffect(() => {
    send("SET_IS_COMPLETE", isComplete);
  }, [isComplete, send]);

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
      <h2>h2 Test</h2>
      <div className={classes.iframeWrapper}>
        <iframe
          title="service"
          className={classes.serviceIframe}
          ref={iframeRef}
          src={serviceUrl}
          sandbox={SANDBOX_CONFIG.SANDBOX_ATTRIBUTE}
          allow={SANDBOX_CONFIG.ALLOW_ATTRIBUTE}
        />
        {!isConnected && <ServiceLoadingProgress serviceName={serviceName} />}
      </div>
    </>
  );
}
export default withStyles(useStyles)(Sandbox);
