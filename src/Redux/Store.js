import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import sandboxState from '../sandbox/sandbox_state';

let composeEnhancers = compose;
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  const preloadedState = process.env.REACT_APP_SANDBOX ? sandboxState : undefined;
  return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;
