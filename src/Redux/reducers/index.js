import { combineReducers } from "redux";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;
