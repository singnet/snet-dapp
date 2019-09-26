import { Auth, API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { parseError } from "../../utility/ErrorHandling";
import { userActions, errorActions, loaderActions } from ".";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { initializeAPIOptions } from "../../utility/API";
import Routes from "../../utility/constants/Routes";

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
export const APP_INITIALIZATION_SUCCESS = "APP_INITIALIZATION_SUCCESS";
export const UPDATE_IS_TERMS_ACCEPTED = "UPDATE_IS_TERMS_ACCEPTED";

export const walletTypes = {
  // SNET: "SNET",
  METAMASK: "METAMASK",
};

export const fetchAuthenticatedUser = async () => {
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  return {
    nickname: currentUser.attributes.nickname,
    email: currentUser.attributes.email,
    email_verified: currentUser.attributes.email_verified,
    token: currentUser.signInUserSession.idToken.jwtToken,
  };
};

export const appInitializationSuccess = dispatch => {
  dispatch({ type: APP_INITIALIZATION_SUCCESS, payload: { isInitialized: true } });
  dispatch(loaderActions.stopAppLoader);
};

export const updateNickname = nickname => dispatch => {
  dispatch({ type: UPDATE_NICKNAME, payload: { nickname } });
};

export const updateEmail = email => dispatch => {
  dispatch({ type: UPDATE_EMAIL, payload: { email } });
};

export const updateEmailVerified = value => dispatch => {
  dispatch({ type: UPDATE_EMAIL_VERIFIED, payload: { isEmailVerified: value } });
};

const updateEmailAlertsSubscription = emailAlerts => dispatch => {
  dispatch({ type: UPDATE_EMAIL_ALERTS_SUBSCRIPTION, payload: emailAlerts });
};

const updateIsTermsAccepted = isTermsAccepted => dispatch => {
  dispatch({ type: UPDATE_IS_TERMS_ACCEPTED, payload: isTermsAccepted });
};

const fetchUserProfile = token => dispatch => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.GET_USER_PROFILE;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, path, apiOptions).then(res => {
    if (res.data.data.length === 0) {
      dispatch(registerInMarketplace(token));
      return;
    }
    dispatch(updateEmailAlertsSubscription(Boolean(res.data.data[0].email_alerts)));
    dispatch(updateIsTermsAccepted(Boolean(res.data.data[0].is_terms_accepted)));
  });
};

export const updateWallet = ({ type, address }) => dispatch => {
  if (address) {
    dispatch({ type: UPDATE_WALLET, payload: { type, address } });
    return;
  }
  dispatch({ type: UPDATE_WALLET, payload: { type } });
};

const noAuthenticatedUser = dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: false, error: undefined, loading: false },
      isInitialized: true,
    },
  });
};

const fetchUserDetailsSuccess = (isEmailVerified, email, nickname) => dispatch => {
  const wallet = JSON.parse(sessionStorage.getItem("wallet")) || {};
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: true, error: undefined, loading: false },
      isInitialized: true,
      isEmailVerified,
      email,
      nickname,
      wallet,
    },
  });
  dispatch(loaderActions.stopAppLoader);
};

const fetchUserDetailsError = err => dispatch => {
  if (err === "No current user") {
    dispatch(noAuthenticatedUser);
    dispatch(loaderActions.stopAppLoader);
  }
  dispatch(appInitializationSuccess);
};

export const fetchUserDetails = async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.APP_INIT));
  try {
    const { nickname, token, email, email_verified } = await fetchAuthenticatedUser();
    await dispatch(fetchUserProfile(token));
    if (email === null || email === undefined) {
      //Username review - test for no authernticated user
      dispatch(noAuthenticatedUser);
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
  const path = APIPaths.UPDATE_USER_PROFILE;
  const apiOptions = initializeAPIOptions(token, updatedUserData);
  return API.post(apiName, path, apiOptions);
};

const updateUserProfileSuccess = token => dispatch => {
  dispatch(fetchUserProfile(token));
  dispatch(loaderActions.stopAppLoader);
};

const updateUserProfileFailure = err => dispatch => {
  dispatch(errorActions.updateProfileSettingsError(String(err)));
  dispatch(loaderActions.stopAppLoader);
};

export const updateUserProfile = updatedUserData => async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_PROFILE));
  try {
    const { token } = await fetchAuthenticatedUser();
    const response = await updateUserProfileInit(token, updatedUserData);
    if (response.status === "success") {
      return dispatch(updateUserProfileSuccess(token));
    }
  } catch (err) {
    dispatch(updateUserProfileFailure(err));
    throw err;
  }
};

export const resetLoginError = dispatch => {
  dispatch({ type: RESET_LOGIN_ERROR });
};

export const updateLoginError = error => dispatch => {
  dispatch({ type: UPDATE_LOGIN_ERROR, payload: error });
};

export const loginSuccess = ({ res, history, route }) => async dispatch => {
  const userDetails = {
    type: userActions.LOGIN_SUCCESS,
    payload: {
      login: { isLoggedIn: true },
      email: res.attributes.email,
      nickname: res.attributes.nickname,
      isEmailVerified: res.attributes.email_verified,
    },
  };
  dispatch(userDetails);
  history.push(route);
  await dispatch(fetchUserProfile(res.signInUserSession.idToken.jwtToken));
  dispatch(loaderActions.stopAppLoader);
};

export const login = ({ email, password, history, route }) => dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.LOGIN));
  let userDetails = {};
  return Auth.signIn(email, password)
    .then(res => {
      dispatch(loginSuccess({ res, history, route }));
    })
    .catch(err => {
      if (err.code === "UserNotConfirmedException") {
        dispatch(updateEmail(email));
        userDetails = {
          type: userActions.LOGIN_SUCCESS,
          payload: { login: { isLoggedIn: true } },
        };
        dispatch(userDetails);
        history.push(`/${Routes.ONBOARDING}`);
        dispatch(loaderActions.stopAppLoader);
        return;
      }
      const error = parseError(err);
      userDetails = {
        type: userActions.LOGIN_ERROR,
        payload: { login: { error } },
      };
      dispatch(userDetails);
      dispatch(loaderActions.stopAppLoader);
      throw err;
    });
};

const registrationAPI = token => {
  const apiName = APIEndpoints.USER.name;
  const apiPath = APIPaths.SIGNUP;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

const registerInMarketplace = token => async dispatch => {
  const response = await registrationAPI(token);
  if (response.data === "success") {
    dispatch(fetchUserProfile(token));
  }
};

export const signOut = dispatch => {
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
  Auth.signOut()
    .then(() => {
      userDetails.payload.login = {
        isLoggedIn: false,
        error: undefined,
        loading: false,
      };
    })
    .finally(() => {
      dispatch(userDetails);
      dispatch(loaderActions.stopAppLoader);
    });
};

const userDeleted = ({ history, route }) => dispatch => {
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
  history.push(route);
};

const deleteUserFromMarketPlace = token => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.DELETE_USER;
  const apiOptions = {
    headers: { Authorization: token },
  };
  return API.get(apiName, path, apiOptions);
};

const deleteUserFromCognito = (user, { history, route }) => dispatch => {
  new Promise((resolve, reject) => {
    user.deleteUser(error => {
      if (error) {
        reject(error);
        dispatch(loaderActions.stopAppLoader);
      }
      resolve();
    });
  }).then(() => {
    dispatch(userDeleted({ history, route }));
    dispatch(loaderActions.stopAppLoader);
  });
};

export const deleteUserAccount = ({ history, route }) => async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_USER));
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  await deleteUserFromMarketPlace(currentUser.signInUserSession.idToken.jwtToken);
  dispatch(deleteUserFromCognito(currentUser, { history, route }));
};

const forgotPasswordInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD));
  dispatch(errorActions.resetForgotPasswordError);
};

const forgotPasswordSuccessfull = ({ email, history, route }) => dispatch => {
  dispatch(updateEmail(email));
  history.push(route);
  dispatch(loaderActions.stopAppLoader);
};

const forgotPasswordFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPassword = ({ email, history, route }) => dispatch => {
  dispatch(forgotPasswordInit);
  Auth.forgotPassword(email)
    .then(() => {
      dispatch(forgotPasswordSuccessfull({ email, history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordFailure(err.message));
    });
};

const forgotPasswordSubmitInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD_SUBMIT));
  dispatch(errorActions.resetForgotPasswordSubmitError);
};

const forgotPasswordSubmitSuccessfull = ({ email, history, route }) => dispatch => {
  dispatch(updateEmail(email));
  dispatch(loaderActions.stopAppLoader);
  history.push(route);
};

const forgotPasswordSubmitFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordSubmitError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPasswordSubmit = ({ email, code, password, history, route }) => dispatch => {
  dispatch(forgotPasswordSubmitInit);
  Auth.forgotPasswordSubmit(email, code, password)
    .then(() => {
      dispatch(forgotPasswordSubmitSuccessfull({ email, history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordSubmitFailure(err.message));
    });
};
