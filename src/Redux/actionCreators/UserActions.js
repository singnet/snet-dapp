import { Auth } from "aws-amplify";

export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const setUserDetails = () => dispatch => {
    let userDetails = {
        type: SET_USER_DETAILS,
        payload: { isLoggedIn: true, isInitialized: true },
    };
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(res => {
        if (res === null || res === undefined) {
            userDetails.payload.isLoggedIn = false;
            return;
        }
    });
    dispatch({ ...userDetails });
};
