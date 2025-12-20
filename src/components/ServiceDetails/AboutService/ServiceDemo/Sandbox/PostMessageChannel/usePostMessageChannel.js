import * as React from "react";

const INTERVAL = 300; //ms

/**
 * @param {*} options handlers - handler(send, payload, event)
 */
export function usePostMessageChannel(options) {
  const { channel, getTargetWindow, targetOrigin = "*", handlers = {}, debug = false, debugPrefix } = options;

  const [isConnected, setIsConnected] = React.useState(false);

  const remoteReadyRef = React.useRef(false);
  const queueRef = React.useRef([]);
  const handlersRef = React.useRef(handlers);

  const log = React.useCallback(
    (...args) => {
      if (!debug) return;
      console.log(`[${debugPrefix}postMessageChannel]`, ...args);
    },
    [debug, debugPrefix]
  );

  const sendReadyEvent = React.useCallback(() => {
    const target = getTargetWindow();
    if (!target) return;

    const envelope = {
      __pm__: true,
      channel,
      kind: "READY",
    };

    target.postMessage(envelope, targetOrigin);
    log(`sent READY`);
  }, [getTargetWindow, targetOrigin, log, channel]);

  // We update handlersRef so that the listener always has the latest version.
  React.useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const flushQueue = React.useCallback(() => {
    if (!remoteReadyRef.current) return;
    if (!queueRef.current.length) return;

    const target = getTargetWindow();
    if (!target) return;

    log(`flush queue, size =`, queueRef.current.length);

    for (const env of queueRef.current) {
      target.postMessage(env, targetOrigin);
    }
    queueRef.current = [];
  }, [getTargetWindow, targetOrigin, log]);

  const send = React.useCallback(
    (eventType, payload) => {
      /**
       * kind: 'EVENT' | 'READY'
       * eventType: string
       */
      const envelope = {
        __pm__: true,
        channel,
        kind: "EVENT",
        eventType,
        payload,
      };

      if (!remoteReadyRef.current) {
        // The other side is not yet READY - we are accumulating
        queueRef.current.push(envelope);
        log("queued event", eventType, payload);
        return;
      }

      const target = getTargetWindow();
      if (!target) {
        // The target window is not yet ready - so we're accumulating the data.
        queueRef.current.push(envelope);
        log(`queued (no target) event`, eventType, payload);
        return;
      }

      target.postMessage(envelope, targetOrigin);
      log(`sent event`, eventType, payload);
    },
    [channel, getTargetWindow, targetOrigin, log]
  );

  // Event listener
  React.useEffect(() => {
    const handleMessage = (event) => {
      log(`handleMessage: event=`, event, event.data.kind);
      const data = event.data;

      if (!data || data.__pm__ !== true) return;
      if (data.channel !== channel) return;

      // Simple protection based on origin
      if (targetOrigin !== "*" && event.origin !== targetOrigin) {
        return;
      }

      if (!isConnected && data.kind === "READY") {
        log(`received READY`);
        remoteReadyRef.current = true;
        sendReadyEvent();
        setIsConnected(true);
        flushQueue();
        return;
      }

      if (data.kind === "EVENT") {
        const handler = handlersRef.current[data.eventType];
        log(`received EVENT`, data.eventType, data.payload);
        if (handler) {
          handler(send, data.payload, event);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [channel, targetOrigin, flushQueue, log, isConnected, sendReadyEvent]);

  // Handshake: we periodically send READY until we receive READY from the other side.
  React.useEffect(() => {
    // If already connected, do nothing.
    if (remoteReadyRef.current) return;

    const id = window.setInterval(() => {
      if (remoteReadyRef.current) {
        window.clearInterval(id);
        return;
      }
      sendReadyEvent();
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, [channel, getTargetWindow, targetOrigin, log, sendReadyEvent]);

  return { send, isConnected };
}
