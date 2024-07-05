import { sdkActions } from "../actionCreators";

const InitialState = {
  sdk: {},
};

const sdkReducer = (state = InitialState, action) => {
  switch (action.type) {
    case sdkActions.SET_SDK: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default sdkReducer;
