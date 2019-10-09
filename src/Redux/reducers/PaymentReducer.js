import { paymentActions } from "../actionCreators";

const InitialPaymentDetails = {
  paypalInProgress: {},
};

const paymentReducer = (state = InitialPaymentDetails, action) => {
  switch (action.type) {
    case paymentActions.UPDATE_PAYPAL_IN_PROGRESS: {
      return { ...state, paypalInProgress: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default paymentReducer;
