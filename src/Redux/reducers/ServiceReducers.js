import { serviceActions } from "../actionCreators";

const serviceList = [];

const serviceReducer = (state = serviceList, action) => {
    switch (action.type) {
        case serviceActions.FETCH_SERVICE_LIST: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

export default serviceReducer;
