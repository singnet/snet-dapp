import { Root } from "protobufjs";
import { Auth, API } from "aws-amplify";

import { APIEndpoints } from "../../config/APIEndpoints";
import GRPCProtoV3Spec from "../../assets/models/GRPCProtoV3Spec";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";
export const UPDATE_SERVICE_EXECUTION_RESPONSE = "UPDATE_SERVICE_EXECUTION_RESPONSE";
export const UPDATE_SPEC_DETAILS = "UPDATE_SPEC_DETAILS";

export const fetchService = pagination => async dispatch => {
  let url = new URL(`${APIEndpoints.GET_SERVICE_LIST.endpoint}/service`);
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

export const invokeServiceMethod = data => dispatch => {
  Auth.currentSession({ bypassCache: true }).then(currentSession => {
    const apiName = APIEndpoints.GET_SERVICE_LIST.name;
    const path = "/call-service";
    let myInit = {
      body: data,
      headers: { Authorization: currentSession.idToken.jwtToken },
    };
    API.post(apiName, path, myInit).then(response => {
      dispatch({
        type: UPDATE_SERVICE_EXECUTION_RESPONSE,
        payload: { response: JSON.parse(response.data), isComplete: true },
      });
    });
  });
};

export const fetchProtoSpec = servicebufURL => dispatch => {
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
