import React, { PureComponent } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import PouchDB from "pouchdb";
import AsyncStorage from "@react-native-community/async-storage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppConfig from "../Config/AppConfig";
import Button from "../Components/Button";
// Action
import { logIn } from "../Actions/RootActions";

// Styles
import styles from "./Styles/SignInScreenStyle";

PouchDB.plugin(require("pouchdb-authentication"));
const loginDB = new PouchDB(AppConfig.authUrl, {
  skip_setup: true
});

class SignInScreen extends PureComponent {
  /* static navigationOptions = {
    title: "Please sign in"
  }; */

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false
    };
    this.secondTextInputRef = React.createRef();
  }

  _signInAsync = () => {
    const self = this;
    const { username, password, loading } = this.state;
    if (loading) return;

    this.setState({ error: "", loading: true });

    if (!username || !password)
      return this.setState({ error: "Champ(s) vide(s)", loading: false });

    loginDB.logIn(username, password, async (err, response) => {
      if (err) {
        if (err.name === "unauthorized" || err.name === "forbidden") {
          return self.setState({
            error: "Identifiants erronés",
            loading: false
          });
        } else {
          return self.setState({
            error:
              "Veuillez vous assurer que vous êtes connecté à Internet et réessayer",
            loading: false
          });
        }
      } else {
        // await AsyncStorage.setItem("userToken", "abc");
        self.storeKeys(username, password);
        self.props.navigation.navigate("App");
        self.props.logIn(username);
      }
    });
  };

  storeKeys(username, password) {
    AsyncStorage.setItem("username", username).catch(err => {
      console.log(err);
    });

    AsyncStorage.setItem("password", password).catch(err => {
      console.log(err);
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.nativeEvent.text
    });
  };

  render() {
    const { username, password, error, loading } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <KeyboardAvoidingView>
          <View>
            <View style={styles.inputContainer}>
              <View style={styles.left}>
                <Text
                  style={[
                    styles.label,
                    error === "Champ(s) vide(s)" ? styles.error : ""
                  ]}
                >
                  Nom d'utilisateur
                </Text>
                <TextInput
                  //autoFocus
                  enablesReturnKeyAutomatically
                  returnKeyType="next"
                  placeholder="paul.jameson@work.com"
                  value={username}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChange={this.handleChange("username")}
                  style={styles.textInput}
                  //onSubmitEditing={this.focus}
                  onSubmitEditing={() => {
                    this.secondTextInputRef.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View
              style={[
                styles.separator,
                error === "Champ(s) vide(s)" ? styles.seperror : ""
              ]}
            />

            <View style={styles.inputContainer}>
              <View style={styles.left}>
                <Text style={[styles.label, error ? styles.error : ""]}>
                  Mot de passe
                </Text>
                <TextInput
                  enablesReturnKeyAutomatically
                  ref={this.secondTextInputRef}
                  secureTextEntry
                  onChange={this.handleChange("password")}
                  placeholder="*****"
                  value={password}
                  style={styles.textInput}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={this._signInAsync}
                />
              </View>
            </View>

            <View style={[styles.separator, error ? styles.seperror : ""]} />

            <Button
              disabled={loading}
              onPress={this._signInAsync}
              text="Se connecter"
              colors={loading ? ["#969696", "#cecece"] : ["#0ac4ba", "#2bda8e"]}
            />

            <TouchableOpacity>
              <Text style={[styles.forget, styles.error]}>
                {error != "Champ(s) vide(s)" && error}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logIn }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
