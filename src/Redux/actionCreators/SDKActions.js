import { isEmpty } from "lodash";
import { initSdk } from "../../utility/sdk";

export const SET_SDK = "SET_SDK";

export const updateSdkInstance = (sdkInstance) => (dispatch) => {
  dispatch({ type: SET_SDK, payload: { ...sdkInstance } });
};

export const initializingSdk = (ethereumWalletAddress) => async (dispatch) => {
  try {
    const sdk = await initSdk(ethereumWalletAddress);
    dispatch(updateSdkInstance(sdk));
    return sdk;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSdk = () => async (dispatch, getState) => {
  let sdk = getState().sdkReducer.sdk;
  if (!isEmpty(sdk)) {
    return sdk;
  }
  sdk = await dispatch(initializingSdk());
  return sdk;
};
