import { Root } from "protobufjs";
import { Auth, API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import GRPCProtoV3Spec from "../../assets/models/GRPCProtoV3Spec";
import { loaderActions } from "./";
import { LoaderContent } from "../../utility/constants/LoaderContent";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";
export const UPDATE_SERVICE_EXECUTION_RESPONSE = "UPDATE_SERVICE_EXECUTION_RESPONSE";
export const UPDATE_SPEC_DETAILS = "UPDATE_SPEC_DETAILS";
export const UPDATE_FILTER_DATA = "UPDATE_FILTER_DATA";
export const UPDATE_ACTIVE_FILTER_ITEM = "UPDATE_ACTIVE_FILTER_ITEM";
export const RESET_FILTER_ITEM = "RESET_FILTER_ITEM";

export const updateActiveFilterItem = activeFilterItem => dispatch => {
  dispatch({ type: UPDATE_ACTIVE_FILTER_ITEM, payload: { ...activeFilterItem } });
};

export const resetFilterItem = dispatch => {
  dispatch({ type: RESET_FILTER_ITEM });
};

export const fetchService = (pagination, filters = []) => async dispatch => {
  let url = new URL(`${APIEndpoints.GET_SERVICE_LIST.endpoint}/service`);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...pagination, filters }),
  })
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
  dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION));
  Auth.currentSession({ bypassCache: true })
    .then(currentSession => {
      const apiName = APIEndpoints.INVOKE_SERVICE.name;
      const path = APIPaths.INVOKE_SERVICE;
      let myInit = {
        body: data,
        headers: { Authorization: currentSession.idToken.jwtToken },
      };
      return API.post(apiName, path, myInit);
    })
    .then(response => {
      dispatch(loaderActions.stopAppLoader);
      dispatch({
        type: UPDATE_SERVICE_EXECUTION_RESPONSE,
        payload: { response: JSON.parse(response.data), isComplete: true },
      });
    })
    .catch(() => dispatch(loaderActions.stopAppLoader));
};

export const fetchProtoSpec = servicebufURL => dispatch => {
  return fetch(encodeURI(servicebufURL))
    .then(serviceSpecResponse => serviceSpecResponse.json())
    .then(
      serviceSpec =>
        new Promise(resolve => {
          const serviceSpecJSON = Root.fromJSON(serviceSpec[0]);
          const protoSpec = new GRPCProtoV3Spec(serviceSpecJSON);
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

export const fetchFilterData = attribute => dispatch => {
  const url = `${APIEndpoints.GET_SERVICE_LIST.endpoint}${APIPaths.FILTER_DATA}${attribute}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch({ type: UPDATE_FILTER_DATA, payload: { [attribute]: res.data.values } });
    });
};

export const handleFilterChange = ({ pagination, filterObj, currentActiveFilterData }) => dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FILTER));
  Promise.all([
    dispatch(updatePagination(pagination)),
    dispatch(fetchService(pagination, filterObj)),
    dispatch(updateActiveFilterItem(currentActiveFilterData)),
  ])
    .then(() => dispatch(loaderActions.stopAppLoader))
    .catch(() => dispatch(loaderActions.stopAppLoader));
};

export const resetFilter = ({ pagination }) => dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FILTER));
  Promise.all([dispatch(updatePagination(pagination)), dispatch(fetchService(pagination)), dispatch(resetFilterItem)])
    .then(() => dispatch(loaderActions.stopAppLoader))
    .catch(() => dispatch(loaderActions.stopAppLoader));
};
