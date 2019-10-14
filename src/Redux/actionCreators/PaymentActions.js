import { API } from "aws-amplify";

import { userActions, loaderActions } from "./";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { walletTypes } from "./UserActions";

export const UPDATE_PAYPAL_IN_PROGRESS = "UPDATE_PAYPAL_IN_PROGRESS";
export const UPDATE_PAYPAL_COMPLETED = "UPDATE_PAYPAL_COMPLETED";

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
    const response = await initiatePaymentAPI(token, paymentObj);
    window.location.replace(response.data.payment.payment_url);
  } catch (error) {
    dispatch(loaderActions.stopAppLoader);
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
