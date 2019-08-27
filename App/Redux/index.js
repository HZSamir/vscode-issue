import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";
import { seamlessImmutableReconciler } from "redux-persist-seamless-immutable";
import configureStore from "./CreateStore";

/* ------------- Assemble The girls! ------------- */
/* ------------- cuz it's go time, buttercup! ------------- */
const finalReducers = combineReducers({
  nav: require("./NavigationRedux").reducer,
  app: require("./GlobalRedux").reducer
});

const persitingReducers = createFilter("app", ["loggedIn", "username"]);

const blacklist = [];
if (!__DEV__) blacklist.push("nav");

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist,
  transforms: [persitingReducers],
  stateReconciler: seamlessImmutableReconciler
};

const persistedReducer = persistReducer(persistConfig, finalReducers);

export default () => {
  let { store } = configureStore(persistedReducer);
  let persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
};
