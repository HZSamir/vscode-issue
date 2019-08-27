import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
/* Screens */
import SignInScreen from "../Containers/SignInScreen";
import AuthLoadingScreen from "../Containers/AuthLoadingScreen";
//import styles from "./Styles/NavigationStyles";

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      header: null
    })
  }
});

// Manifest of possible screens
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
