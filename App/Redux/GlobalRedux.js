// @flow
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loggedIn: false,
  username: "",
  notifications: 2
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      // return Immutable.set(state, "notifications", action.notifications);
      return state.merge({ notifications: action.notifications });

    case "INCREMENT_COUNTER":
      return state.set("notifications", state.notifications + 1);

    case "LOG_IN":
      return state.set("loggedIn", true).set("username", action.username);

    case "LOG_OUT":
      return state.set("loggedIn", false);

    default:
      return state;
  }
};
