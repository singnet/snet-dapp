import { userActions } from "../actionCreators";

const userDetails = {
    isLoggedIn: false,
};

const userReducer = (state = userDetails, action) => {
    switch (action.type) {
        case userActions.SET_USER_DETAILS: {
            return { ...state, isLoggedIn: action.payload.isLoggedIn };
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
