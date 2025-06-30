import { get, post, del, put } from "aws-amplify/api";

export const initializeAPIOptions = (token, body, queryStringParameters) => {
  const options = { headers: { Authorization: token } };
  if (body) {
    options.body = body;
  }
  if (queryStringParameters) {
    options.queryParams = queryStringParameters;
  }
  return options;
};

export const putAPI = (apiName, path, options) => {
  return request(put({ apiName, path, options }));
};

export const getAPI = (apiName, path, options) => {
  return request(get({ apiName, path, options }));
};

export const postAPI = (apiName, path, options) => {
  return request(post({ apiName, path, options }));
};

export const deleteAPI = (apiName, path, options) => {
  return request(del({ apiName, path, options }));
};

const request = async (request) => {
  const { body } = await request.response;
  const response = await body.json();
  return response;
};
