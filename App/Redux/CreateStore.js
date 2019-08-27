import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import ScreenTracking from "./ScreenTrackingMiddleware";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

// creates the store
export default rootReducer => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    "root"
  );
  middleware.push(navigationMiddleware);

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking);

  /* ------------- Thunk Middleware ------------- */
  middleware.push(thunk);

  /* ------------- Logging Middleware ------------- */
  /* const logger = createLogger({
    level: "info",
    collapsed: true
  }); */

  // Skip redux logs in console during the tests
  /* if (__DEV__) {
    middleware.push(logger);
  } */

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  let myComposer = compose;
  if (__DEV__) myComposer = composeWithDevTools;

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;
  const store = createAppropriateStore(rootReducer, myComposer(...enhancers));

  return {
    store
  };
};
