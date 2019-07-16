export const SET_HAMBURGER_MENU_STATE = "SET_HAMBURGER_MENU_STATE";

export const updateHamburgerState = hamburgerState => dispatch => {
  dispatch({ type: SET_HAMBURGER_MENU_STATE, payload: { hamburgerMenu: hamburgerState } });
};
