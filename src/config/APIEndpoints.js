export const APIEndpoints = {
  GET_SERVICE_LIST: {
    name: "Get Service",
    endpoint: process.env.REACT_APP_SERVICES_ENDPOINT,
  },
  SERVICE_BUF: {
    name: "Service Buff",
    endpoint: process.env.REACT_APP_SERVICE_PROTOBUF_ENDPOINT,
  },
  INVOKE_SERVICE: {
    name: "Invoke service",
    endpoint: process.env.REACT_APP_SERVICE_EXECUTION_ENDPOINT,
  },
};

export const APIPaths = {
  GET_SERVICE_LIST: "/service",
  GET_USER_PROFILE: "/profile?username=",
  UPDATE_USER_PROFILE: "/profile",
  INVOKE_SERVICE: "/invoke",
  FILTER_DATA: "/service?attribute=",
  FEEDBACK: "/feedback",
};
