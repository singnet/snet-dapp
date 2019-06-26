export const setUser = userDetails => dispatch => {
    dispatch({
        type: "SET_USER_DETAILS",
        payload: userDetails,
    });
};
