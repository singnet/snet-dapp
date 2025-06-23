import { DIVISIBILITY } from "../../../../../../../../../utility/PricingStrategy";

export const paymentGatewayConstraints = {
  amount: {
    presence: { isNumber: true, allowEmpty: true },
    numericality: { lessThan: 10000 },
  },
};

export const FLOAT_MAXIMUM_DIGIT_CASES = {
  DEFAULT: "DEFAULT",
  TOKEN: "TOKEN",
};

const FLOAT_MAXIMUM_DIGIT = {
  [FLOAT_MAXIMUM_DIGIT_CASES.DEFAULT]: 2,
  [FLOAT_MAXIMUM_DIGIT_CASES.TOKEN]: DIVISIBILITY,
};

const AVAILABLE_SEPARATORS = [",", "."];

const isValidFloatPart = (
  firstPartNumbersList,
  secondPartNumbersList,
  floatMaximimDigitCase = FLOAT_MAXIMUM_DIGIT_CASES.DEFAULT
) => {
  if (!secondPartNumbersList.length) {
    return true;
  }

  if (secondPartNumbersList.length > FLOAT_MAXIMUM_DIGIT[floatMaximimDigitCase]) {
    return false;
  }

  if (firstPartNumbersList.length !== 1 || firstPartNumbersList[0] !== "0") {
    return true;
  }

  const zeroCount = secondPartNumbersList.reduce((count, symbol) => (symbol === "0" ? count + 1 : count), 0);

  return zeroCount < FLOAT_MAXIMUM_DIGIT[floatMaximimDigitCase];
};

export const isValidCurrencyInput = (query, floatMaximimDigitCase) => {
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

  return isValidFloatPart(floatNumberFirstPartList, floatNumberSecondPartList, floatMaximimDigitCase);
};
