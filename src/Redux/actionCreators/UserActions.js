export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const setUser = userDetails => dispatch => {
    dispatch({
        type: SET_USER_DETAILS,
        payload: userDetails,
    });
};
