import React from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PouchDB from "pouchdb";
import AppConfig from "../Config/AppConfig";
import { Loading } from "../Components/Stateless";

const loginDB = new PouchDB(AppConfig.authUrl, {
  skip_setup: true
});

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { navigation } = this.props;
    AsyncStorage.getItem("username")
      .then(username => {
        AsyncStorage.getItem("password")
          .then(password => {
            loginDB.logIn(username, password, (err, response) => {
              if (err) {
                navigation.navigate("Auth");
              } else {
                loginDB.logIn(username, password, (err, response) => {
                  if (err) {
                    navigation.navigate("Auth");
                  } else {
                    navigation.navigate("App");
                  }
                });
              }
            });
          })
          .catch(err => {
            return navigation.navigate("Auth");
          });
      })
      .catch(err => {
        return navigation.navigate("Auth");
      });
  };

  // Render any loading content that you like here
  render() {
    return <Loading statusBar />;
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center"
  }
});
