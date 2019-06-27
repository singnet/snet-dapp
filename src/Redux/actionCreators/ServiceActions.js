import { Auth, API } from "aws-amplify";
import { APIEndpoints } from "../../utility/stringConstants/APIEndpoints";

export const FETCH_SERVICE_LIST = "SET_SERVICE_LIST";

export const fetchService = dispatch => {
    Auth.currentSession().then(res => {
        let apiName = APIEndpoints.GET_SERVICES_LIST.name;
        let path = "/org/snet/service";
        API.get(apiName, path)
            .then(res => {
                dispatch({
                    type: FETCH_SERVICE_LIST,
                    payload: res.data.result,
                });
            })
            .catch(err => {});
    });
};
