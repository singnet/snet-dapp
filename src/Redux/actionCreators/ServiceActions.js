import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { loaderActions, userActions } from "./";
import { getAPI, postAPI, initializeAPIOptions } from "../../utility/API";
import { generateOrganizationsFilterObject } from "../../utility/constants/Pagination";
// import { cacheS3Url } from "../../utility/image";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";
export const UPDATE_SERVICE_EXECUTION_RESPONSE = "UPDATE_SERVICE_EXECUTION_RESPONSE";
export const RESET_SERVICE_EXECUTION = "RESET_SERVICE_EXECUTION";
export const UPDATE_SPEC_DETAILS = "UPDATE_SPEC_DETAILS";
export const UPDATE_FILTER_DATA = "UPDATE_FILTER_DATA";
export const UPDATE_ACTIVE_FILTER_ITEM = "UPDATE_ACTIVE_FILTER_ITEM";
export const RESET_FILTER_ITEM = "RESET_FILTER_ITEM";
export const UPDATE_FEEDBACK = "UPDATE_FEEDBACK";

export const updateActiveFilterItem = (activeFilterItem) => (dispatch) => {
  dispatch({ type: UPDATE_ACTIVE_FILTER_ITEM, payload: { ...activeFilterItem } });
};

export const resetFilterItem = (dispatch) => {
  dispatch({ type: RESET_FILTER_ITEM });
};

export const fetchServiceSuccess = (res) => (dispatch) => {
  dispatch(updatePagination({ total_count: res.data.total_count }));
  dispatch({ type: UPDATE_SERVICE_LIST, payload: res.data.result });
  dispatch(loaderActions.stopAIServiceListLoader());
};

export const fetchUserOrganizationsList = () => async (dispatch) => {
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_USER_ORGS;
  const { token } = await dispatch(userActions.fetchAuthenticatedUser());
  const apiOptions = initializeAPIOptions(token);
  return getAPI(apiName, apiPath, apiOptions);
};

const onlyUserOrgsFilter = () => async (dispatch) => {
  const userOrganizations = await dispatch(fetchUserOrganizationsList());
  const userOrganizationsId = userOrganizations.data.map((organization) => organization.org_id);
  const filterObj = generateOrganizationsFilterObject([
    ...userOrganizationsId,
    process.env.REACT_APP_EXAMPLE_SERVICE_ORG_ID,
  ]);
  return filterObj;
};

export const fetchService =
  (pagination, filters = []) =>
  async (dispatch) => {
    // env variable is string
    if (process.env.REACT_APP_IS_ALL_SERVICES_AVAILIBLE !== "true") {
      filters = await dispatch(onlyUserOrgsFilter());
    }
    dispatch(loaderActions.startAIServiceListLoader());
    const url = new URL(APIEndpoints.CONTRACT.endpoint + APIPaths.GET_SERVICE_LIST);
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...pagination, filters }),
    })
      .then((res) => res.json())
      .then((res) => dispatch(fetchServiceSuccess(res)))
      .catch(() => dispatch(loaderActions.stopAIServiceListLoader()));
  };

export const updatePagination = (pagination) => (dispatch) => {
  dispatch({
    type: UPDATE_PAGINATION_DETAILS,
    payload: pagination,
  });
};

export const fetchFilterData = (attribute) => (dispatch) => {
  const url = `${APIEndpoints.CONTRACT.endpoint}${APIPaths.FILTER_DATA}${attribute}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: UPDATE_FILTER_DATA, payload: { [attribute]: res.data.values } });
    });
};

export const handleFilterChange =
  ({ pagination, filterObj, currentActiveFilterData }) =>
  (dispatch) => {
    dispatch(loaderActions.startAIServiceListLoader());
    Promise.all([
      dispatch(updatePagination(pagination)),
      dispatch(fetchService(pagination, filterObj)),
      dispatch(updateActiveFilterItem(currentActiveFilterData)),
    ])
      .then(() => dispatch(loaderActions.stopAIServiceListLoader()))
      .catch(() => dispatch(loaderActions.stopAIServiceListLoader()));
  };

export const resetFilter =
  ({ pagination }) =>
  (dispatch) => {
    dispatch(loaderActions.startAIServiceListLoader());
    Promise.all([dispatch(updatePagination(pagination)), dispatch(fetchService(pagination)), dispatch(resetFilterItem)])
      .then(() => dispatch(loaderActions.stopAIServiceListLoader()))
      .catch(() => dispatch(loaderActions.stopAIServiceListLoader()));
  };

const fetchFeedbackAPI = (orgId, serviceId, token) => {
  const apiName = APIEndpoints.USER.name;
  const path = `${APIPaths.FEEDBACK}?org_id=${orgId}&service_id=${serviceId}`;
  const apiOptions = initializeAPIOptions(token);
  return getAPI(apiName, path, apiOptions);
};

//Username review
export const fetchFeedback = (orgId, serviceId) => async (dispatch) => {
  const { token } = await dispatch(userActions.fetchAuthenticatedUser());
  return fetchFeedbackAPI(orgId, serviceId, token);
};

const submitFeedbackAPI = (feedbackObj, token) => {
  const apiName = APIEndpoints.USER.name;
  const path = `${APIPaths.FEEDBACK}`;
  const apiOptions = initializeAPIOptions(token, feedbackObj);
  return postAPI(apiName, path, apiOptions);
};

export const submitFeedback = (orgId, serviceId, feedback) => async (dispatch) => {
  const { token } = await dispatch(userActions.fetchAuthenticatedUser());
  const feedbackObj = {
    orgId,
    serviceId,
    userRating: Number(parseFloat(feedback.rating).toFixed(1)),
    comment: feedback.comment,
  };
  return submitFeedbackAPI(feedbackObj, token);
};
