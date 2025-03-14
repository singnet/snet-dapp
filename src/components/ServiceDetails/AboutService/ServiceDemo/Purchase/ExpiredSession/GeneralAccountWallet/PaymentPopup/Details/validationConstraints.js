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
