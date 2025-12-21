import { useState, useEffect } from "react";
import protobuf from "protobufjs";
import "protobufjs/ext/descriptor"; // adds Root.fromDescriptor(...)

async function fdsFromFile(fetchResult) {
  const bytes = new Uint8Array(await fetchResult.arrayBuffer());

  // base case:
  const root = protobuf.Root.fromDescriptor(bytes);
  return root;
}

const FDS_LOAD_STATE = {
  BEFORE_LOAD: "BEFORE_LOAD",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};
/**
 * use File Descriptor Set
 */
export function useFds(fdsUrl, onError) {
  const [fds, setFds] = useState();
  const [fdsLoadState, setFdsLoadState] = useState({ state: FDS_LOAD_STATE.BEFORE_LOAD });

  useEffect(() => {
    async function fetchFds() {
      try {
        setFdsLoadState({ state: FDS_LOAD_STATE.PENDING });
        const result = await fetch(fdsUrl);
        setFds(await fdsFromFile(result));
        setFdsLoadState({ state: FDS_LOAD_STATE.FULFILLED });
      } catch (error) {
        console.error(error);
        setFdsLoadState({ state: FDS_LOAD_STATE.REJECTED, error });
        onError(`[useFds] ${error}`);
      }
    }
    fetchFds();
  }, [fdsUrl]);

  const isFdsLoadStateErrored = fdsLoadState.state === "REJECTED" ? true : false;
  const fdsLoadStateError = fdsLoadState.error;
  const fdsLoadStateId = fdsLoadState.state;

  return {
    fds,
    isFdsLoadStateErrored,
    fdsLoadStateError,
    fdsLoadStateId,
  };
}
