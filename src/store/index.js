import { combineReducers } from "redux";
import auth from "store/reducers/auth";
import blog from "store/reducers/blog";

export default combineReducers({
  auth,
  blog
});
