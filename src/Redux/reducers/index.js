import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";
import serviceTrainingReducer from "./ServiceTrainingReducer";
import serviceDetailsReducer from "./ServiceDetailsReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";
import paymentReducer from "./PaymentReducer";
import uiContentReducer from "./UiContentReducer";
import sdkReducer from "./SDKReducer";
import datasetReducer from "./DatasetReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  serviceTrainingReducer,
  serviceDetailsReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
  paymentReducer,
  uiContentReducer,
  sdkReducer,
  datasetReducer,
});

export default rootReducer;
