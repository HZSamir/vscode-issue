import React from 'react'
import {
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  ToastAndroid,
  YellowBox
} from 'react-native'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'
import * as Database from '../database/Database'
import AppNavigation from './AppNavigation'
import {Loading} from '../Components/Stateless'
import {capitalizeFirstLetter} from "../Services/utils";
import shortid from "shortid";

createReactNavigationReduxMiddleware('root', state => state.nav)

const ReduxAppNavigator = createReduxContainer(AppNavigation, 'root')

class ReduxNavigation extends React.PureComponent {
  state = {
    dbReady: false
  };

  async componentDidMount() {
    global.db = await Database.get()
    this.setState({dbReady: true})
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const {dispatch, nav} = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (
        nav.routes.length === 1 &&
        nav.routes[0].routeName === 'LaunchScreen'
      ) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({type: 'Navigation/BACK'})
      return true
    })

    YellowBox.ignoreWarnings([
      'Setting a timer',
      'componentWillReceiveProps',
      'componentWillMount'
    ])
    if (__DEV__) {
      const DevMenu = require('react-native-dev-menu')
      DevMenu.addItem('Add Data', () => this.addData())
      DevMenu.addItem('Clear DB', () => this.clearDB())
    }
  }

  addData = async () => {
    await global.db.currency.insert({id: 'dz', name: 'Dinar', symbol: 'da'})
    await global.db.currency.insert({id: 'eu', name: 'Euro', symbol: '€'})

    ToastAndroid.show('Added data', ToastAndroid.SHORT)
  };

  clearDB = async () => {
    await global.db.contacts.find().remove()
    await global.db.events.find().remove()
    await global.db.tasks.find().remove()
    await global.db.deals.find().remove()
    await global.db.currency.find().remove()
    ToastAndroid.show('Database cleared', ToastAndroid.SHORT)
    /* RxDB.removeDatabase("olscrm", "asyncstorage")
      .then(() => ToastAndroid.show("Database cleared", ToastAndroid.SHORT))
      .catch(() =>
        ToastAndroid.show("Failed to clear Database!!!", ToastAndroid.SHORT)
      ); */
  };

  componentWillUnmount() {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress', undefined)
  }

  render() {
    if (this.state.dbReady) {
      return (
        <ReduxAppNavigator
          dispatch={this.props.dispatch}
          state={this.props.nav}
        />
      )
    }
    return <Loading statusBar/>
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(ReduxNavigation)
