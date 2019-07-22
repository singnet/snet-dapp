import { Auth, API } from "aws-amplify";

import { APIEndpoints } from "../../config/APIEndpoints";
import { parseError } from "../../utility/ErrorHandling";
import { userActions, errorActions, loaderActions } from ".";
import { LoaderContent } from "../../utility/constants/LoaderContent";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const CHECK_WALLET_STATUS = "CHECK_WALLET_STATUS";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_EMAIL_VERIFIED = "UPDATE_EMAIL_VERIFIED";

export const updateUsername = username => dispatch => {
  dispatch({ type: UPDATE_USERNAME, payload: { username } });
};

export const updateEmailVerified = value => dispatch => {
  dispatch({ type: UPDATE_EMAIL_VERIFIED, payload: { isEmailVerified: value } });
};

export const fetchUserDetails = dispatch => {
  let userDetails = {
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: false, error: undefined, loading: true },
      isInitialized: true,
    },
  };
  Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(res => {
      if (res === null || res === undefined) {
        userDetails.payload = {
          ...userDetails.payload,
          login: { isLoggedIn: false, error: undefined, loading: false },
        };
        return;
      }

      userDetails.payload = {
        ...userDetails.payload,
        login: { isLoggedIn: true, error: undefined, loading: false },
      };
      if (res.attributes && res.attributes.email_verified) {
        userDetails.payload = {
          ...userDetails.payload,
          isEmailVerified: res.attributes.email_verified,
          email: res.attributes.email,
          username: res.username,
        };
        dispatch(checkWalletStatus(res.username));
      }
      dispatch(userDetails);
    })
    .finally(() => {
      dispatch(userDetails);
    });
};

export const loginSuccess = ({ res, history, route }) => dispatch => {
  dispatch(updateUsername(res.attributes.name));
  dispatch(updateEmailVerified(res.attributes.email_verified));
  history.push(route);
};

export const login = ({ username, password, history, route }) => dispatch => {
  dispatch({ type: LOGIN_LOADING });
  let userDetails = {};
  return Auth.signIn(username, password)
    .then(res => {
      dispatch(() => updateUsername(username));
      userDetails = {
        type: userActions.LOGIN_SUCCESS,
        payload: { login: { isLoggedIn: true } },
      };
      dispatch(userDetails);
      dispatch(loginSuccess({ res, history, route }));
    })
    .catch(err => {
      if (err.code === "UserNotConfirmedException") {
        dispatch(updateUsername(username));
        userDetails = {
          type: userActions.LOGIN_SUCCESS,
          payload: { login: { isLoggedIn: true } },
        };
        dispatch(userDetails);
        loginSuccess({ history, route });
        return;
      }
      const error = parseError(err);
      userDetails = {
        type: userActions.LOGIN_ERROR,
        payload: { login: { error } },
      };
      dispatch(userDetails);
      throw err;
    });
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

export const checkWalletStatus = username => (dispatch, getState) => {
  Auth.currentSession({ bypassCache: true })
    .then(currentSession => {
      let apiName = APIEndpoints.GET_SERVICE_LIST.name;
      let path = `/wallet?username=${username}`;
      let myInit = {
        headers: { Authorization: currentSession.idToken.jwtToken },
        queryStringParameters: {
          username,
        },
      };
      dispatch(updateEmailVerified(currentSession.idToken.payload.email_verified));
      API.get(apiName, path, myInit).then(res => {
        dispatch({
          type: CHECK_WALLET_STATUS,
          payload: { isWalletAssigned: res.data.isAssigned },
        });
      });
    })
    .catch(err => {
      if (err === "No current user") {
        dispatch({
          type: CHECK_WALLET_STATUS,
          payload: { login: { ...getState().userReducer.login, isLoggedIn: false } },
        });
      }
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
      isWalletAssigned: false,
      email: "",
    },
  });
  history.push(route);
};
const deleteUser = (user, { history, route }) => dispatch => {
  new Promise((resolve, reject) => {
    user.deleteUser(error => {
      if (error) {
        reject(error);
        dispatch(loaderActions.stopAppLoader);
      }
      resolve();
    });
  }).then(() => {
    dispatch(loaderActions.stopAppLoader);
    dispatch(userDeleted({ history, route }));
  });
};
const fetchCurrentUser = () => {
  return Auth.currentAuthenticatedUser({ bypassCache: true });
};

export const deleteUserAccount = ({ history, route }) => dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_USER));
  dispatch(() =>
    fetchCurrentUser().then(user => {
      dispatch(deleteUser(user, { history, route }));
    })
  );
};

const forgotPasswordInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD));
  dispatch(errorActions.resetForgotPasswordError);
};

const forgotPasswordSuccessfull = ({ username, history, route }) => dispatch => {
  dispatch(updateUsername(username));
  dispatch(loaderActions.stopAppLoader);
  history.push(route);
};

const forgotPasswordFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPassword = ({ username, history, route }) => dispatch => {
  dispatch(forgotPasswordInit);
  Auth.forgotPassword(username)
    .then(() => {
      dispatch(forgotPasswordSuccessfull({ history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordFailure(err.message));
    });
};

const forgotPasswordSubmitInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD_SUBMIT));
  dispatch(errorActions.resetForgotPasswordSubmitError);
};

const forgotPasswordSubmitSuccessfull = ({ username, history, route }) => dispatch => {
  dispatch(updateUsername(username));
  dispatch(loaderActions.stopAppLoader);
  history.push(route);
};

const forgotPasswordSubmitFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordSubmitError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPasswordSubmit = ({ username, code, password, history, route }) => dispatch => {
  dispatch(forgotPasswordSubmitInit);
  Auth.forgotPasswordSubmit(username, code, password)
    .then(() => {
      dispatch(forgotPasswordSubmitSuccessfull({ username, history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordSubmitFailure(err.message));
    });
};
