import { serviceActions } from "../actionCreators";

const serviceList = { data: [] };

const serviceReducer = (state = serviceList, action) => {
    switch (action.type) {
        case serviceActions.FETCH_SERVICE_LIST: {
            return { ...state, data: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default serviceReducer;
