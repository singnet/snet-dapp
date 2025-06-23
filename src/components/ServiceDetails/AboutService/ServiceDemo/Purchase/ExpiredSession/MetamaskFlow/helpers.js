import { MIN_CALLS_NUMBER } from "./metadata";

export const formatValue = (value) => {
  let stringValue = String(value);
  if (stringValue[0] === "0" && stringValue.length > 1) {
    return stringValue.slice(1);
  }
  return value;
};

export const isCallsMoreOrEqualThanMinimum = (noOfServiceCalls) => {
  return noOfServiceCalls >= MIN_CALLS_NUMBER;
};

export const isValidCallsNumber = (numberOfCalls) => {
  const isInteger = numberOfCalls % 1 === 0;
  const isNumber = !isNaN(Number(numberOfCalls));
  return isInteger && isNumber;
};
