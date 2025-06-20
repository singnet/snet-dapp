import { serviceDetailsActions } from "../actionCreators";

const InitialServiceDetails = {
  freeCalls: {
    freeCallsTotal: 0,
    freeCallsAvailable: 0,
  },
  freeCallSignature: { signature: "", expirationBlock: "", freeCallToken: "", signerAddress: "" },
  details: {},
  detailsTraining: {},
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_DETAILS: {
      return InitialServiceDetails;
    }
    case serviceDetailsActions.UPDATE_SERVICE_DETAILS: {
      return { ...state, details: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_INFO: {
      return { ...state, freeCalls: action.payload };
    }
    case serviceDetailsActions.UPDATE_TRAINING_DETAILS: {
      return { ...state, detailsTraining: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREECALL_SIGNATURE: {
      return { ...state, freeCallSignature: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default serviceDetailsReducer;
