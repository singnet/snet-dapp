import { userActions, loaderActions } from ".";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { API } from "aws-amplify";
import { LoaderContent } from "../../utility/constants/LoaderContent";

export const UPDATE_PAYPAL_IN_PROGRESS = "UPDATE_PAYPAL_IN_PROGRESS";

const initiatePaymentAPI = (token, paymentObj) => {
  // TODO remove hardcoded payobj

  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.INITIATE_PAYMNET;
  // const apiPath = APIPaths.DEBUG_PAYPAL_INITIATE;
  const apiOptions = initializeAPIOptions(token, paymentObj);
  return API.post(apiName, apiPath, apiOptions);
  // return fetch("https://ropsten-marketplace.singularitynet.io/orchestrator/order/initiate", {
  //   method: "POST",
  //   headers: { Authorization: token },
  //   body: JSON.stringify(payObj),
  //   redirect: "follow",
  // });
};

export const initiatePayment = paymentObj => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.INITIATE_PAYPAL));
    const { token } = await userActions.fetchAuthenticatedUser();
    // console.log("payment initiated");
    const response = await initiatePaymentAPI(token, paymentObj);
    dispatch(loaderActions.stopAppLoader);
    // const json = await response.json();
    // console.log("initiatePayment", response);
    window.location.href = response.data.payment.payment_url;
  } catch (error) {
    // console.log("init payment err", error);
    dispatch(loaderActions.stopAppLoader);
  }
};

const executePaymentAPI = (token, paymentExecObj) => {
  // const payObj = {
  //   order_id: "209ad8b6-db76-11e9-94dd-261be887ff57",
  //   payment_id: "20a7faaa-db76-11e9-bcc2-2250e9fce276",
  //   payment_details: {
  //     payer_id: "J5EQY8MFTLRA6",
  //     payment_id: "PAYID-LWCHYEQ3TW15018VE5274437",
  //   },
  // };
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.EXECUTE_PAYMENT;
  const apiOptions = initializeAPIOptions(token, paymentExecObj);
  return API.post(apiName, apiPath, apiOptions);
};

export const executePayment = paymentExecObj => async () => {
  const { token } = await userActions.fetchAuthenticatedUser();
  // console.log("payment execution started");
  return await executePaymentAPI(token, paymentExecObj);
  // console.log("payment executed", response);
};

export const updatePaypalInProgress = (orderId, paymentId, paypalPaymentId, PayerID) => dispatch => {
  // console.log(orderId, paymentId, payerId);
  dispatch({ type: UPDATE_PAYPAL_IN_PROGRESS, payload: { orderId, paymentId, paypalPaymentId, PayerID } });
};
