import { serviceActions } from "../actionCreators";

const serviceList = {
    result: [],
    q: "",
    limit: 10,
    offset: 0,
    sort_by: "display_name",
    order_by: "desc",
    total_count: 0,
};

const serviceReducer = (state = serviceList, action) => {
    console.log("service Reducet", state, "payload", action.payload);
    switch (action.type) {
        case serviceActions.FETCH_SERVICE_LIST: {
            let x = { ...state, ...action.payload };
            console.log("aaaaaaa", x);
            return { ...state, ...action.payload };
        }
        default: {
            return state;
        }
    }
};

export default serviceReducer;
