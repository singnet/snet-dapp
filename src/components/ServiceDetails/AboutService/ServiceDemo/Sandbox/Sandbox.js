import { useRef, useCallback } from "react";
import { SANDBOX_CONFIG } from "./data";
import "./Sandbox.css";
import { usePostMessageChannel } from "./PostMessageChannel/usePostMessageChannel";
import { useFds } from "./useFds";
import { useGrpcRequestQueue } from "./useGrpcRequestQueue";
import { unaryDynamic } from "./grpcUtils";

export function Sandbox({ serviceClient, serviceUrl, serviceFdsUrl }) {
  const iframeRef = useRef(null);
  const url = new URL(serviceUrl);
  const serviceOrigin = url.origin;

  const { fds, isFdsLoadStateErrored, fdsLoadStateId, fdsLoadStateError } = useFds(serviceFdsUrl);

  const callGrpc = useCallback(
    /**
     * @param {*} send - from usePostMessageChannel; request - TODO: describe request
     */
    ({ send, payload }) => {
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
    [serviceClient, fds]
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
        addRequest({ send, payload });
      },
    },
    debug: true,
    debugPrefix: "Parent-",
  });

  return (
    <>
      fdsLoadState: <span className={isFdsLoadStateErrored ? "bad" : "good"}>{fdsLoadStateId}</span>
      <br />
      {isFdsLoadStateErrored && <span className="bad">Error: {fdsLoadStateError.toString()}</span>}
      <br />
      isConnected: <span className={isConnected ? "good" : "bad"}>{isConnected.toString()}</span>
      <iframe
        title="service"
        className="service-iframe"
        ref={iframeRef}
        src={serviceUrl}
        sandbox={SANDBOX_CONFIG.SANDBOX_ATTRIBUTE}
        allow={SANDBOX_CONFIG.ALLOW_ATTRIBUTE}
      />
    </>
  );
}
