import { userActions, loaderActions } from ".";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { API } from "aws-amplify";
import { LoaderContent } from "../../utility/constants/LoaderContent";

export const UPDATE_PAYPAL_IN_PROGRESS = "UPDATE_PAYPAL_IN_PROGRESS";

const initiatePaymentAPI = token => {
  // TODO remove hardcoded payobj
  const payObj = {
    price: {
      amount: 12300,
      currency: "USD",
    },
    item_details: {
      item: "AGI",
      quantity: 1.0243,
      org_id: "snet",
      group_id: "DS2OoKSfGE/7hAO/023psl4Qdj0MJvYsreJbCoAHVSc=",
      receipient: "0x9c302750c50307D3Ad88eaA9a6506874a15cE4Cb",
      order_type: "CREATE_WALLET_AND_CHANNEL",
    },
    payment_method: "paypal",
  };
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.INITIATE_PAYMNET;
  // const apiPath = APIPaths.DEBUG_PAYPAL_INITIATE;
  const apiOptions = initializeAPIOptions(token, payObj);
  return API.post(apiName, apiPath, apiOptions);
  // return fetch("https://ropsten-marketplace.singularitynet.io/orchestrator/order/initiate", {
  //   method: "POST",
  //   headers: { Authorization: token },
  //   body: JSON.stringify(payObj),
  //   redirect: "follow",
  // });
};

export const initiatePayment = (payType, amount) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.INITIATE_PAYPAL));
    const { token } = await userActions.fetchAuthenticatedUser();
    // console.log("payment initiated");
    const response = await initiatePaymentAPI(token);
    dispatch(loaderActions.stopAppLoader);
    // const json = await response.json();
    // console.log("initiatePayment", response);
    window.location.href = response.data.payment.payment_url;
  } catch (error) {
    // console.log("init payment err", error);
    dispatch(loaderActions.stopAppLoader);
  }
};

const executePaymentAPI = token => {
  const payObj = {
    order_id: "209ad8b6-db76-11e9-94dd-261be887ff57",
    payment_id: "20a7faaa-db76-11e9-bcc2-2250e9fce276",
    payment_details: {
      payer_id: "J5EQY8MFTLRA6",
      payment_id: "PAYID-LWCHYEQ3TW15018VE5274437",
    },
  };
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.EXECUTE_PAYMENT;
  const apiOptions = initializeAPIOptions(token, payObj);
  return API.post(apiName, apiPath, apiOptions);
};

export const executePayment = (orderId, paymentId, payerId) => async () => {
  const { token } = await userActions.fetchAuthenticatedUser();
  // console.log("payment execution started");
  await executePaymentAPI(token);
  // console.log("payment executed", response);
};

export const updatePaypalInProgress = (orderId, paymentId, payerId) => dispatch => {
  // console.log(orderId, paymentId, payerId);
  dispatch({ type: UPDATE_PAYPAL_IN_PROGRESS, payload: { orderId, paymentId, payerId } });
};
