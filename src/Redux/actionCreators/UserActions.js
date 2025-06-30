import {
  fetchAuthSession,
  signIn,
  signOut as signOutAws,
  resetPassword,
  confirmResetPassword,
  deleteUser,
} from "aws-amplify/auth";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { parseError } from "../../utility/ErrorHandling";
import { errorActions, loaderActions } from "./";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { getAPI, initializeAPIOptions, postAPI, deleteAPI, putAPI } from "../../utility/API";
import Routes from "../../utility/constants/Routes";
import { getSdk } from "./SDKActions";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const RESET_LOGIN_ERROR = "RESET_LOGIN_ERROR";
export const UPDATE_LOGIN_ERROR = "UPDATE_LOGIN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_NICKNAME = "UPDATE_NICKNAME";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_EMAIL_VERIFIED = "UPDATE_EMAIL_VERIFIED";
export const UPDATE_EMAIL_ALERTS_SUBSCRIPTION = "UPDATE_EMAIL_ALERTS_SUBSCRIPTION";
export const UPDATE_WALLET = "UPDATE_WALLET";
export const UPDATE_WALLET_LIST = "UPDATE_WALLET_LIST";
export const APP_INITIALIZATION_SUCCESS = "APP_INITIALIZATION_SUCCESS";
export const UPDATE_IS_TERMS_ACCEPTED = "UPDATE_IS_TERMS_ACCEPTED";
export const UPDATE_TRANSACTION_HISTORY = "UPDATE_TRANSACTION_HISTORY";
export const UPDATE_FIRST_TIME_FETCH_WALLET = "FIRST_TIME_FETCH_WALLET";
export const SET_JWT_EXP = "SET_JWT_EXP";

// let walletPollingInterval = false;

export const walletTypes = {
  GENERAL: "GENERAL",
  METAMASK: "METAMASK",
  DEFAULT: "default",
};

const NEXT_SIGN_IN_STEP = {
  CONFIRM_SIGN_UP: "CONFIRM_SIGN_UP",
};

const setJWTExp = (exp) => ({ type: SET_JWT_EXP, payload: exp });

export const fetchAuthenticatedUser = () => async (dispatch) => {
  const { userAttributes, idToken } = await getCurrentUser();
  const newExp = idToken.payload.exp;
  dispatch(setJWTExp(newExp));

  const publisherTnC = userAttributes["custom:publisher_tnc"]
    ? JSON.parse(userAttributes["custom:publisher_tnc"])
    : { ver: "1", accepted: false };
  dispatch(updateIsTermsAccepted(publisherTnC));

  return {
    nickname: userAttributes.nickname,
    email: userAttributes.email,
    email_verified: userAttributes.email_verified,
    token: idToken.toString(),
  };
};

export const appInitializationSuccess = () => (dispatch) => {
  dispatch({ type: APP_INITIALIZATION_SUCCESS, payload: { isInitialized: true } });
  dispatch(loaderActions.stopAppLoader());
};

export const updateNickname = (nickname) => (dispatch) => {
  dispatch({ type: UPDATE_NICKNAME, payload: { nickname } });
};

export const updateEmail = (email) => (dispatch) => {
  dispatch({ type: UPDATE_EMAIL, payload: { email } });
};

export const updateEmailVerified = (value) => (dispatch) => {
  dispatch({ type: UPDATE_EMAIL_VERIFIED, payload: { isEmailVerified: value } });
};

const updateEmailAlertsSubscription = (emailAlerts) => (dispatch) => {
  dispatch({ type: UPDATE_EMAIL_ALERTS_SUBSCRIPTION, payload: emailAlerts });
};

const updateIsTermsAccepted = (isTermsAccepted) => (dispatch) => {
  dispatch({ type: UPDATE_IS_TERMS_ACCEPTED, payload: isTermsAccepted });
};

export const fetchUserAlerts = () => async (dispatch) => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.USER;
  const apiOptions = initializeAPIOptions(token);
  try {
    const userProfile = await getAPI(apiName, path, apiOptions);
    const emailAlerts = Boolean(userProfile.data.emailAlerts);

    dispatch(updateEmailAlertsSubscription(emailAlerts));
  } catch (err) {
    console.error("Error fetching user alerts", err);
    return;
  }
};

const fetchUserTransactionsAPI = (token) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const path = APIPaths.ORDERS_LIST;
  const apiOptions = initializeAPIOptions(token);
  return getAPI(apiName, path, apiOptions);
};

export const fetchUserTransactions = () => async (dispatch) => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  dispatch(loaderActions.startAppLoader(LoaderContent.TRANSACTION_HISTORY));
  const response = await fetchUserTransactionsAPI(token);
  dispatch(fetchUserTransactionsSuccess(response));
  dispatch(loaderActions.stopAppLoader());
};

const fetchUserTransactionsSuccess = (response) => (dispatch) => {
  const transactionHistory = response.data.orders.map((value) => {
    const timestamp = moment(value.created_at);
    return {
      date: timestamp.format("DD MMM YYYY"),
      time: timestamp.format("hh:mm A"),
      organizationName: value.item_details.organization_name,
      orderId: value.order_id,
      paymentChannel: value.wallet_type,
      orderType: value.item_details.order_type,
      status: isEmpty(value.wallet_transactions) ? "PENDING" : value.order_status,
      cost: value.price.amount,
      itemQuantity: value.item_details.quantity,
      itemUnit: value.item_details.item,
    };
  });
  dispatch(updateTransactionHistory(transactionHistory));
};

export const updateTransactionHistory = (transactionHistory) => (dispatch) => {
  dispatch({ type: UPDATE_TRANSACTION_HISTORY, payload: transactionHistory });
};

const noAuthenticatedUser = () => (dispatch) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: false, error: undefined, loading: false },
      isInitialized: true,
    },
  });
};

const fetchUserDetailsSuccess = (isEmailVerified, email, nickname) => (dispatch) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: true, error: undefined, loading: false },
      isInitialized: true,
      isEmailVerified,
      email,
      nickname,
    },
  });
  dispatch(loaderActions.stopAppLoader());
};

const fetchUserDetailsError = (err) => (dispatch) => {
  if (err === "No current user") {
    dispatch(noAuthenticatedUser());
    dispatch(loaderActions.stopAppLoader());
  }
  dispatch(appInitializationSuccess());
};

export const fetchUserDetails = () => async (dispatch) => {
  dispatch(loaderActions.startAppLoader(LoaderContent.APP_INIT));
  try {
    const { nickname, email, email_verified } = await dispatch(fetchAuthenticatedUser());
    if (!email) {
      dispatch(noAuthenticatedUser());
      return;
    }
    if (email_verified) {
      dispatch(fetchUserDetailsSuccess(email_verified, email, nickname));
    }
  } catch (err) {
    dispatch(fetchUserDetailsError(err));
  }
};

export const updateUserProfileInit = (token, updatedUserData) => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.UPDATE_USER_ALERTS;
  const apiOptions = initializeAPIOptions(token, updatedUserData);
  return putAPI(apiName, path, apiOptions);
};

const updateUserProfileSuccess = () => (dispatch) => {
  dispatch(fetchAuthenticatedUser());
  dispatch(loaderActions.stopAppLoader());
};

const updateUserProfileFailure = (err) => (dispatch) => {
  dispatch(errorActions.updateProfileSettingsError(String(err)));
  dispatch(loaderActions.stopAppLoader());
};

export const updateUserProfile = (isEmailAlerts) => async (dispatch) => {
  dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_PROFILE));
  try {
    const { token } = await dispatch(fetchAuthenticatedUser());
    const response = await updateUserProfileInit(token, { emailAlerts: isEmailAlerts });
    if (response.status === "success") {
      return dispatch(updateUserProfileSuccess(token));
    }
  } catch (err) {
    dispatch(updateUserProfileFailure(err));
    throw err;
  } finally {
    dispatch(loaderActions.stopAppLoader());
  }
};

export const resetLoginError = () => (dispatch) => {
  dispatch({ type: RESET_LOGIN_ERROR });
};

export const updateLoginError = (error) => (dispatch) => {
  dispatch({ type: UPDATE_LOGIN_ERROR, payload: error });
};

const getCurrentUser = async () => {
  const response = await fetchAuthSession();
  const { tokens } = response;
  const idToken = tokens?.idToken;
  const userAttributes = idToken.payload;

  return {
    userAttributes,
    idToken,
    accessToken: tokens?.accessToken,
  };
};

export const loginSuccess =
  ({ route }) =>
  async (dispatch) => {
    const { userAttributes } = await getCurrentUser();
    const checkIsTermsAccepted = userAttributes?.["custom:publisher_tnc"]
      ? JSON.parse(userAttributes?.["custom:publisher_tnc"])
      : { ver: "1", accepted: false };
    const userDetails = {
      type: LOGIN_SUCCESS,
      payload: {
        login: { isLoggedIn: true },
        email: userAttributes.email,
        nickname: userAttributes.nickname,
        isEmailVerified: userAttributes.email_verified,
        isTermsAccepted: checkIsTermsAccepted,
      },
    };

    dispatch(userDetails);
    if (!checkIsTermsAccepted) {
      route = `/${Routes.ONBOARDING}`;
    }
    History.navigate(route);
    dispatch(loaderActions.stopAppLoader());
  };

export const login =
  ({ email, password, route }) =>
  async (dispatch) => {
    dispatch(loaderActions.startAppLoader(LoaderContent.LOGIN));
    let userDetails = {};
    try {
      const loginRequest = await signIn({ username: email, password });

      if (loginRequest?.isSignedIn) {
        dispatch(loginSuccess({ route }));
        return;
      }
      if (loginRequest?.nextStep?.signInStep === NEXT_SIGN_IN_STEP.CONFIRM_SIGN_UP) {
        throw new Error("User does not exist.");
      }
      throw new Error("Something went wrong. Please, try again later");
    } catch (err) {
      console.error("login error", err);
      if (err?.code === "PasswordResetRequiredException") {
        dispatch(updateEmail(email));
        History.navigate(`/${Routes.RESET_PASSWORD}`);
        dispatch(loaderActions.stopAppLoader());
        return;
      } else if (err?.code === "UserNotConfirmedException") {
        dispatch(updateEmail(email));
        userDetails = {
          type: LOGIN_SUCCESS,
          payload: { login: { isLoggedIn: true } },
        };
        dispatch(userDetails);
        History.navigate(`/${Routes.ONBOARDING}`);
        dispatch(loaderActions.stopAppLoader());
        return;
      }
      const error = parseError(err);
      userDetails = {
        type: LOGIN_ERROR,
        payload: { login: { error } },
      };
      dispatch(userDetails);
      throw err;
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

// const registrationAPI = (token) => {
//   const apiName = APIEndpoints.USER.name;
//   const apiPath = APIPaths.SIGNUP;
//   const apiOptions = initializeAPIOptions(token);
//   return getAPI(apiName, apiPath, apiOptions);
// };

// const registerInMarketplace = (token) => async (dispatch) => {
//   const response = await registrationAPI(token);
//   if (response.data === "success") {
//     dispatch(fetchAuthenticatedUser());
//   }
// };

export const signOut = () => (dispatch) => {
  dispatch(loaderActions.startAppLoader(LoaderContent.SIGN_OUT));
  let userDetails = {
    type: SIGN_OUT,
    payload: {
      login: {
        isLoggedIn: true,
        error: undefined,
        loading: true,
      },
    },
  };
  signOutAws()
    .then(() => {
      userDetails.payload = {
        login: {
          isLoggedIn: false,
          error: undefined,
          loading: false,
        },
        isTermsAccepted: false,
      };
    })
    .finally(() => {
      dispatch(userDetails);
      dispatch(loaderActions.stopAppLoader());
    });
};

const userDeleted = (route) => (dispatch) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: {
        isLoggedIn: false,
      },
      isEmailVerified: false,
      walletAddress: undefined,
      email: "",
    },
  });
  History.navigate(route);
};

const deleteUserFromMarketPlace = (token) => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.USER;
  const apiOptions = initializeAPIOptions(token);
  return deleteAPI(apiName, path, apiOptions);
};

const deleteUserFromCognito = (route) => (dispatch) => {
  try {
    deleteUser();
    dispatch(userDeleted(route));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

export const deleteUserAccount = (route) => async (dispatch) => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_USER));
    const currentUser = await getCurrentUser();
    await deleteUserFromMarketPlace(currentUser.idToken.toString());
    dispatch(deleteUserFromCognito(route));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loaderActions.stopAppLoader());
  }
};

const forgotPasswordInit = (dispatch) => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD));
  dispatch(errorActions.resetForgotPasswordError);
};

const forgotPasswordSuccessfull =
  ({ email, route }) =>
  (dispatch) => {
    dispatch(updateEmail(email));
    History.navigate(route);
    dispatch(loaderActions.stopAppLoader());
  };

const forgotPasswordFailure = (error) => (dispatch) => {
  dispatch(errorActions.updateForgotPasswordError(error));
  dispatch(loaderActions.stopAppLoader());
};

export const forgotPassword =
  ({ email, route }) =>
  (dispatch) => {
    dispatch(forgotPasswordInit);
    resetPassword({ username: email })
      .then(() => {
        dispatch(forgotPasswordSuccessfull({ email, route }));
      })
      .catch((err) => {
        dispatch(forgotPasswordFailure(err.message));
      });
  };

const forgotPasswordSubmitInit = () => (dispatch) => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD_SUBMIT));
  dispatch(errorActions.resetForgotPasswordSubmitError);
};

const forgotPasswordSubmitSuccessfull = (email, route) => (dispatch) => {
  dispatch(updateEmail(email));
  dispatch(loaderActions.stopAppLoader());
  History.navigate(route);
};

const forgotPasswordSubmitFailure = (error) => (dispatch) => {
  dispatch(errorActions.updateForgotPasswordSubmitError(error));
  dispatch(loaderActions.stopAppLoader());
};

export const forgotPasswordSubmit = (email, code, password, route) => (dispatch) => {
  dispatch(forgotPasswordSubmitInit());

  confirmResetPassword({ username: email, newPassword: password, confirmationCode: code })
    .then(() => {
      dispatch(forgotPasswordSubmitSuccessfull(email, route));
    })
    .catch((err) => {
      dispatch(forgotPasswordSubmitFailure(err.message));
    });
};

export const updateWallet = (walletDetails) => (dispatch) => {
  dispatch({ type: UPDATE_WALLET, payload: { ...walletDetails } });
};

export const updateWalletList = (walletList) => (dispatch) => {
  dispatch({ type: UPDATE_WALLET_LIST, payload: walletList });
};

export const updateFirstTimeFetchWallet = (value) => (dispatch) => {
  dispatch({ type: UPDATE_FIRST_TIME_FETCH_WALLET, payload: value });
};

const fetchWalletSuccess = (response) => (dispatch) => {
  if (!isEmpty(response.data.wallets)) {
    dispatch(updateWalletList(response.data.wallets));
  }
};

export const updateChannelBalanceAPI =
  ({ orgId, serviceId, channelId, signedAmount }) =>
  async (dispatch) => {
    const { token } = await dispatch(fetchAuthenticatedUser());
    const apiName = APIEndpoints.CONTRACT.name;
    const apiPath = APIPaths.UPDATE_CHANNEL_BALANCE(channelId);
    const payload = {
      signed_amount: signedAmount,
      channel_id: channelId,
      org_id: orgId,
      service_id: serviceId,
    };
    const apiOptions = initializeAPIOptions(token, payload);
    return postAPI(apiName, apiPath, apiOptions);
  };

const fetchWalletAPI = (token, orgId, groupId) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.WALLET;
  const queryStringParameters = {
    org_id: orgId,
    group_id: groupId,
  };
  const apiOptions = initializeAPIOptions(token, null, queryStringParameters);
  return getAPI(apiName, apiPath, apiOptions);
};

export const fetchWallet = (orgId, groupId) => async (dispatch) => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const response = await fetchWalletAPI(token, orgId, groupId);
  return dispatch(fetchWalletSuccess(response));
};

const fetchAvailableUserWalletsAPI = (token) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.WALLETS;
  const apiOptions = initializeAPIOptions(token);
  return getAPI(apiName, apiPath, apiOptions);
};

export const fetchAvailableUserWallets = () => async (dispatch) => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const response = await fetchAvailableUserWalletsAPI(token);
  return response.data.wallets;
};

export const fetchWalletLinkedProviders = async (address) => {
  const url = `${APIEndpoints.CONTRACT.endpoint}${APIPaths.LINKED_PROVIDERS}?wallet_address=${address}`;
  const response = await fetch(url).then((res) => res.json());
  return response.organizations || [];
};

export const startWalletDetailsPolling = (orgId, groupId) => (dispatch) => {
  return dispatch(fetchWallet(orgId, groupId));
};

const updateDefaultWalletAPI = (token, address) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.UPDATE_DEFAULT_WALLET;
  const postObj = { address };
  const apiOptions = initializeAPIOptions(token, postObj);
  return postAPI(apiName, apiPath, apiOptions);
};

const updateDefaultWallet = (address) => async (dispatch) => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  return await updateDefaultWalletAPI(token, address);
};

const registerWalletSuccess = (address) => (dispatch) => {
  return dispatch(updateDefaultWallet(address));
};

const registerWalletAPI = (token, address, type) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.REGISTER_WALLET;
  const postObj = { address, type };
  const apiOptions = initializeAPIOptions(token, postObj);
  return postAPI(apiName, apiPath, apiOptions);
};

export const registerWallet = (address, type) => async (dispatch) => {
  try {
    const { token } = await dispatch(fetchAuthenticatedUser());
    await registerWalletAPI(token, address, type);
    return dispatch(registerWalletSuccess(address));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error registerWallet");
  }
};

export const updateMetamaskWallet = () => async (dispatch, getState) => {
  try {
    const sdk = await dispatch(getSdk());
    const address = await sdk.account.getAddress();

    if (getState().userReducer.wallet?.address === address) {
      return address;
    }

    const availableUserWallets = await dispatch(fetchAvailableUserWallets());
    const addressAlreadyRegistered = availableUserWallets.some(
      (wallet) => wallet.address.toLowerCase() === address.toLowerCase()
    );

    if (!addressAlreadyRegistered) {
      await dispatch(registerWallet(address, walletTypes.METAMASK));
    }
    dispatch(updateWallet({ type: walletTypes.METAMASK, address }));
    return address;
  } catch (err) {
    throw new Error("Can't update metamask wallet");
  }
};
