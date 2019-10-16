export const isValidNumber = number => {
  let reg = /^[0-9]*$/;
  return reg.test(number);
};
