const InitialUiDetails = {
  carousel: {},
};

const uiContentReducer = (state = InitialUiDetails, action) => {
  switch (action.type) {
    case "UPDATE_CAROUSEL": {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiContentReducer;
