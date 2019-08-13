import { API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";
import { fetchAuthenticatedUser } from "./UserActions";

export const UPDATE_SERVICE_METADATA = "UPDATE_SERVICE_METADATA";
export const RESET_SERVICE_METADATA = "RESET_SERVICE_METADATA";
export const UPDATE_FREE_CALLS_ALLOWED = "UPDATE_FREE_CALLS_ALLOWED";
export const UPDATE_FREE_CALLS_REMAINING = "UPDATE_FREE_CALLS_REMAINING";

const resetServiceMetadata = dispatch => {
  dispatch({ type: RESET_SERVICE_METADATA });
};
const fetchServiceMetadataSuccess = serviceMetadata => dispatch => {
  dispatch({ type: UPDATE_SERVICE_METADATA, payload: serviceMetadata });
};

const fetchServiceMetadataAPI = async ({ orgId, serviceId }) => {
  const url = `${APIEndpoints.CONTRACT.endpoint}/org/${orgId}/service/${serviceId}/group`;
  const response = await fetch(url);
  return response.json();
};

export const fetchServiceMetadata = ({ orgId, serviceId }) => async dispatch => {
  if (process.env.REACT_APP_SANDBOX) {
    return {};
  }
  dispatch(resetServiceMetadata);
  const serviceMetadata = await fetchServiceMetadataAPI({ orgId, serviceId });
  dispatch(fetchServiceMetadataSuccess(serviceMetadata));
};

const fetchMeteringDataSuccess = usageData => dispatch => {
  const freeCallsRemaining = usageData.free_calls_allowed - usageData.total_calls_made;
  dispatch({ type: UPDATE_FREE_CALLS_ALLOWED, payload: usageData.free_calls_allowed });
  dispatch({ type: UPDATE_FREE_CALLS_REMAINING, payload: freeCallsRemaining });
};

const meteringAPI = (token, orgId, serviceId, userId) => {
  const apiName = APIEndpoints.USER.name;
  const apiPath = `${APIPaths.FREE_CALL_USAGE}?organization_id=${orgId}&service_id=${serviceId}&username=${userId}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchMeteringData = ({ orgId, serviceId }) => async dispatch => {
  const { email, token } = await fetchAuthenticatedUser();
  const usageData = await meteringAPI(token, orgId, serviceId, email);
  return dispatch(fetchMeteringDataSuccess(usageData));
};
