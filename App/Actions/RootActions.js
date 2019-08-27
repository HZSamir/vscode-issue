import { NavigationActions } from "react-navigation";

export function navigate(routeName) {
  console.log(NavigationActions);
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName }));
    // dispatch(NavigationActions.navigate({ routeName: 'Component1', params: params }));
  };
}

export function increment() {
  return {
    type: "INCREMENT_COUNTER"
  };
}

/*
export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 5000);
  };
}
*/

export function logIn(username) {
  return {
    type: "LOG_IN",
    username
  };
}

export function logOut() {
  return {
    type: "LOG_OUT"
  };
}
