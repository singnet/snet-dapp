import { isEmpty } from "lodash";
import { initSdk } from "../../utility/sdk";
import PaymentChannelManagement from "../../utility/PaymentChannelManagement";

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
    dispatch(updateSdkInstance(sdk));
    return sdk;
  } catch (error) {
    console.error("init sdk", error);

    throw new Error(error);
  }
};

const initializeServiceClient = (organizationId, serviceId) => async (dispatch) => {
  const sdk = await dispatch(getSdk());
  const serviceClient = await sdk.createServiceClient({ orgId: organizationId, serviceId });
  // dispatch(updateServiceClient(serviceClient))
  return serviceClient;
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

export const createPaymentChannelManagement = (orgId, serviceId) => async (dispatch) => {
  try {
    const sdk = await dispatch(initializingSdk());
    const metadataProvider = await sdk.createServiceMetadataProvider(orgId, serviceId);
    return new PaymentChannelManagement(sdk, metadataProvider);
  } catch (err) {
    console.error(err);
  }
};
