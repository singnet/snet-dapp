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

export default paymentReducer;
