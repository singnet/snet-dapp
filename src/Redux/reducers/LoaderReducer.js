import { loaderActions } from "../actionCreators";

const InitialLoaderState = {
  app: false,
};

const loaderReducer = (state = InitialLoaderState, action) => {
  switch (action.type) {
    case loaderActions.START_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    case loaderActions.STOP_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default loaderReducer;
