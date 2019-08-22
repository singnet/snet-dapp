export const initializeAPIOptions = (token, body) => {
  if (body) {
    return { headers: { Authorization: token }, body };
  }
  return { headers: { Authorization: token } };
};
