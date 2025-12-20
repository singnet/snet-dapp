import { useState, useEffect, useCallback } from "react";

/**
 * It is possible that the service's UI will load before the file description set is available, so requests from the service are placed in a queue.
 */
export function useGrpcRequestQueue(fds, callGrpc) {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    async function callGrpcFromQueue() {
      if (!queue.length) {
        return;
      }
      const items = queue;
      setQueue([]);
      for (const item of items) {
        await callGrpc(fds, item);
      }
    }

    if (fds) {
      callGrpcFromQueue();
    }
  }, [fds, callGrpc, queue]);

  const addRequest = useCallback(
    (request) => {
      setQueue([...queue, request]);
    },
    [queue]
  );

  return {
    addRequest,
  };
}
