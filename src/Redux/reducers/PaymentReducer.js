const InitialPaymentDetails = {};

const paymentReducer = (state = InitialPaymentDetails, action) => {
  switch (action.type) {
    case "123": {
      return {};
    }

    default: {
      return state;
    }
  }
};

export default paymentReducer;
