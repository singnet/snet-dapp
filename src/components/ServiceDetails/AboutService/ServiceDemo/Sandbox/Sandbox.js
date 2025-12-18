import { useRef } from "react";
import { SANDBOX_CONFIG } from "./data";
import "./Sandbox.css";
import { usePostMessageChannel } from "./PostMessageChannel/usePostMessageChannel";

export function Sandbox({ serviceUrl }) {
  const iframeRef = useRef(null);
  const url = new URL(serviceUrl);
  const serviceOrigin = url.origin;

  //eslint-disable-next-line
  const { send, isConnected } = usePostMessageChannel({
    channel: "sandbox-channel",
    getTargetWindow: () => iframeRef.current?.contentWindow ?? null,
    targetOrigin: serviceOrigin,
    handlers: {
      PING_FROM_IFRAME(payload) {
        console.log("Parent received PING_FROM_IFRAME:", payload);
      },
      SOME_EVENT(payload) {
        console.log("Parent received SOME_EVENT:", payload);
      },
      CALL_GRPC_REQUEST(payload) {
        console.log("[Sandbox outer] CALL_GRPC_REQUEST: payload=", payload);

        //TODO: call grpc

        setTimeout(() => {
          send("CALL_GRPC_RESPONSE", {
            correlationId: payload.correlationId, //must be presented in response
            code: 0, //must be presented in response
            data: "response payload data",
          });
        }, 3000);
      },
    },
    debug: true,
    debugPrefix: "Parent-",
  });

  return (
    <>
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
