import { Auth, API } from "aws-amplify";
import { APIEndpoints } from "../../utility/stringConstants/APIEndpoints";

export const FETCH_SERVICE_LIST = "SET_SERVICE_LIST";

export const fetchService = ({ q, limit, offset, sort_by, order_by }) => (dispatch, getState) => {
    const _q = typeof q !== "undefined" ? q : getState().serviceReducer.q;
    const _limit = typeof limit !== "undefined" ? limit : getState().serviceReducer.limit;
    const _offset = typeof offset !== "undefined" ? offset : getState().serviceReducer.offset;
    const _sort_by = typeof sort_by !== "undefined" ? sort_by : getState().serviceReducer.sort_by;
    const _order_by = typeof order_by !== "undefined" ? order_by : getState().serviceReducer.order_by;
    Auth.currentSession({ bypassCache: true })
        .then(currentSession => {
            let apiName = APIEndpoints.GET_SERVICES_LIST.name;
            let path = "/service";
            let myInit = {
                headers: { Authorization: currentSession.idToken.jwtToken },
                queryStringParameters: {
                    q: _q,
                    limit: _limit,
                    offset: _offset,
                    sort_by: _sort_by,
                    order_by: _order_by,
                },
            };
            console.log("fetchService myInit", myInit);
            API.get(apiName, path, myInit)
                .then(res => {
                    dispatch({
                        type: FETCH_SERVICE_LIST,
                        payload: res.data,
                    });
                })
                .catch(() => {});
        })
        .catch(err => {
            console.log(err);
        });
};

// export const servicePagination = () => dispatch => {
//     Auth.currentSession({ bypassCache: true }).then(currentSession => {
//         let apiName = APIEndpoints.GET_SERVICES_LIST.name;
//         let path = "/service";
//         let myInit = {
//             headers: { Authorization: currentSession.idToken.jwtToken },
//         };
//         API.get(apiName, path, myInit).then(res => {
//             dispatch({
//                 type: FETCH_SERVICE_LIST,
//                 payload: res.data.result,
//             });
//         });
//     });
// };
