export const initializeAPIOptions = (token, body, queryStringParameters) => {
  const options = { headers: { Authorization: token } };
  if (body) {
    options.body = body;
  }
  if (queryStringParameters) {
    options.queryStringParameters = queryStringParameters;
  }
  return options;
};
