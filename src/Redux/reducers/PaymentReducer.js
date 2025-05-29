import { DIVISIBILITY } from "../../utility/PricingStrategy";
import { paymentActions } from "../actionCreators";

const InitialPaymentDetails = {
  paypalInProgress: {},
  usd_agi_rate: undefined,
  usd_cogs_rate: undefined,
};

const paymentReducer = (state = InitialPaymentDetails, action) => {
  switch (action.type) {
    case paymentActions.UPDATE_PAYPAL_IN_PROGRESS: {
      return { ...state, paypalInProgress: action.payload };
    }
    case paymentActions.UPDATE_PAYPAL_COMPLETED: {
      return { ...state, paypalInProgress: {} };
    }
    case paymentActions.UPDATE_USD_AGI_RATE: {
      return { ...state, usd_agi_rate: action.payload };
    }
    case paymentActions.UPDATE_USD_COGS_RATE: {
      return { ...state, usd_cogs_rate: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const anyPendingTxn = (state) => {
  if (process.env.REACT_APP_SANDBOX) {
    return false;
  }
  const { walletList } = state.userReducer;
  const istransactionsPending = walletList.some(
    (wallet) => wallet.transactions && wallet.transactions.some((txn) => txn.status === "PENDING")
  );
  return istransactionsPending;
};

export const anyFailedTxn = (state) => {
  if (process.env.REACT_APP_SANDBOX) {
    return false;
  }
  const { walletList } = state.userReducer;
  const istransactionsFailed = walletList.some(
    (wallet) => wallet.transactions && wallet.transactions.some((txn) => txn.status === "FAILED")
  );
  return istransactionsFailed;
};

export const USDToAgi = (usd, usdFiatRate) => {
  if (!usdFiatRate) {
    return undefined;
  }
  return (usd * usdFiatRate).toFixed(DIVISIBILITY);
};

export const USDToCogs = (usd, usdCogsRate) => {
  if (!usdCogsRate) {
    return undefined;
  }
  return usd * usdCogsRate;
};

export default paymentReducer;
