export const APIEndpoints = {
  CONTRACT: {
    name: "Contract",
    endpoint: process.env.REACT_APP_CONTRACT_ENDPOINT,
  },
  USER: {
    name: "User",
    endpoint: process.env.REACT_APP_USER_ENDPOINT,
  },
  SERVICE_BUF: {
    name: "Service Buff",
    endpoint: process.env.REACT_APP_SERVICE_PROTOBUF_ENDPOINT,
  },
  INVOKE_SERVICE: {
    name: "Invoke service",
    endpoint: process.env.REACT_APP_SERVICE_EXECUTION_ENDPOINT,
  },
  SIGNER_SERVICE: {
    name: "Signer Service",
    endpoint: process.env.REACT_APP_SIGNER_ENDPOINT,
  },
  ORCHESTRATOR: {
    name: "Orchestrator",
    endpoint: process.env.REACT_APP_ORCHESTRATOR_ENDPOINT,
  },
};

export const APIPaths = {
  SIGNUP: "/signup",
  GET_SERVICE_LIST: "/service",
  GET_USER_PROFILE: "/profile",
  UPDATE_USER_PROFILE: "/profile",
  WALLET: "/wallet",
  INVOKE_SERVICE: "/invoke",
  FILTER_DATA: "/service?attribute=",
  FEEDBACK: "/feedback",
  GET_SIGNATURE: "/sign-call",
  DELETE_USER: "/delete-user",
  FREE_CALL_USAGE: "/usage/freecalls",
  SIGNER_FREE_CALL: "/free-call",
  SIGNER_REGULAR_CALL: "/regular-call",
  INITIATE_PAYMNET: "/order/initiate",
  EXECUTE_PAYMENT: "/order/execute",
  DEBUG_PAYPAL_INITIATE: "/v2/order/initiate",
};
