import { Root } from "protobufjs";
import { Auth, API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import GRPCProtoV3Spec from "../../assets/models/GRPCProtoV3Spec";
import { loaderActions } from "./";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { PricingStrategy } from "../../utility/PricingStrategy.js";
import { generateAPIInit } from "../../utility/API";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";
export const UPDATE_SERVICE_EXECUTION_RESPONSE = "UPDATE_SERVICE_EXECUTION_RESPONSE";
export const UPDATE_SPEC_DETAILS = "UPDATE_SPEC_DETAILS";
export const UPDATE_FILTER_DATA = "UPDATE_FILTER_DATA";
export const UPDATE_ACTIVE_FILTER_ITEM = "UPDATE_ACTIVE_FILTER_ITEM";
export const RESET_FILTER_ITEM = "RESET_FILTER_ITEM";
export const UPDATE_FEEDBACK = "UPDATE_FEEDBACK";

export const updateActiveFilterItem = activeFilterItem => dispatch => {
  dispatch({ type: UPDATE_ACTIVE_FILTER_ITEM, payload: { ...activeFilterItem } });
};

export const resetFilterItem = dispatch => {
  dispatch({ type: RESET_FILTER_ITEM });
};

export const fetchServiceSuccess = res => dispatch => {
  dispatch({
    type: UPDATE_PAGINATION_DETAILS,
    payload: {
      total_count: res.data.total_count,
    },
  });
  if (res.data.total_count > 0) {
    res.data.result.map(service => {
      const pricing = service["pricing"];
      let pricingJSON = typeof pricing === "undefined" || pricing === null ? JSON.stringify(service) : pricing;
      service.pricing_strategy = new PricingStrategy(pricingJSON);
    });
  }
  dispatch({ type: UPDATE_SERVICE_LIST, payload: res.data.result });
  dispatch(loaderActions.stopAIServiceListLoader);
};

export const fetchService = (pagination, filters = []) => async dispatch => {
  dispatch(loaderActions.startAIServiceListLoader);
  const url = new URL(`${APIEndpoints.CONTRACT.endpoint}/service`);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...pagination, filters }),
  })
    .then(res => res.json())
    .then(res => dispatch(fetchServiceSuccess(res)))
    .catch(() => dispatch(loaderActions.stopAIServiceListLoader));
};

export const invokeServiceMethod = data => dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.SERVICE_INVOKATION));
  Auth.currentSession({ bypassCache: true })
    .then(currentSession => {
      const apiName = APIEndpoints.INVOKE_SERVICE.name;
      const path = APIPaths.INVOKE_SERVICE;
      const myInit = generateAPIInit(currentSession.idToken.jwtToken, data);
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
  const url = `${APIEndpoints.CONTRACT.endpoint}${APIPaths.FILTER_DATA}${attribute}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch({ type: UPDATE_FILTER_DATA, payload: { [attribute]: res.data.values } });
    });
};

export const handleFilterChange = ({ pagination, filterObj, currentActiveFilterData }) => dispatch => {
  dispatch(loaderActions.startAIServiceListLoader);
  Promise.all([
    dispatch(updatePagination(pagination)),
    dispatch(fetchService(pagination, filterObj)),
    dispatch(updateActiveFilterItem(currentActiveFilterData)),
  ])
    .then(() => dispatch(loaderActions.stopAIServiceListLoader))
    .catch(() => dispatch(loaderActions.stopAIServiceListLoader));
};

export const resetFilter = ({ pagination }) => dispatch => {
  dispatch(loaderActions.startAIServiceListLoader);
  Promise.all([dispatch(updatePagination(pagination)), dispatch(fetchService(pagination)), dispatch(resetFilterItem)])
    .then(() => dispatch(loaderActions.stopAIServiceListLoader))
    .catch(() => dispatch(loaderActions.stopAIServiceListLoader));
};

const fetchFeedbackAPI = (username, orgId, serviceId, token) => {
  const apiName = APIEndpoints.USER.name;
  const path = `${APIPaths.FEEDBACK}?org_id=${orgId}&service_id=${serviceId}`;
  const myInit = generateAPIInit(token);
  return API.get(apiName, path, myInit);
};

export const fetchFeedback = (orgId, serviceId) => async () => {
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  return fetchFeedbackAPI(currentUser.username, orgId, serviceId, currentUser.signInUserSession.idToken.jwtToken);
};

const submitFeedbackAPI = (feedbackObj, token) => {
  const apiName = APIEndpoints.USER.name;
  const path = `${APIPaths.FEEDBACK}`;
  const myInit = generateAPIInit(token, feedbackObj);
  return API.post(apiName, path, myInit);
};

export const submitFeedback = (orgId, serviceId, feedback) => async () => {
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  const feedbackObj = {
    feedback: {
      org_id: orgId,
      service_id: serviceId,
      user_rating: parseFloat(feedback.rating).toFixed(1),
      comment: feedback.comment,
    },
  };
  return submitFeedbackAPI(feedbackObj, currentUser.signInUserSession.idToken.jwtToken);
};
