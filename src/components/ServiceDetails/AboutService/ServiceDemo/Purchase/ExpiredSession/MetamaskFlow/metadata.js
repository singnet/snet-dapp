import { alertTypes } from "../../../../../../common/AlertBox";

export const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

export const connectMMinfo = {
  type: alertTypes.ERROR,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to install and learn more about how to use Metamask and your ${process.env.REACT_APP_TOKEN_NAME} credits with SinguarlityNet AI Marketplace.`,
};

export const insufficientMpeError = {
  type: alertTypes.ERROR,
  message: `Insufficient MPE balance. Please deposit some ${process.env.REACT_APP_TOKEN_NAME} tokens to your escrow account`,
};

export const MIN_CALLS_NUMBER = 1;

export const paymentInfoCardDatMpeBal = {
  title: "Escrow Balance",
  id: "mpeBal",
  unit: process.env.REACT_APP_TOKEN_NAME,
};
