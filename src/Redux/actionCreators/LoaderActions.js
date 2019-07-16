export const START_APP_LOADER = "START_APP_LOADER";
export const STOP_APP_LOADER = "STOP_APP_LOADER";
export const START_FORGOT_PASSWORD_LOADER = "START_FORGOT_PASSWORD_LOADER";
export const STOP_FORGOT_PASSWORD_LOADER = "STOP_FORGOT_PASSWORD_LOADER";

export const startAppLoader = loaderContent => dispatch => {
  dispatch({ type: START_APP_LOADER, payload: { app: { loading: true, ...loaderContent } } });
};

export const stopAppLoader = dispatch => {
  dispatch({ type: STOP_APP_LOADER, payload: { app: { loading: false, loaderHeader: "", loaderText: "" } } });
};
