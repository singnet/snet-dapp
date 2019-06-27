import { Auth } from "aws-amplify";
import Session from "../../utility/stringConstants/Session";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN = "LOGIN";
export const SIGN_OUT = "SIGN_OUT";

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
        payload: { isLoggedIn: true, isInitialized: true, isEmailVerified: false },
    };

    Auth.signIn(username, password)
        .then(res => {
            sessionStorage.setItem(Session.USERNAME, username);
            userDetails.payload.isEmailVerified = res.attributes.email_verified;
        })
        .catch(err => {
            if (err.code === "UserNotConfirmedException") {
                sessionStorage.setItem(Session.USERNAME, username);
                return;
            }
            userDetails.payload.isLoggedIn = false;
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
