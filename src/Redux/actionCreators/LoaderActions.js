export const START_APP_LOADER = "START_APP_LOADER";
export const STOP_APP_LOADER = "STOP_APP_LOADER";
export const START_FORGOT_PASSWORD_LOADER = "START_FORGOT_PASSWORD_LOADER";
export const STOP_FORGOT_PASSWORD_LOADER = "STOP_FORGOT_PASSWORD_LOADER";

export const startAppLoader = dispatch => {
  dispatch({ type: START_APP_LOADER, payload: { app: true } });
};

export const stopAppLoader = dispatch => {
  dispatch({ type: STOP_APP_LOADER, payload: { app: false } });
};

export const startForgotPasswordLoader = dispatch => {
  dispatch({ type: START_FORGOT_PASSWORD_LOADER, payload: { forgotPassword: true } });
};

export const stopForgotPasswordLoader = dispatch => {
  dispatch({ type: STOP_FORGOT_PASSWORD_LOADER, payload: { forgotPassword: false } });
};
