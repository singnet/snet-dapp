import { stylesActions } from "../actionCreators";

const InitialState = {
  hamburgerMenu: false,
};

const stylesReducer = (state = InitialState, action) => {
  switch (action.type) {
    case stylesActions.SET_HAMBURGER_MENU_STATE: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default stylesReducer;
