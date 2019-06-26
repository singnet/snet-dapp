import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducers from "./ServiceReducers";

const rootReducer = combineReducers({
    userReducer,
    serviceReducers,
});

export default rootReducer;
