import { loaderActions } from "../actionCreators";

const InitialLoaderState = {
  app: { loading: false, loaderHeader: "", loaderText: "" },
  aiServieList: false,
};

const loaderReducer = (state = InitialLoaderState, action) => {
  switch (action.type) {
    case loaderActions.START_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    case loaderActions.STOP_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    case loaderActions.START_AISERVICE_LIST_LOADER: {
      return { ...state, aiServieList: true };
    }
    case loaderActions.STOP_AISERVICE_LIST_LOADER: {
      return { ...state, aiServieList: false };
    }
    default: {
      return state;
    }
  }
};

export default loaderReducer;
