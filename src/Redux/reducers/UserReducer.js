import { userActions } from "../actionCreators";

const userDetails = {
    isInitialized: false,
    isLoggedIn: false,
};

const userReducer = (state = userDetails, action) => {
    switch (action.type) {
        case userActions.SET_USER_DETAILS: {
            return { ...state, isLoggedIn: action.payload.isLoggedIn, isInitialized: action.payload.isInitialized };
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
