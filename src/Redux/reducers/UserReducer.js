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
};

const userReducer = (state = InitialUserDetails, action) => {
  switch (action.type) {
    case userActions.SET_USER_DETAILS: {
      return {
        ...state,
        isInitialized: action.payload.isInitialized,
        isEmailVerified: action.payload.isEmailVerified,
      };
    }
    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
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
      };
    }

    case userActions.CHECK_WALLET_STATUS: {
      return { ...state, isWalletAssigned: action.payload.isWalletAssigned };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
