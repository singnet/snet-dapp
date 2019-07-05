import { Root } from "protobufjs";

import { APIEndpoints } from "../../utility/constants/APIEndpoints";
import GRPCProtoV3Spec from "../../assets/models/GRPCProtoV3Spec";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";
export const UPDATE_SERVICE_EXECUTION_RESPONSE = "UPDATE_SERVICE_EXECUTION_RESPONSE";
export const UPDATE_SPEC_DETAILS = "UPDATE_SPEC_DETAILS";

export const fetchService = pagination => async dispatch => {
  let url = new URL(`${APIEndpoints.GET_SERVICES_LIST.endpoint}/service`);
  Object.entries(pagination).map(([key, value]) => url.searchParams.append(key, value));
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: UPDATE_PAGINATION_DETAILS,
        payload: {
          total_count: res.data.total_count,
        },
      });
      dispatch({ type: UPDATE_SERVICE_LIST, payload: res.data.result });
    });
};

export const executeService = (url, data) => dispatch => {
  return fetch(url, {
    method: "POST",
    mode: "CORS",
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_SERVICE_EXECUTION_RESPONSE, payload: data }));
};

export const fetchSpecDetails = servicebufURL => dispatch => {
  return fetch(encodeURI(servicebufURL))
    .then(serviceSpecResponse => serviceSpecResponse.json())
    .then(
      serviceSpec =>
        new Promise(resolve => {
          const serviceSpecJSON = Root.fromJSON(serviceSpec[0]);
          const protoSpec = new GRPCProtoV3Spec(serviceSpecJSON);
          dispatch({ type: UPDATE_SPEC_DETAILS, payload: { serviceSpecJSON, protoSpec } });
          resolve({ serviceSpecJSON, protoSpec });
        })
    );
};

export const updatePagination = pagination => dispatch => {
  dispatch({
    type: UPDATE_PAGINATION_DETAILS,
    payload: pagination,
  });
};
