import { sdkActions } from "../actionCreators";

const InitialState = {
  sdk: {},
  serviceClient: {},
};

const sdkReducer = (state = InitialState, action) => {
  switch (action.type) {
    case sdkActions.SET_SDK: {
      return { ...state, ...action.payload };
    }
    case sdkActions.SET_SERVICE_CLIENT: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default sdkReducer;
