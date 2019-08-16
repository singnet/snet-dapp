import { serviceDetailsActions } from "../actionCreators";

const InitialServiceDetails = {
  serviceMetadata: {},
  freeCallsRemaining: 0,
  freeCallsAllowed: 0,
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_METADATA: {
      return { ...state, serviceMetadata: {} };
    }
    case serviceDetailsActions.UPDATE_SERVICE_METADATA: {
      return { ...state, serviceMetadata: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_ALLOWED: {
      return { ...state, freeCallsAllowed: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_REMAINING: {
      return { ...state, freeCallsRemaining: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default serviceDetailsReducer;
