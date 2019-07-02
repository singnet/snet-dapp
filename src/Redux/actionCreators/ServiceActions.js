import { Auth, API } from "aws-amplify";
import { APIEndpoints } from "../../utility/constants/APIEndpoints";

export const UPDATE_SERVICE_LIST = "SET_SERVICE_LIST";
export const UPDATE_PAGINATION_DETAILS = "SET_PAGINATION_DETAILS";

export const fetchService = ({ searchKeyword, limit, offset, sort_by, order_by }) => async (dispatch, getState) => {
  let queryStringParameters = {};

  queryStringParameters.q =
    typeof searchKeyword !== "undefined" ? searchKeyword : getState().serviceReducer.searchKeyword;
  queryStringParameters.limit = typeof limit !== "undefined" ? limit : getState().serviceReducer.limit;
  queryStringParameters.offset = typeof offset !== "undefined" ? offset : getState().serviceReducer.offset;
  queryStringParameters.sort_by = typeof sort_by !== "undefined" ? sort_by : getState().serviceReducer.sort_by;
  queryStringParameters.order_by = typeof order_by !== "undefined" ? order_by : getState().serviceReducer.order_by;

  let url = new URL(`${APIEndpoints.GET_SERVICES_LIST.endpoint}/service`);
  Object.entries(queryStringParameters).map(([key, value]) => url.searchParams.append(key, value));
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("fetching services", data);
    })
    .catch(err => {
      console.log("fetching services failed", err);
    });

  // .then(response => response.json())
  // .then(json => {
  //   return json;
  // })
  // .catch(err => {
  //   return err;
  // });
  // new Promise(fetch(url));
  // getService.then(res => {
  //   dispatch({
  //     type: FETCH_SERVICE_LIST,
  //     payload: res.data,
  //   });
  // });
  // Auth.currentSession({ bypassCache: true }).then(currentSession => {
  //   let apiName = APIEndpoints.GET_SERVICES_LIST.name;
  //   let path = "/service";
  //   let myInit = {
  //     headers: { Authorization: currentSession.idToken.jwtToken },
  //     queryStringParameters: { ...queryStringParameters },
  //   };
  //   API.get(apiName, path, myInit).then(res => {
  //     dispatch({
  //       type: FETCH_SERVICE_LIST,
  //       payload: res.data,
  //     });
  //   });
  // });
};
