import { serviceDetailsActions } from "../actionCreators";

const InitialServiceDetails = {
  serviceMetadata: {},
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_METADATA: {
      return { ...state, serviceMetadata: {} };
    }
    case serviceDetailsActions.UPDATE_SERVICE_METADATA: {
      return { ...state, serviceMetadata: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default serviceDetailsReducer;
