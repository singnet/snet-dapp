import { userActions } from "../actionCreators";

const userDetails = {
    isInitialized: false,
    isLoggedIn: false,
    isEmailVerified: false,
    isWalletAssigned: false,
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

        case userActions.CHECK_WALLET_STATUS: {
            console.log("check wallet status", action);
            return { ...state, isWalletAssigned: action.payload.isWalletAssigned };
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
