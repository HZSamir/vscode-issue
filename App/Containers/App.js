import { withDevMenuTrigger } from "react-native-devmenu-trigger";
import { PersistGate } from "redux-persist/integration/react";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { useScreens } from "react-native-screens";
import RootContainer from "./RootContainer";
import createStore from "../Redux";
import { Loading } from "../Components/Stateless";
// Styles

// create our store
const { store, persistor } = createStore();
useScreens();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    /* jshint ignore:start */
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading statusBar />} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
    /* jshint ignore:end */
  }
}

// allow reactotron overlay for fast design in dev mode
export default (__DEV__ ? withDevMenuTrigger(App) : App);
