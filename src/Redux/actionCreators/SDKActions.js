import { isEmpty } from "lodash";
import { getWeb3Address, initSdk } from "../../utility/sdk";

export const SET_SDK = "SET_SDK";
export const SET_SERVICE_CLIENT = "SET_SERVICE_CLIENT";

export const updateSdkInstance = (sdkInstance) => (dispatch) => {
  dispatch({ type: SET_SDK, payload: { ...sdkInstance } });
};

export const updateServiceClient = (serviceClient) => (dispatch) => {
  dispatch({ type: SET_SERVICE_CLIENT, payload: { ...serviceClient } });
};

export const initializingSdk = () => async (dispatch) => {
  try {
    const sdk = await initSdk();
    console.log("sdk: ", sdk);

    dispatch(updateSdkInstance(sdk));
    return sdk;
  } catch (error) {
    throw new Error(error);
  }
};

const initializeServiceClient = (organizationId, serviceId) => async (dispatch) => {
  const sdk = await dispatch(getSdk());
  const serviceClient = await sdk.createServiceClient(organizationId, serviceId);
  // dispatch(updateServiceClient(serviceClient))
  return serviceClient;
};

export const getSdk = () => async (dispatch, getState) => {
  await getWeb3Address();
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
