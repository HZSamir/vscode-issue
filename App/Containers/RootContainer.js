import React from "react";
import { View, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ReduxNavigation from "../Navigation/ReduxNavigation";

// Styles
import styles from "./Styles/RootContainerStyles";
// Action
// import { navigate } from "../Actions/RootActions";

const RootContainer = () => {
  const loggedIn = useSelector(state => state.nav.index);
  const dispatch = useDispatch();

  return (
    <View style={styles.applicationView}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <ReduxNavigation />
    </View>
  );
};

export default RootContainer;
