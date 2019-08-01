export const generateAPIInit = (token, body) => {
  if (body) {
    return { headers: { Authorization: token }, body };
  }
  return { headers: { Authorization: token } };
};
