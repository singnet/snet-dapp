import isEmpty from "lodash/isEmpty";

import { userActions } from "../actionCreators";
import { walletTypes, RESET_LOGIN_ERROR } from "../actionCreators/UserActions";
import { cogsToAgi } from "../../utility/PricingStrategy";

export const initialWallet = { value: walletTypes.DEFAULT, type: walletTypes.DEFAULT };
const InitialUserDetails = {
  login: {
    isLoggedIn: false,
    error: undefined,
    loading: false,
  },
  isInitialized: false,
  isEmailVerified: false,
  wallet: initialWallet,
  walletList: [],
  firstTimeFetchWallet: true,
  email: "",
  nickname: "",
  emailAlerts: false,
  isTermsAccepted: true,
  transactionHistory: [],
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
    case RESET_LOGIN_ERROR: {
      return { ...state, login: { ...state.login, error: undefined } };
    }
    case userActions.UPDATE_LOGIN_ERROR: {
      return { ...state, login: { ...state.login, error: action.payload } };
    }
    case userActions.SIGN_OUT: {
      return {
        ...state,
        login: {
          ...state.login,
          ...action.payload.login,
        },
        wallet: { type: walletTypes.SNET },
      };
    }
    case userActions.UPDATE_WALLET: {
      return { ...state, wallet: action.payload };
    }
    case userActions.UPDATE_WALLET_LIST: {
      return { ...state, walletList: action.payload };
    }
    case userActions.UPDATE_FIRST_TIME_FETCH_WALLET: {
      return { ...state, firstTimeFetchWallet: action.payload };
    }
    case userActions.UPDATE_NICKNAME: {
      return { ...state, ...action.payload };
    }
    case userActions.UPDATE_EMAIL: {
      return { ...state, ...action.payload };
    }
    case userActions.UPDATE_EMAIL_VERIFIED: {
      return { ...state, isEmailVerified: action.payload.isEmailVerified };
    }
    case userActions.UPDATE_EMAIL_ALERTS_SUBSCRIPTION: {
      return { ...state, emailAlerts: action.payload };
    }
    case userActions.UPDATE_IS_TERMS_ACCEPTED: {
      return { ...state, isTermsAccepted: action.payload };
    }
    case userActions.UPDATE_TRANSACTION_HISTORY: {
      return { ...state, transactionHistory: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const channelInfo = state => {
  const { walletList } = state.userReducer;
  if (isEmpty(walletList)) {
    return {};
  }
  const walletWithChannel = walletList.find(wallet => !isEmpty(wallet.channels[0]));
  if (walletWithChannel) {
    const selectedChannel = walletWithChannel.channels[0];
    return {
      id: selectedChannel.channel_id,
      balanceInAgi: cogsToAgi(selectedChannel.balance_in_cogs),
    };
  }
  return {};
};

export const anyGeneralWallet = state => {
  const { walletList } = state.userReducer;
  return walletList.some(wallet => wallet.type === walletTypes.GENERAL);
};

export default userReducer;
