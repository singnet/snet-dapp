import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
});

export default rootReducer;
