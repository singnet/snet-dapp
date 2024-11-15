import { isEmpty } from "lodash";
import { initSdk } from "../../utility/sdk";

export const SET_SDK = "SET_SDK";
export const SET_SERVICE_CLIENT = "SET_SERVICE_CLIENT";

export const updateSdkInstance = (sdkInstance) => (dispatch) => {
  dispatch({ type: SET_SDK, payload: { ...sdkInstance } });
};

export const updateServiceClient = (serviceClient) => (dispatch) => {
  dispatch({ type: SET_SERVICE_CLIENT, payload: { ...serviceClient } });
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

const initializeServiceClient = (organizationId, serviceId) => async (dispatch) => {
  const sdk = await dispatch(getSdk());
  return await sdk.createServiceClient(organizationId, serviceId);
};

export const getSdk = () => async (dispatch, getState) => {
  let sdk = getState().sdkReducer.sdk;
  if (!isEmpty(sdk)) {
    return sdk;
  }
  sdk = await dispatch(initializingSdk());
  return sdk;
};

export const getServiceClient = (organizationId, serviceId) => async (dispatch, getState) => {
  let serviceClient = getState().sdkReducer.serviceClient;
  if (!isEmpty(serviceClient)) {
    return serviceClient;
  }
  serviceClient = await dispatch(initializeServiceClient(organizationId, serviceId));
  return serviceClient;
};
