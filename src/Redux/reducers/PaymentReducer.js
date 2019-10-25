import { paymentActions } from "../actionCreators";

const InitialPaymentDetails = {
  paypalInProgress: {},
};

const paymentReducer = (state = InitialPaymentDetails, action) => {
  switch (action.type) {
    case paymentActions.UPDATE_PAYPAL_IN_PROGRESS: {
      return { ...state, paypalInProgress: action.payload };
    }
    case paymentActions.UPDATE_PAYPAL_COMPLETED: {
      return { ...state, paypalInProgress: {} };
    }

    default: {
      return state;
    }
  }
};

export const anyPendingTxn = state => {
  const { walletList } = state.userReducer;
  const istransactionsPending = walletList.some(
    wallet => wallet.transactions && wallet.transactions.some(txn => txn.status === "PENDING")
  );
  return istransactionsPending;
};

export const anyFailedTxn = state => {
  const { walletList } = state.userReducer;
  const istransactionsFailed = walletList.some(
    wallet => wallet.transactions && wallet.transactions.some(txn => txn.status === "FAILED")
  );
  return istransactionsFailed;
};

export default paymentReducer;
