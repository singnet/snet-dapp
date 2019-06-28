import { Auth, API } from "aws-amplify";

import Session from "../../utility/stringConstants/Session";
import { APIEndpoints } from "../../utility/stringConstants/APIEndpoints";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN = "LOGIN";
export const SIGN_OUT = "SIGN_OUT";
export const CHECK_WALLET_STATUS = "CHECK_WALLET_STATUS";

export const setUserDetails = dispatch => {
    let userDetails = {
        type: SET_USER_DETAILS,
        payload: { isLoggedIn: false, isInitialized: true, isEmailVerified: false },
    };
    Auth.currentAuthenticatedUser({ bypassCache: true })
        .then(res => {
            if (res === null || res === undefined) {
                userDetails.payload = { ...userDetails.payload, isLoggedIn: false };

                return;
            }
            userDetails.payload = {
                ...userDetails.payload,
                isLoggedIn: true,
                isEmailVerified: res.attributes.email_verified,
            };
        })
        .finally(() => dispatch(userDetails));
};

export const login = ({ username, password }) => dispatch => {
    let userDetails = {
        type: SET_USER_DETAILS,
        payload: { isLoggedIn: false, isInitialized: true, isEmailVerified: false },
    };

    return Auth.signIn(username, password)
        .then(res => {
            sessionStorage.setItem(Session.USERNAME, username);
            userDetails.payload.isEmailVerified = res.attributes.email_verified;
            userDetails.payload.isLoggedIn = true;
        })
        .catch(err => {
            // if (err.code === "UserNotConfirmedException") {
            //     sessionStorage.setItem(Session.USERNAME, username);
            //     return;
            // }
            // userDetails.payload.isLoggedIn = false;
            throw err;
        })
        .finally(() => dispatch(userDetails));
};

export const signOut = dispatch => {
    let userDetails = {
        type: SIGN_OUT,
        payload: { isLoggedIn: true },
    };
    Auth.signOut()
        .then(data => {
            userDetails.payload.isLoggedIn = false;
        })
        .catch(err => {})
        .finally(() => dispatch(userDetails));
};

export const checkWalletStatus = dispatch => {
    const username = sessionStorage.getItem(Session.USERNAME);

    Auth.currentSession({ bypassCache: true })
        .then(currentSession => {
            console.log("wallet status", currentSession);
            let apiName = APIEndpoints.GET_SERVICES_LIST.name;
            let path = `/wallet?username=${username}`;
            let myInit = {
                headers: { Authorization: currentSession.idToken.jwtToken },
                queryStringParameters: {
                    username,
                },
            };
            API.get(apiName, path, myInit)
                .then(res => {
                    console.log("checkWalletStatus", res);
                    dispatch({
                        type: CHECK_WALLET_STATUS,
                        payload: { isWalletAssigned: res.data.isAssigned },
                    });
                })
                .catch(() => {});
        })
        .catch(err => {
            if (err === "No current user") {
                dispatch({
                    type: CHECK_WALLET_STATUS,
                    payload: { isLoggedIn: false },
                });
            }
            console.log(err);
        });
};
