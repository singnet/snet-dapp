import { APIEndpoints } from "../../utility/constants/APIEndpoints";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";

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

export const updatePagination = pagination => dispatch => {
  dispatch({
    type: UPDATE_PAGINATION_DETAILS,
    payload: pagination,
  });
};
