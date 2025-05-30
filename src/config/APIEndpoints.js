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
    //not used
    name: "Service Buff",
    endpoint: process.env.REACT_APP_SERVICE_PROTOBUF_ENDPOINT,
  },
  INVOKE_SERVICE: {
    //not used
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
  REGISTRY: {
    name: "Registry",
    endpoint: process.env.REACT_APP_REGISTRY_ENDPOINT,
  },
};

export const APIPaths = {
  SIGNUP: "/signup",
  GET_USER_PROFILE: "/profile",
  UPDATE_USER_PROFILE: "/profile",
  DELETE_USER: "/user/delete",
  FREE_CALL_USAGE: "/freecall/usage",
  FEEDBACK: "/feedback",
  GET_SERVICE_LIST: "/service",
  FILTER_DATA: "/service?attribute=",
  SERVICE_DETAILS: (orgId, serviceId) => `/org/${orgId}/service/${serviceId}`,
  GET_CAROUSEL: "/uicontent/marketplacecarousel",
  UPDATE_CHANNEL_BALANCE: (channelId) => `/channel/${channelId}/balance`,
  LINKED_PROVIDERS: "/v2/channel",
  FREE_CALL_TOKEN: "/free-call/token",
  SIGNER_FREE_CALL: "/freecall",
  SIGNER_STATE_SERVICE: "/state-service",
  GET_SIGNATURE: "/sign-call",
  SIGNER_REGULAR_CALL: "/regular-call",
  ORDERS_LIST: "/order",
  ORDER_DETAILS: "/order",
  INITIATE_PAYMNET: "/order/initiate",
  CANCEL_ORDER: (orderId) => `/order/${orderId}/cancel`,
  EXECUTE_PAYMENT: "/order/execute",
  DEBUG_PAYPAL_INITIATE: "/v2/order/initiate",
  USD_RATE: "/currency/USD/token",
  WALLETS: "/wallet",
  WALLET: "/wallet/channel",
  REGISTER_WALLET: "/wallet/register",
  UPDATE_DEFAULT_WALLET: "/wallet/status",
  GET_USER_ORGS: "/org",
  INVOKE_SERVICE: "/invoke", // not used
};
