import { uiContentActions } from "../actionCreators";

const InitialUiDetails = {
  carousel: [],
};

const uiContentReducer = (state = InitialUiDetails, action) => {
  switch (action.type) {
    case uiContentActions.UPDATE_CAROUSEL: {
      return {
        ...state,
        carousel: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiContentReducer;
