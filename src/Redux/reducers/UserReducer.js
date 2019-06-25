const InitialState = {
    userDetails: { isLoggedIn: false },
};

const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "SET_USER_DETAILS": {
            return state;
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
