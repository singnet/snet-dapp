import { Auth, API } from "aws-amplify";

import Session from "../../utility/constants/Session";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { parseError } from "../../utility/ErrorHandling";
import { userActions } from ".";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const CHECK_WALLET_STATUS = "CHECK_WALLET_STATUS";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const setUserDetails = dispatch => {
  let userDetails = {
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: false, error: undefined, loading: true },
      isInitialized: true,
      isEmailVerified: false,
      email: "",
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
        };
      }
    })
    .finally(() => {
      dispatch(userDetails);
    });
};

export const login = ({ username, password }) => dispatch => {
  dispatch({ type: LOGIN_LOADING });
  let userDetails = {};
  return Auth.signIn(username, password)
    .then(res => {
      sessionStorage.setItem(Session.USERNAME, username);
      userDetails = {
        type: userActions.LOGIN_SUCCESS,
        payload: { login: { isLoggedIn: true } },
      };
      dispatch(userDetails);
    })
    .catch(err => {
      if (err.code === "UserNotConfirmedException") {
        sessionStorage.setItem(Session.USERNAME, username);
        userDetails = {
          type: userActions.LOGIN_SUCCESS,
          payload: { login: { isLoggedIn: true } },
        };
        dispatch(userDetails);
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
    .finally(() => dispatch(userDetails));
};

export const checkWalletStatus = (dispatch, getState) => {
  const username = sessionStorage.getItem(Session.USERNAME);

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

export const deleteUserAccount = () => async dispatch => {
  await Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(user => {
      new Promise(resolve => {
        user.deleteUser(error => {
          if (error) {
            resolve(error);
          }
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
        });
      });
    })
    .catch(err => {
      throw err;
    });
};
