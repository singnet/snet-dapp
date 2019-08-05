import { userActions } from "../actionCreators";

const InitialUserDetails = {
  login: {
    isLoggedIn: false,
    error: undefined,
    loading: false,
  },
  isInitialized: false,
  isEmailVerified: false,
  isWalletAssigned: false,
  email: "",
  username: "",
  emailAlerts: false,
};

const userReducer = (state = InitialUserDetails, action) => {
  switch (action.type) {
    case userActions.APP_INITIALIZATION_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case userActions.SET_USER_DETAILS: {
      return {
        ...state,
        login: {
          ...state.login,
          ...action.payload.login,
        },
        ...action.payload,
      };
    }
    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        login: {
          ...state.login,
          error: undefined,
          loading: false,
          ...action.payload.login,
        },
      };
    }
    case userActions.LOGIN_LOADING: {
      return {
        ...state,
        login: {
          ...state.login,
          error: undefined,
          loading: true,
        },
      };
    }
    case userActions.LOGIN_ERROR: {
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          isLoggedIn: false,
          ...action.payload.login,
        },
      };
    }
    case userActions.SIGN_OUT: {
      return {
        ...state,
        login: {
          ...state.login,
          ...action.payload.login,
        },
        isWalletAssigned: false,
      };
    }
    case userActions.CHECK_WALLET_STATUS: {
      return { ...state, isWalletAssigned: action.payload.isWalletAssigned };
    }
    case userActions.WALLET_CREATION_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case userActions.UPDATE_USERNAME: {
      return { ...state, ...action.payload };
    }
    case userActions.UPDATE_EMAIL_VERIFIED: {
      return { ...state, isEmailVerified: action.payload.isEmailVerified };
    }
    case userActions.SUBSCRIBE_TO_EMAIL_ALERTS: {
      return { ...state, emailAlerts: true };
    }
    case userActions.UNSUBSCRIBE_TO_EMAIL_ALERTS: {
      return { ...state, emailAlerts: false };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
