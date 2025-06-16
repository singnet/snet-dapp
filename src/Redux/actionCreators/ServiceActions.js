import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { loaderActions, userActions } from "./";
import { LoaderContent } from "../../utility/constants/LoaderContent";
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
  dispatch({
    type: UPDATE_PAGINATION_DETAILS,
    payload: {
      total_count: res.data.total_count,
    },
  });
  // const enhancedResult = res.data.result.map(service => ({
  //   ...service,
  //   media: { ...service.media, url: service.media.url ? cacheS3Url(service.media.url) : null },
  // }));
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
    if (process.env.REACT_APP_IS_ALL_SERVICES_AVAILIBLE !== "true") {
      // env variable is string
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

const fetchAuthTokenAPI = async (serviceId, groupId, publicKey, orgId, token) => {
  const apiName = APIEndpoints.SIGNER_SERVICE.name;
  const apiPath = APIPaths.FREE_CALL_TOKEN;
  const queryParams = {
    service_id: serviceId,
    group_id: groupId,
    public_key: publicKey,
    org_id: orgId,
  };
  const apiOptions = initializeAPIOptions(token, null, queryParams);
  const authTokenRequest = await getAPI(apiName, apiPath, apiOptions);
  return authTokenRequest;
};

export const downloadAuthToken = (serviceId, groupId, publicKey, orgId) => async (dispatch) => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.GENERATE_AUTH_TOKEN));
    const { token, email } = await dispatch(userActions.fetchAuthenticatedUser());

    const { data } = await fetchAuthTokenAPI(serviceId, groupId, publicKey, orgId, token);

    const jsonToDownload = {
      email,
      tokenToMakeFreeCall: data.token_to_make_free_call,
      tokenExpirationBlock: data.token_expiration_block,
    };
    const downloadBlob = new Blob([JSON.stringify(jsonToDownload)], { type: "text/json;charset=utf-8" });
    const downloadURL = window.URL.createObjectURL(downloadBlob);
    dispatch(loaderActions.stopAppLoader());
    return downloadURL;
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
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
    feedback: {
      org_id: orgId,
      service_id: serviceId,
      user_rating: parseFloat(feedback.rating).toFixed(1),
      comment: feedback.comment,
    },
  };
  return submitFeedbackAPI(feedbackObj, token);
};
