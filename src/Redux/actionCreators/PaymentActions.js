/* eslint-disable no-console */
import { userActions } from ".";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { API } from "aws-amplify";

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
  //   const apiName = APIEndpoints.ORCHESTRATOR.name;
  //   const apiPath = APIPaths.INITIATE_PAYMNET;
  //   const apiOptions = { body: payObj };
  //   const api = API.post(apiName, apiPath, apiOptions);
  const api = fetch("https://ropsten-marketplace.singularitynet.io/orchestrator/order/initiate", {
    method: "POST",
    body: JSON.stringify(payObj),
    redirect: "follow",
  });
  return api;
};

export const initiatePayment = payMethod => async dispatch => {
  try {
    const { token } = await userActions.fetchAuthenticatedUser();
    console.log("payment initiated");
    const response = await initiatePaymentAPI(token);
    // const json = await response.json();
    console.log("initiatePayment", response);
  } catch (error) {
    console.log("init payment err", error);
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
  console.log("payment execution started");
  const response = await executePaymentAPI(token);
  console.log("payment executed", response);
};
