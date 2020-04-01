import { handleActions } from "redux-actions";
import { Map } from "immutable";
import {
  CHANGE_INPUT,
  REQUEST_SIGN_IN,
  FAILURE_SIGN_IN,
  SUCCESS_SIGN_IN
} from "store/actions/auth";

const defaultState = Map({
  userid: "",
  password: "",
  isFetching: false,
  isFinishing: false,
  logged: false
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { userid, password } = action.payload;
      if (userid != null) state = state.set("userid", userid);
      if (password != null) state = state.set("password", password);
      return state;
    },
    [REQUEST_SIGN_IN]: (state, action) => {
      return state.set("isFetching", true).set("isFinishing", false);
    },
    [FAILURE_SIGN_IN]: (state, action) => {
      return state
        .set("isFetching", false)
        .set("isFinishing", true)
        .set("logged", false);
    },
    [SUCCESS_SIGN_IN]: (state, action) => {
      return state
        .set("isFetching", false)
        .set("isFinishing", true)
        .set("logged", true);
    }
  },
  defaultState
);
