// const allowedPayTypes = ["paypal"];

export const paymentGatewayConstraints = {
  // payType: {
  //   presence: { allowEmpty: false },
  //   inclusion: { within: allowedPayTypes, message: "is not valid" },
  // },
  amount: {
    presence: { isNumber: true, allowEmpty: true },
    numericality: { lessThan: 10000 },
  },
};

const FLOAT_PART_MAXIMUM_DIGIT = 2;
const AVAILABLE_SEPARATORS = [",", "."];

const isValidFloatPart = (firstPartNumbersList, secondPartNumbersList) => {
  if (!secondPartNumbersList.length) {
    return true;
  }

  if (secondPartNumbersList.length > FLOAT_PART_MAXIMUM_DIGIT) {
    return false;
  }

  if (firstPartNumbersList.length !== 1 || firstPartNumbersList[0] !== "0") {
    return true;
  }

  const zeroCount = secondPartNumbersList.reduce((count, symbol) => (symbol === "0" ? count + 1 : count), 0);

  return zeroCount < FLOAT_PART_MAXIMUM_DIGIT;
};

export const isValidCurrencyInput = (query) => {
  if (isNaN(query)) {
    return false;
  }

  const queryList = query.split("");

  const separatorIndex = queryList.findIndex((symbol) => AVAILABLE_SEPARATORS.includes(symbol));

  if (separatorIndex === -1) {
    return true;
  }

  const floatNumberFirstPartList = queryList.slice(0, separatorIndex);
  const floatNumberSecondPartList = queryList.slice(separatorIndex + 1);

  return isValidFloatPart(floatNumberFirstPartList, floatNumberSecondPartList);
};
