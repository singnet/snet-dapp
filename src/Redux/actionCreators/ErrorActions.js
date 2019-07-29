export const UPDATE_FORGOT_PASSWORD_ERROR = "UPDATE_FORGOT_PASSWORD_ERROR";
export const RESET_FORGOT_PASSWORD_ERROR = "RESET_FORGOT_PASSWORD_ERROR";
export const UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR = "UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR";
export const RESET_FORGOT_PASSWORD_SUBMIT_ERROR = "RESET_FORGOT_PASSWORD_SUBMIT_ERROR";
export const UPDATE_PROFILE_SETTINGS_ERROR = "UPDATE_PROFILE_SETTINGS_ERROR";
export const RESET_PROFILE_SETTINGS_ERROR = "RESET_PROFILE_SETTINGS_ERROR";

export const updateForgotPasswordError = error => dispatch => {
  dispatch({ type: UPDATE_FORGOT_PASSWORD_ERROR, payload: { forgotPassword: error } });
};

export const resetForgotPasswordError = dispatch => {
  dispatch({ type: RESET_FORGOT_PASSWORD_ERROR, payload: { forgotPassword: undefined } });
};

export const updateForgotPasswordSubmitError = error => dispatch => {
  dispatch({ type: UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR, payload: { forgotPasswordSubmit: error } });
};

export const resetForgotPasswordSubmitError = dispatch => {
  dispatch({ type: RESET_FORGOT_PASSWORD_SUBMIT_ERROR, payload: { forgotPasswordSubmit: undefined } });
};

export const updateProfileSettingsError = error => dispatch => {
  dispatch({ type: UPDATE_PROFILE_SETTINGS_ERROR, payload: { profileSettings: error } });
};

export const resetProfileSettingsError = dispatch => {
  dispatch({ type: RESET_PROFILE_SETTINGS_ERROR, payload: { profileSettings: undefined } });
};
