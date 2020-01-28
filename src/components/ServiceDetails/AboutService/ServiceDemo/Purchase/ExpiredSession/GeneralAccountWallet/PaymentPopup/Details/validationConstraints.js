const allowedPayTypes = ["paypal"];

export const paymentGatewayConstraints = {
  payType: {
    presence: { allowEmpty: false },
    inclusion: { within: allowedPayTypes, message: "is not valid" },
  },
  amount: {
    presence: { allowEmpty: false },
    numericality: { greaterThan: 0, lessThan: 10000 },
  },
};
