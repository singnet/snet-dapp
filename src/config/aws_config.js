import { APIEndpoints } from "./APIEndpoints";

let endpoints = {};

Object.values(APIEndpoints).map((value) => (endpoints[value.name] = { endpoint: value.endpoint }));

export const aws_config = {
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_AWS_REGION,
    Cognito: {
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
    },
  },
  API: {
    REST: {
      ...endpoints,
    },
  },
};
