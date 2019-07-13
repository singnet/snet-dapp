import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  errorReducer,
  loaderReducer,
});

export default rootReducer;
