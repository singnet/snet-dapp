import validate from "validate.js";

export const isValidEmail = email => {
  let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};

export const isValidNumber = number => {
  let reg = /^[0-9]*$/;
  return reg.test(number);
};

export const hasLowerCase = string => /[a-z]/.test(string);
export const hasUpperCase = string => /[A-Z]/.test(string);
export const hasNumber = string => /[0-9]/.test(string);
// eslint-disable-next-line no-useless-escape
export const hasSpecialChar = string => /[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\,\>\<\'\:\;\|\_\~\`]/.test(string);
export const minChars = (string, length) => string.length >= length;

validate.validators.hasLowerCase = (value, options, key, attributes) => {
  if (/[a-z]/.test(value)) {
    return;
  }
  return options.message || "must contain a lowercase character";
};

validate.validators.hasUpperCase = (value, options, key, attributes) => {
  if (/[A-Z]/.test(value)) {
    return;
  }
  return options.message || "must contain an uppercase character";
};

validate.validators.hasNumber = (value, options, key, attributes) => {
  if (/[0-9]/.test(value)) {
    return;
  }
  return options.message || "must contain a number";
};

validate.validators.hasAWSPasswordSplChar = (value, options, key, attributes) => {
  // eslint-disable-next-line no-useless-escape
  if (/[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\,\>\<\'\:\;\|\_\~\`]/.test(value)) {
    return;
  }
  return options.message || "must contain a special character";
};

validate.options = { format: "flat" };

const snetValidator = validate;

export default snetValidator;
