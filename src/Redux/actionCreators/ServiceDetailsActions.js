import { API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { fetchAuthenticatedUser } from "./UserActions";
import { loaderActions } from ".";
import { LoaderContent } from "../../utility/constants/LoaderContent";

export const UPDATE_SERVICE_DETAILS = "UPDATE_SERVICE_DETAILS";
export const RESET_SERVICE_DETAILS = "RESET_SERVICE_DETAILS";
export const UPDATE_FREE_CALLS_INFO = "UPDATE_FREE_CALLS_INFO";

const resetServiceDetails = dispatch => {
  dispatch({ type: RESET_SERVICE_DETAILS });
};

const fetchServiceDetailsFailure = err => dispatch => {
  dispatch(loaderActions.stopAppLoader);
};

const fetchServiceDetailsSuccess = serviceDetails => dispatch => {
  dispatch(loaderActions.stopAppLoader);
  dispatch({ type: UPDATE_SERVICE_DETAILS, payload: serviceDetails });
};

const fetchServiceDetailsAPI = async (orgId, serviceId) => {
  const url = `${APIEndpoints.CONTRACT.endpoint}/org/${orgId}/service/${serviceId}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchServiceDetails = (orgId, serviceId) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_SERVICE_DETAILS));
    dispatch(resetServiceDetails);
    const serviceDetails = await fetchServiceDetailsAPI(orgId, serviceId);
    dispatch(fetchServiceDetailsSuccess(serviceDetails));
  } catch (error) {
    dispatch(fetchServiceDetailsFailure(error));
    throw error;
  }
};

const fetchMeteringDataError = error => dispatch => {
  dispatch(loaderActions.stopAppLoader);
};

const fetchMeteringDataSuccess = usageData => dispatch => {
  const freeCallsRemaining = usageData.free_calls_allowed - usageData.total_calls_made;
  dispatch({
    type: UPDATE_FREE_CALLS_INFO,
    payload: { allowed: usageData.free_calls_allowed, remaining: freeCallsRemaining },
  });
  dispatch(loaderActions.stopAppLoader);
};

const meteringAPI = (token, orgId, serviceId, userId) => {
  const apiName = APIEndpoints.USER.name;
  const apiPath = `${APIPaths.FREE_CALL_USAGE}?organization_id=${orgId}&service_id=${serviceId}&username=${userId}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchMeteringData = ({ orgId, serviceId }) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_METERING_DATA));
    const { email, token } = await fetchAuthenticatedUser();
    const usageData = await meteringAPI(token, orgId, serviceId, email);
    return dispatch(fetchMeteringDataSuccess(usageData));
  } catch (error) {
    return dispatch(fetchMeteringDataError(error));
  }
};
