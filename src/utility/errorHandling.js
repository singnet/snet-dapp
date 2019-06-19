export const parseError = error => {
  if (error.message) {
    return error.message;
  }
  return JSON.stringify(error);
};
