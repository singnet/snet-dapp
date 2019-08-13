import { APIEndpoints } from "../../config/APIEndpoints";

export const UPDATE_SERVICE_METADATA = "UPDATE_SERVICE_METADATA";
export const RESET_SERVICE_METADATA = "RESET_SERVICE_METADATA";

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
