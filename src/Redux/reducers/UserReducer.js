import { userActions } from "../actionCreators";
import { arrowFunctionExpression } from "@babel/types";

const userDetails = {
    isInitialized: false,
    isLoggedIn: false,
    isEmailVerified: false,
};

const userReducer = (state = userDetails, action) => {
    switch (action.type) {
        case userActions.SET_USER_DETAILS: {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                isInitialized: action.payload.isInitialized,
                isEmailVerified: action.payload.isEmailVerified,
            };
        }

        case userActions.LOGIN: {
            return { ...state, isLoggedIn: action.payload.isLoggedIn, isInitialized: action.payload.isInitialized };
        }

        case userActions.SIGN_OUT: {
            return { ...state, isLoggedIn: action.payload.isLoggedIn };
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
