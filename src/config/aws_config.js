import { APIEndpoints } from "./APIEndpoints";

let endpoints = [];

Object.values(APIEndpoints).map(value => endpoints.push(value));

export const aws_config = {
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  },

  API: {
    endpoints,
  },
};
