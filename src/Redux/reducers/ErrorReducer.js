import { errorActions } from "../actionCreators";

const InitialErrorState = {
  app: undefined,
  forgotPassword: undefined,
  forgotPasswordSubmit: undefined,
  profileSettings: undefined,
};

const errorReducer = (state = InitialErrorState, action) => {
  switch (action.type) {
    case errorActions.UPDATE_FORGOT_PASSWORD_ERROR: {
      return { ...state, ...action.payload };
    }
    case errorActions.RESET_FORGOT_PASSWORD_ERROR: {
      return { ...state, ...action.payload };
    }
    case errorActions.UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR: {
      return { ...state, ...action.payload };
    }
    case errorActions.RESET_FORGOT_PASSWORD_SUBMIT_ERROR: {
      return { ...state, ...action.payload };
    }
    case errorActions.UPDATE_PROFILE_SETTINGS_ERROR: {
      return { ...state, ...action.payload };
    }
    case errorActions.RESET_PROFILE_SETTINGS_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default errorReducer;
