import { API } from "aws-amplify";

import { userActions, loaderActions } from "./";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { walletTypes, fetchAuthenticatedUser } from "./UserActions";

export const UPDATE_PAYPAL_IN_PROGRESS = "UPDATE_PAYPAL_IN_PROGRESS";
export const UPDATE_PAYPAL_COMPLETED = "UPDATE_PAYPAL_COMPLETED";
export const UPDATE_USD_AGI_RATE = "UPDATE_USD_AGI_RATE";
export const UPDATE_USD_COGS_RATE = "UPDATE_USD_COGS_RATE";

const initiatePaymentAPI = (token, paymentObj) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.INITIATE_PAYMNET;
  const apiOptions = initializeAPIOptions(token, paymentObj);
  return API.post(apiName, apiPath, apiOptions);
};

export const initiatePayment = paymentObj => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.INITIATE_PAYPAL));
    const { token } = await userActions.fetchAuthenticatedUser();
    const { data, error } = await initiatePaymentAPI(token, paymentObj);
    if (error.code) {
      throw error;
    }
    window.location.replace(data.payment.payment_url);
  } catch (error) {
    dispatch(loaderActions.stopAppLoader);
    throw error;
  }
};

const executePaymentAPI = (token, paymentExecObj) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.EXECUTE_PAYMENT;
  const apiOptions = initializeAPIOptions(token, paymentExecObj);
  return API.post(apiName, apiPath, apiOptions);
};

export const executePayment = paymentExecObj => async () => {
  const { token } = await userActions.fetchAuthenticatedUser();
  return await executePaymentAPI(token, paymentExecObj);
};

const orderDetailsAPI = (token, orderId) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = `${APIPaths.ORDER_DETAILS}/${orderId}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchOrderDetails = orderId => async () => {
  const { token } = await userActions.fetchAuthenticatedUser();
  return await orderDetailsAPI(token, orderId);
};

export const updatePaypalInProgress = (orderId, orderType, paymentId, paypalPaymentId, PayerID) => dispatch => {
  dispatch({ type: UPDATE_PAYPAL_IN_PROGRESS, payload: { orderId, orderType, paymentId, paypalPaymentId, PayerID } });
  dispatch(userActions.updateWallet({ type: walletTypes.GENERAL }));
};

export const updatePaypalCompleted = dispatch => {
  dispatch({ type: UPDATE_PAYPAL_COMPLETED });
};

const cancelOrderAPI = (token, orderId) => () => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const path = APIPaths.CANCEL_ORDER(orderId);
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, path, apiOptions);
};

export const cancelOrder = orderId => async dispatch => {
  const { token } = await fetchAuthenticatedUser();
  await dispatch(cancelOrderAPI(token, orderId));
};

const fetchUSDConversionRateSuccess = data => async dispatch => {
  await dispatch({ type: UPDATE_USD_AGI_RATE, payload: data.amount_in_agi });
  return dispatch({ type: UPDATE_USD_COGS_RATE, payload: data.amount_in_cogs });
};

const USDConversionRateAPI = async amount => {
  const url = new URL(`${APIEndpoints.ORCHESTRATOR.endpoint}${APIPaths.USD_RATE}?amount=${amount}`);
  const response = await fetch(url);
  return response.json();
};

export const fetchUSDConversionRate = async dispatch => {
  const { data } = await USDConversionRateAPI(1);
  return dispatch(fetchUSDConversionRateSuccess(data));
};
