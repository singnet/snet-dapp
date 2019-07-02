import { Auth, API } from "aws-amplify";
import { APIEndpoints } from "../../utility/stringConstants/APIEndpoints";

export const FETCH_SERVICE_LIST = "SET_SERVICE_LIST";

export const fetchService = ({ searchKeyword, limit, offset, sort_by, order_by }) => (dispatch, getState) => {
  let queryStringParameters = {};

  queryStringParameters.searchKeyword =
    typeof searchKeyword !== "undefined" ? searchKeyword : getState().serviceReducer.q;
  queryStringParameters.limit = typeof limit !== "undefined" ? limit : getState().serviceReducer.limit;
  queryStringParameters.offset = typeof offset !== "undefined" ? offset : getState().serviceReducer.offset;
  queryStringParameters.sort_by = typeof sort_by !== "undefined" ? sort_by : getState().serviceReducer.sort_by;
  queryStringParameters.order_by = typeof order_by !== "undefined" ? order_by : getState().serviceReducer.order_by;

  Auth.currentSession({ bypassCache: true }).then(currentSession => {
    let apiName = APIEndpoints.GET_SERVICES_LIST.name;
    let path = "/service";
    let myInit = {
      headers: { Authorization: currentSession.idToken.jwtToken },
      queryStringParameters: { ...queryStringParameters },
    };
    API.get(apiName, path, myInit).then(res => {
      dispatch({
        type: FETCH_SERVICE_LIST,
        payload: res.data,
      });
    });
  });
};
