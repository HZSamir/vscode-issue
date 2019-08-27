# Project

## Building

- Need to edit nano node_modules/react-native-bottom-action-sheet/android/build.gradle to upgrade support lib (See build.gradle for version) (Added patch)

## Need to do:

- Hide bottomnavigator on keyboard
- Add splashscreen
- Don't forget to use react-navigation-props-mapper

## RXDB

## Update at variable index

```javascript
const { doc } = this.state;
var update = { $set: {} };
update["$set"]["notes." + index + ".note"] = newNote;
await doc.update(update);
```

## Unshift in array (Push at top)

```javascript
await doc.update({
  $push: {
    timeline: {
      $each: [
        {
          id: shortid.generate(),
          icon: "codesandbox",
          time: "10:45",
          title: shortid.generate(),
          description: "Some subtitle"
        }
      ],
      $position: 0
    }
  }
});
```

## Listitem

```javascript
<ListItem
  title="45 new photos from #roadtrips"
  subtitle="2h ago"
  rightElement={[
    { label: "Label1", onPress: () => alert("Label1") },
    { label: "Label2", onPress: () => alert("Label2") }
  ]}
/>
```

## Appcenter

```code
// deploy
appcenter codepush release-react -a Unforgiven-wanda/OLS-CRM -d Production
// list all
appcenter codepush deployment list --displayKeys
// list one
appcenter codepush deployment list -a Unforgiven-wanda/OLS-CRM
// set current
appcenter apps set-current Unforgiven-wanda/OLS-CRM

```

## Hooks dispatch

```javascript
import { useDispatch } from "react-redux";
const dispatch = useDispatch();

useEffect(() => {
  // dispatch(increment());
}, []);
```

## Persist

```javascript
import ReduxPersist from "../Config/ReduxPersist";
if (!ReduxPersist.active)
```

## JsHint

/_ jshint ignore:start _/
/_ jshint ignore:end _/

for return in render

## Hide bottom tabbar in specific screen/stack

https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens

```javascript
// For specific screen
FeedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

// For stack
const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);
```

## Header

```javascript
defaultNavigationOptions: {
      header: props => <CustomHeader {...props} />,
      animationEnabled: true
      /*headerStyle: {
        backgroundColor: "transparent"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      },
      headerTintColor: "#fff",*/
    }
```

```javascript
static navigationOptions = ({ navigation }) => {
    return {
      title: "Dashboard",
      rightElement: (
        <Image source={require("../Images/Icons/close-button.png")} />
      ),
      onRightElementPress: (index, result) => {
        RNSecureKeyStore.remove("username");
        RNSecureKeyStore.remove("password");
        navigation.navigate("Auth");
      }
    };
  };
```

OR

```javascript
static navigationOptions = {
    title: "Dashboard",
    rightElement: (
      <Image source={require("../Images/Icons/close-button.png")} />
    ),
    menu: ["item 1", "item 2"],
    onRightElementPress: (index, result) =>
      console.log(`Pressed ${index}, ${result}`)
  };
```

# igniteAndross

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

- Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS

- for iOS
  - run `react-native run-ios`
- for Android
  - Run Genymotion
  - run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard. Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard. [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:

1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!
