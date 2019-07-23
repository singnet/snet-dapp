import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
});

export default rootReducer;
