import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";
import stylesReducer from "./StylesReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  stylesReducer,
});

export default rootReducer;
